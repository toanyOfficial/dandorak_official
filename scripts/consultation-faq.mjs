import { readFileSync } from 'node:fs';
import { createHmac } from 'node:crypto';
import { fileURLToPath } from 'node:url';
// Parse only string/array literals; never evaluate the website's JavaScript.
export function extractFaq(source) {
    const start = source.indexOf('const faqItems =');
    if (start < 0)
        throw new Error('FAQ declaration missing');
    let at = start + 'const faqItems ='.length;
    const ws = () => { while (/\s/.test(source[at] || '') && at < source.length)
        at++; };
    const string = () => { const quote = source[at++]; let text = ''; while (at < source.length) {
        const c = source[at++];
        if (c === quote)
            return text;
        if (c !== '\\') {
            text += c;
            continue;
        }
        const escape = source[at++], map = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0', "'": "'", '"': '"', '\\': '\\' };
        if (Object.hasOwn(map, escape)) {
            text += map[escape];
            continue;
        }
        if (escape === 'u' || escape === 'x') {
            const n = escape === 'u' ? 4 : 2, hex = source.slice(at, at + n);
            if (!new RegExp(`^[a-fA-F0-9]{${n}}$`).test(hex))
                throw new Error('Invalid escape');
            text += String.fromCharCode(parseInt(hex, 16));
            at += n;
            continue;
        }
        throw new Error('Unsupported string escape');
    } throw new Error('Unclosed string'); };
    const value = () => { ws(); if (source[at] === "'" || source[at] === '"')
        return string(); if (source[at++] !== '[')
        throw new Error('Unsupported FAQ expression'); const rows = []; ws(); while (source[at] !== ']') {
        rows.push(value());
        ws();
        if (source[at] === ',') {
            at++;
            ws();
        }
        else if (source[at] !== ']')
            throw new Error('Invalid array');
    } at++; return rows; };
    const rows = value();
    ws();
    if (source[at] !== ';' || !Array.isArray(rows) || !rows.length || rows.length > 100)
        throw new Error('Invalid FAQ list');
    const plain = html => html.replace(/<[^>]*>/g, ' ').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, entity) => { const map = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }; if (entity[0] !== '#')
        return map[entity.toLowerCase()] || ''; const n = parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ''; }).replace(/\s+/g, ' ').trim();
    const faqs = rows.map((row, index) => { if (!Array.isArray(row) || row.length < 2 || row.length > 3 || row.some(value => typeof value !== 'string'))
        throw new Error('Invalid FAQ entry'); return { id: `faq-${index + 1}`, question: plain(row[0]), answer: plain(row[1]), action: row[2] || null }; });
    const supplements = [['menuVariety', source.match(/<dl class="faq-menu-limits"[\s\S]*?<\/dl>/)?.[0]], ['deliveryFee', source.match(/<div class="delivery-fee-copy">([\s\S]*?)<\/div>/)?.[1]]].filter(([, html]) => html).map(([id, html]) => ({ id, text: plain(html) }));
    return { faqs, supplements };
}
const notificationTimeoutMs = 20000;
const timeoutCodes = new Set(['ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT']);
const networkCodes = new Set(['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ENETUNREACH', 'EPIPE', 'UND_ERR_SOCKET', 'CERT_HAS_EXPIRED', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'ERR_TLS_CERT_ALTNAME_INVALID']);

class FaqSyncError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

// Only our own diagnostic messages are safe to log. Fetch/JSON errors can contain
// credentials, URLs, signatures or response content, even in nested causes.
export function formatSyncError(error) {
    if (error instanceof FaqSyncError)
        return `FAQ synchronization failed [FAQ_SYNC_${error.code}]: ${error.message}`;
    return 'FAQ synchronization failed [FAQ_SYNC_UNEXPECTED]: Unexpected internal error. Original error details are withheld.';
}

function transportError(error, signal, status) {
    const codes = [error?.code, error?.cause?.code];
    const context = status === undefined ? 'before receiving an HTTP response' : `while reading the response (HTTP ${status})`;
    if (signal.aborted || error?.name === 'TimeoutError' || codes.some(code => timeoutCodes.has(code)))
        return new FaqSyncError('TIMEOUT', `Notification timed out ${context}; the request deadline is ${notificationTimeoutMs} ms. Check receiver availability and network connectivity.`);
    const code = codes.find(code => networkCodes.has(code));
    return new FaqSyncError('NETWORK', `Network connection failed ${context}${code ? ` (${code})` : ''}. Check DNS, TLS and connectivity from the Actions runner.`);
}

export async function notifyOps(env = process.env, fetcher = fetch) {
    const url = env.OPS_FAQ_SYNC_URL?.trim(), secret = env.OPS_FAQ_SYNC_SECRET?.trim();
    if (!url || !secret) {
        const missing = [!url && 'OPS_FAQ_SYNC_URL', !secret && 'OPS_FAQ_SYNC_SECRET'].filter(Boolean);
        console.log(`FAQ sync not configured; no notification sent. Missing or empty: ${missing.join(', ')}.`);
        return;
    }
    let target;
    try {
        target = new URL(url);
    }
    catch {
        throw new FaqSyncError('URL_CONFIG', 'OPS_FAQ_SYNC_URL must be a valid absolute HTTP(S) URL for the FAQ receiver.');
    }
    if (target.username || target.password || !['https:', 'http:'].includes(target.protocol))
        throw new FaqSyncError('URL_CONFIG', 'OPS_FAQ_SYNC_URL must use HTTP(S) and must not contain a username or password.');
    if (secret.length < 32)
        throw new FaqSyncError('SECRET_CONFIG', 'OPS_FAQ_SYNC_SECRET must contain at least 32 characters after trimming and match the receiver key.');
    if (env.GITHUB_REF !== 'refs/heads/main' || !['push', 'workflow_dispatch'].includes(env.GITHUB_EVENT_NAME) || !/^[a-f0-9]{40}$/.test(env.GITHUB_SHA || '') || !/^\d+$/.test(env.GITHUB_RUN_NUMBER || ''))
        throw new FaqSyncError('PUBLICATION_CONTEXT', 'Expected a main push or workflow_dispatch with a valid GITHUB_SHA and GITHUB_RUN_NUMBER.');
    let faq;
    try {
        faq = extractFaq(readFileSync(new URL('../public/script.js', import.meta.url), 'utf8'));
    }
    catch {
        throw new FaqSyncError('EXTRACTION', 'Could not read or extract public/script.js. Run the FAQ extraction test.');
    }
    const body = JSON.stringify({ schema_version: 1, repository: 'toanyOfficial/dandorak_official', ref: env.GITHUB_REF, commit: env.GITHUB_SHA, run_number: Number(env.GITHUB_RUN_NUMBER), sent_at: Date.now(), source_url: 'https://www.dandorak.com/#faq', ...faq });
    const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
    const signal = AbortSignal.timeout(notificationTimeoutMs);
    let response;
    try {
        // Inspect redirect status without forwarding the signed payload elsewhere.
        response = await fetcher(target, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-FAQ-Signature-256': signature }, body, redirect: 'manual', signal });
    }
    catch (error) {
        throw transportError(error, signal);
    }
    if (!response.ok) {
        let hint = 'Check the receiver status.';
        if (response.status === 401 || response.status === 403)
            hint = 'Authentication or access was rejected; check that OPS_FAQ_SYNC_SECRET matches the receiver key and that the endpoint permits this request.';
        else if (response.status >= 300 && response.status < 400)
            hint = 'Redirects are not followed; set OPS_FAQ_SYNC_URL to the final FAQ receiver endpoint.';
        throw new FaqSyncError('HTTP', `Receiver returned HTTP ${response.status}. ${hint}`);
    }
    const reader = response.body?.getReader();
    const invalidResponse = detail => new FaqSyncError('RESPONSE_FORMAT', `Receiver returned HTTP ${response.status}, but ${detail}`);
    if (!reader) throw invalidResponse('the acknowledgment body is missing. Expected JSON with accepted: true.');
    const chunks = []; let size = 0;
    try {
        while (true) {
            let part;
            try {
                part = await reader.read();
            }
            catch (error) {
                throw transportError(error, signal, response.status);
            }
            if (part.done) break;
            size += part.value.length;
            if (size > 4096) throw invalidResponse('the acknowledgment exceeds the 4096-byte limit.');
            chunks.push(part.value);
        }
    }
    finally { await reader.cancel().catch(() => {}); }
    let acknowledgment;
    try {
        acknowledgment = JSON.parse(Buffer.concat(chunks).toString());
    }
    catch {
        throw invalidResponse('the acknowledgment is not valid JSON. Expected JSON with accepted: true.');
    }
    if (acknowledgment?.accepted !== true) throw invalidResponse('the acknowledgment must contain accepted: true.');
    console.log('Published FAQ notification acknowledged.');
}
if (process.argv[1] === fileURLToPath(import.meta.url))
    notifyOps().catch(error => { console.error(formatSyncError(error)); process.exitCode = 1; });

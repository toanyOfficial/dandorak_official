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
export async function notifyOps(env = process.env, fetcher = fetch) {
    const url = env.OPS_FAQ_SYNC_URL, secret = env.OPS_FAQ_SYNC_SECRET?.trim();
    if (!url || !secret) {
        console.log('FAQ sync not configured; no notification sent.');
        return;
    }
    const target = new URL(url);
    if (target.username || target.password || !['https:', 'http:'].includes(target.protocol))
        throw new Error('Invalid FAQ sync destination');
    if (env.GITHUB_REF !== 'refs/heads/main' || !['push', 'workflow_dispatch'].includes(env.GITHUB_EVENT_NAME) || !/^[a-f0-9]{40}$/.test(env.GITHUB_SHA || '') || !/^\d+$/.test(env.GITHUB_RUN_NUMBER || '') || secret.length < 32)
        throw new Error('Invalid main publication context');
    const faq = extractFaq(readFileSync(new URL('../public/script.js', import.meta.url), 'utf8'));
    const body = JSON.stringify({ schema_version: 1, repository: 'toanyOfficial/dandorak_official', ref: env.GITHUB_REF, commit: env.GITHUB_SHA, run_number: Number(env.GITHUB_RUN_NUMBER), sent_at: Date.now(), source_url: 'https://www.dandorak.com/#faq', ...faq });
    const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
    const response = await fetcher(target, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-FAQ-Signature-256': signature }, body, redirect: 'error', signal: AbortSignal.timeout(20000) });
    if (!response.ok)
        throw new Error('FAQ notification was not acknowledged (HTTP ' + response.status + ').');
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Missing FAQ acknowledgment.');
    const chunks = []; let size = 0;
    try { while (true) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > 4096) throw new Error('Invalid FAQ acknowledgment.'); chunks.push(part.value); } }
    finally { await reader.cancel().catch(() => {}); }
    if (JSON.parse(Buffer.concat(chunks).toString()).accepted !== true) throw new Error('FAQ receiver did not acknowledge publication.');
    console.log('Published FAQ notification acknowledged.');
}
if (process.argv[1] === fileURLToPath(import.meta.url))
    notifyOps().catch(() => { console.error('FAQ synchronization failed; check the workflow configuration and receiver status. Secret values are not displayed.'); process.exitCode = 1; });

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHmac } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { extractFaq, notifyOps, formatSyncError } from './consultation-faq.mjs';
test('extracts the real website FAQs and modal supplements without executing website code', () => { const data = extractFaq(readFileSync(new URL('../public/script.js', import.meta.url), 'utf8')); assert.ok(data.faqs.length >= 15); assert.ok(data.faqs.some(value => value.question.includes('수거 비용'))); assert.ok(data.supplements.some(value => value.id === 'menuVariety' && value.text.includes('50만'))); assert.ok(data.faqs.every(value => !value.question.includes('<span'))); assert.throws(() => extractFaq("const faqItems = [process.exit()];")); });
test('main-only notifications are signed and missing configuration sends nothing', async () => { let calls = 0; await notifyOps({}, async () => { calls++; }); assert.equal(calls, 0); const env = { OPS_FAQ_SYNC_URL: 'https://ops.example/api/integrations/official-faq', OPS_FAQ_SYNC_SECRET: 'test-only-secret'.repeat(3), GITHUB_REF: 'refs/heads/main', GITHUB_EVENT_NAME: 'push', GITHUB_SHA: 'a'.repeat(40), GITHUB_RUN_NUMBER: '10' }; await notifyOps(env, async (url, options) => { calls++; assert.equal(String(url), env.OPS_FAQ_SYNC_URL); assert.equal(options.headers['X-FAQ-Signature-256'], 'sha256=' + createHmac('sha256', env.OPS_FAQ_SYNC_SECRET).update(options.body).digest('hex')); assert.equal(JSON.parse(options.body).commit, env.GITHUB_SHA); return Response.json({ accepted: true }); }); assert.equal(calls, 1); await assert.rejects(notifyOps({ ...env, GITHUB_REF: 'refs/heads/feature' })); });

const testEnv = {
    OPS_FAQ_SYNC_URL: 'https://ops.example/private-test-path?token=test-url-token',
    OPS_FAQ_SYNC_SECRET: 'test-only-secret'.repeat(3),
    GITHUB_REF: 'refs/heads/main',
    GITHUB_EVENT_NAME: 'push',
    GITHUB_SHA: 'a'.repeat(40),
    GITHUB_RUN_NUMBER: '10',
};
const sensitiveDetails = `${testEnv.OPS_FAQ_SYNC_URL} ${testEnv.OPS_FAQ_SYNC_SECRET} test-response-body sha256=test-signature`;
function assertSafe(message) {
    for (const value of [testEnv.OPS_FAQ_SYNC_SECRET, 'ops.example', 'private-test-path', 'test-url-token', 'test-response-body', 'test-signature', 'untrusted-error-code'])
        assert.ok(!message.includes(value), 'diagnostics must not contain sensitive details');
}
async function rejectsWithDiagnostic(promise, code, detail) {
    await assert.rejects(promise, error => {
        const message = formatSyncError(error);
        assert.ok(message.includes(`[FAQ_SYNC_${code}]`), message);
        if (detail) assert.match(message, detail);
        assertSafe(message);
        return true;
    });
}

test('missing configuration still skips sending and names only the missing variables', async t => {
    const logs = [];
    t.mock.method(console, 'log', message => logs.push(message));
    let calls = 0;
    for (const env of [{}, { ...testEnv, OPS_FAQ_SYNC_URL: ' ' }, { ...testEnv, OPS_FAQ_SYNC_SECRET: ' ' }])
        await notifyOps(env, async () => { calls++; });
    assert.equal(calls, 0);
    assert.match(logs[0], /Missing or empty: OPS_FAQ_SYNC_URL, OPS_FAQ_SYNC_SECRET/);
    assert.match(logs[1], /Missing or empty: OPS_FAQ_SYNC_URL\./);
    assert.match(logs[2], /Missing or empty: OPS_FAQ_SYNC_SECRET\./);
    logs.forEach(assertSafe);
});

test('URL, key and publication context errors are distinct and never send a request', async t => {
    let calls = 0;
    const fetcher = async () => { calls++; };
    for (const url of ['not-an-absolute-url', 'https://', 'ftp://ops.example', 'https://user:password@ops.example'])
        await t.test('invalid URL configuration', () => rejectsWithDiagnostic(notifyOps({ ...testEnv, OPS_FAQ_SYNC_URL: url }, fetcher), 'URL_CONFIG', /OPS_FAQ_SYNC_URL/));
    await rejectsWithDiagnostic(notifyOps({ ...testEnv, OPS_FAQ_SYNC_SECRET: ' short-key ' }, fetcher), 'SECRET_CONFIG', /at least 32 characters/);
    for (const context of [{ GITHUB_REF: 'refs/heads/feature' }, { GITHUB_EVENT_NAME: 'pull_request' }, { GITHUB_SHA: 'invalid' }, { GITHUB_RUN_NUMBER: 'invalid' }])
        await rejectsWithDiagnostic(notifyOps({ ...testEnv, ...context }, fetcher), 'PUBLICATION_CONTEXT');
    assert.equal(calls, 0);
});

test('network diagnostics expose only recognized transport codes, never raw errors or causes', async t => {
    for (const code of ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'CERT_HAS_EXPIRED', 'untrusted-error-code']) {
        await t.test(code === 'untrusted-error-code' ? 'unknown code is withheld' : code, async () => {
            const error = new TypeError(sensitiveDetails, { cause: Object.assign(new Error(sensitiveDetails), { code }) });
            await rejectsWithDiagnostic(notifyOps(testEnv, async () => { throw error; }), 'NETWORK', /before receiving an HTTP response/);
            if (code !== 'untrusted-error-code') {
                await assert.rejects(notifyOps(testEnv, async () => { throw error; }), error => {
                    assert.ok(formatSyncError(error).includes(code));
                    return true;
                });
            }
        });
    }
    const message = formatSyncError(new Error(sensitiveDetails));
    assert.match(message, /\[FAQ_SYNC_UNEXPECTED\]/);
    assertSafe(message);
});

test('request timeout and underlying connection/body timeouts are distinguished from network failures', async t => {
    for (const code of ['ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT']) {
        await t.test(code, () => rejectsWithDiagnostic(notifyOps(testEnv, async () => {
            throw new TypeError(sensitiveDetails, { cause: { code, message: sensitiveDetails } });
        }), 'TIMEOUT', /20000 ms/));
    }
    await rejectsWithDiagnostic(notifyOps(testEnv, async () => {
        throw new DOMException(sensitiveDetails, 'TimeoutError');
    }), 'TIMEOUT');
    t.mock.method(AbortSignal, 'timeout', milliseconds => {
        assert.equal(milliseconds, 20000);
        return AbortSignal.abort(new DOMException(sensitiveDetails, 'AbortError'));
    });
    await rejectsWithDiagnostic(notifyOps(testEnv, async (_, { signal }) => {
        signal.throwIfAborted();
    }), 'TIMEOUT');
});

test('HTTP errors include status even for HTML responses and redirects, without following redirects', async t => {
    for (const status of [301, 302, 307, 400, 401, 403, 404, 422, 429, 500, 503]) {
        await t.test(`HTTP ${status}`, () => rejectsWithDiagnostic(notifyOps(testEnv, async (_, options) => {
            assert.equal(options.redirect, 'manual');
            return new Response(sensitiveDetails, { status, statusText: 'test-response-body', headers: { Location: testEnv.OPS_FAQ_SYNC_URL } });
        }), 'HTTP', new RegExp(`HTTP ${status}`)));
    }
});

test('invalid acknowledgments report response format and HTTP status without response content', async t => {
    const cases = [
        ['missing body', () => new Response(null, { status: 204 }), /HTTP 204.*body is missing/],
        ['empty body', () => new Response(''), /not valid JSON/],
        ['HTML body', () => new Response(`<html>${sensitiveDetails}</html>`), /not valid JSON/],
        ['broken JSON', () => new Response(`{"accepted":true,"detail":"${sensitiveDetails}`), /not valid JSON/],
        ...[null, true, [], {}, { accepted: false }, { accepted: 'true', detail: sensitiveDetails }].map(value => ['missing or invalid accepted field', () => Response.json(value), /must contain accepted: true/]),
        ['oversized body', () => new Response(JSON.stringify({ accepted: true, detail: 'x'.repeat(4096) })), /exceeds the 4096-byte limit/],
    ];
    for (const [name, response, detail] of cases) {
        await t.test(name, () => rejectsWithDiagnostic(notifyOps(testEnv, async () => response()), 'RESPONSE_FORMAT', detail));
    }
});

test('acknowledgment stream failures retain HTTP status and network/timeout classification', async t => {
    for (const [code, category] of [['ECONNRESET', 'NETWORK'], ['UND_ERR_BODY_TIMEOUT', 'TIMEOUT']]) {
        await t.test(category, () => rejectsWithDiagnostic(notifyOps(testEnv, async () => new Response(new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode('{"accepted":'));
                controller.error(new TypeError(sensitiveDetails, { cause: { code, message: sensitiveDetails } }));
            },
        }))), category, /while reading the response \(HTTP 200\)/));
    }
});

test('valid streamed JSON at the response limit is accepted, and oversized streams are cancelled', async t => {
    const logs = [];
    t.mock.method(console, 'log', message => logs.push(message));
    const acknowledgment = new TextEncoder().encode(JSON.stringify({ accepted: true, padding: '' }).padEnd(4096, ' '));
    await notifyOps({ ...testEnv, GITHUB_EVENT_NAME: 'workflow_dispatch' }, async () => new Response(new ReadableStream({
        start(controller) {
            controller.enqueue(acknowledgment.slice(0, 15));
            controller.enqueue(acknowledgment.slice(15));
            controller.close();
        },
    })));
    assert.deepEqual(logs, ['Published FAQ notification acknowledged.']);
    let cancelled = false;
    await rejectsWithDiagnostic(notifyOps(testEnv, async () => new Response(new ReadableStream({
        start(controller) { controller.enqueue(new Uint8Array(4097)); },
        cancel() { cancelled = true; },
    }))), 'RESPONSE_FORMAT', /4096-byte limit/);
    assert.equal(cancelled, true);
});

test('CLI exits with failure and emits safe categorized diagnostics for Actions', async t => {
    const script = fileURLToPath(new URL('./consultation-faq.mjs', import.meta.url));
    const cases = [
        ['URL_CONFIG', { OPS_FAQ_SYNC_URL: `invalid:${sensitiveDetails}` }],
        ['SECRET_CONFIG', { OPS_FAQ_SYNC_SECRET: 'short-key' }],
        ['NETWORK', {}, `globalThis.fetch = async () => { throw new Error(${JSON.stringify(sensitiveDetails)}); };`],
        ['TIMEOUT', {}, `globalThis.fetch = async () => { throw new DOMException(${JSON.stringify(sensitiveDetails)}, 'TimeoutError'); };`],
        ['HTTP', {}, `globalThis.fetch = async () => new Response(${JSON.stringify(sensitiveDetails)}, {status: 401});`],
        ['RESPONSE_FORMAT', {}, `globalThis.fetch = async () => new Response(${JSON.stringify(sensitiveDetails)});`],
    ];
    for (const [code, overrides, preload] of cases) {
        await t.test(code, () => {
            const args = preload ? ['--import', `data:text/javascript,${encodeURIComponent(preload)}`, script] : [script];
            const result = spawnSync(process.execPath, args, { env: { ...process.env, ...testEnv, ...overrides }, encoding: 'utf8', timeout: 5000 });
            assert.ifError(result.error);
            assert.equal(result.status, 1);
            assert.equal(result.stdout, '');
            assert.ok(result.stderr.includes(`[FAQ_SYNC_${code}]`), result.stderr);
            assertSafe(result.stderr);
        });
    }
});

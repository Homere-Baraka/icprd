import crypto from 'crypto';

export function getFingerprint(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    const userAgent = req.headers.get('user-agent') || 'unknown';

    return crypto
        .createHash('sha256')
        .update(ip + userAgent)
        .digest('hex');
}

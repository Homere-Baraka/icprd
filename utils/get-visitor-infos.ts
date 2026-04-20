import { v4 as uuidv4 } from 'uuid';

export async function getVisitorInfos(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/visitor_session_id=([^;]+)/);
    let sessionId = match ? match[1] : null;
    let isNewSession = false;

    if (!sessionId) {
        sessionId = uuidv4();
        isNewSession = true;
    }

    const now = new Date();

    let geo = {
        status: 'fail',
        country: 'Unknown',
        regionName: 'Unknown',
        city: 'Unknown',
    };

    try {
        const response = await fetch(
            `http://ip-api.com/json/${ip}?fields=status,country,regionName,city`,
        );
        geo = await response.json();
    } catch (e) {
        console.error('Erreur GeoIP:', e);
    }

    return {
        sessionId,
        isNewSession,
        ip,
        country: geo.status === 'success' ? geo.country : 'Unknown',
        region: geo.status === 'success' ? geo.regionName : 'Unknown',
        city: geo.status === 'success' ? geo.city : 'Unknown',
        userAgent,
        fullDate: now,
        hour: now.getHours(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        path: new URL(req.url).pathname,
    };
}

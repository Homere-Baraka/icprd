
export async function getVisitorInfos(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    const now = new Date();
    const timestamp = {
        fullDate: now.toISOString(),
        hour: now.getHours(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear()
    };

    const geo = await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json());

    return {
        ip,
        country: geo.country,
        region: geo.regionName,
        city: geo.city,
        userAgent,
        ...timestamp,
        path: new URL(req.url).pathname
    };
}
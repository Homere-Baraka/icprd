import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getVisitorInfos } from '@/utils/get-visitor-infos';

export async function POST(req: Request) {
    try {
        const {
            sessionId,
            isNewSession,
            ip,
            userAgent,
            country,
            region,
            city,
            path,
        } = await getVisitorInfos(req);

        let visitor;

        try {
            visitor = await prisma.visitor.upsert({
                where: { ip: ip },
                update: { updatedAt: new Date() },
                create: {
                    ip: ip,
                    userAgent: userAgent,
                    country: country,
                    region: region,
                    city: city,
                },
            });
        } catch (e: any) {
            if (e.code === 'P2002') {
                visitor = await prisma.visitor.update({
                    where: { ip: ip },
                    data: { updatedAt: new Date() },
                });
            } else {
                throw e;
            }
        }

        await prisma.visitorSession.upsert({
            where: { id: sessionId },
            update: {
                lastActivity: new Date(),
                pagesCount: { increment: 1 },
                pageViews: { create: { url: path } },
            },
            create: {
                id: sessionId,
                visitorId: visitor.id,
                pagesCount: 1,
                pageViews: { create: { url: path } },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Tracking Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}

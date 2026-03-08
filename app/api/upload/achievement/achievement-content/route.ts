import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Aucun fichier reçu.' },
                { status: 400 },
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '_' + file.name.replace(/\s+/g, '_');
        const uploadDir = path.join(
            process.cwd(),
            'public/uploads/achievements/achievement-content',
        );

        await mkdir(uploadDir, { recursive: true });

        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/achievements/achievement-content/${filename}`,
        });
    } catch (error) {
        console.error('[ACHIEVEMENT_UPLOAD_ERROR]:', error);
        return NextResponse.json(
            { error: 'Error while uplaod file.' },
            { status: 500 },
        );
    }
}

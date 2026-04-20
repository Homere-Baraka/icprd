import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Fichier manquant' },
                { status: 400 },
            );
        }

        // Conversion du fichier en Buffer de manière plus stable
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Chemin de destination
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        const uploadDir = path.join(
            process.cwd(),
            'public',
            'uploads',
            'gallery',
        );

        // Création du dossier si inexistant
        await mkdir(uploadDir, { recursive: true });

        // Écriture du fichier
        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/gallery/${filename}`,
        });
    } catch (error: any) {
        // CE LOG EST CRUCIAL : Regarde ton terminal (pas le navigateur)
        console.error('--- ERREUR SERVEUR API ---');
        console.error(error);
        return NextResponse.json(
            { error: "Erreur serveur lors de l'écriture" },
            { status: 500 },
        );
    }
}

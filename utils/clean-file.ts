import fs from 'fs/promises';
import path from 'path';

/**
 * Supprime les images de couverture et les images Tiptap du disque.
 * @param coverUrl - L'URL de l'image de couverture (située dans /uploads/blog)
 * @param htmlContents - Un tableau des chaînes HTML (les blocs contents)
 */

export async function cleanupBlogFiles(
    coverUrl?: string | null,
    htmlContents: string[] = [],
) {
    const filesToDelete: string[] = [];

    if (coverUrl && coverUrl.startsWith('/uploads/')) {
        filesToDelete.push(coverUrl);
    }

    // Extraction des images du contenu (blog-content)
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    htmlContents.forEach((html) => {
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            const src = match[1];
            if (src.startsWith('/uploads/')) {
                filesToDelete.push(src);
            }
        }
    });

    const results = await Promise.allSettled(
        filesToDelete.map(async (fileUrl) => {
            const relativePath = fileUrl.startsWith('/')
                ? fileUrl.substring(1)
                : fileUrl;
            const absolutePath = path.join(
                process.cwd(),
                'public',
                relativePath,
            );

            try {
                await fs.unlink(absolutePath);
                console.log(`✅ Supprimé : ${relativePath}`);
            } catch (err: any) {
                if (err.code === 'ENOENT') {
                    console.warn(`Fichier déjà absent : ${relativePath}`);
                } else {
                    console.error(
                        `Erreur suppression ${relativePath} :`,
                        err.message,
                    );
                }
            }
        }),
    );

    return results;
}

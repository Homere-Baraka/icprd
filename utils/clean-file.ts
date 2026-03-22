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
    const filesToDelete = new Set<string>();

    if (coverUrl && coverUrl.startsWith('/uploads/')) {
        filesToDelete.add(coverUrl);
    }

    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    htmlContents.forEach((html) => {
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            const src = match[1];
            if (src.startsWith('/uploads/')) {
                filesToDelete.add(src);
            }
        }
    });

    const results = await Promise.allSettled(
        Array.from(filesToDelete).map(async (fileUrl) => {
            const relativePath = fileUrl.startsWith('/')
                ? fileUrl.substring(1)
                : fileUrl;

            const cleanRelativePath = path
                .normalize(relativePath)
                .replace(/^(\.\.(\/|\\|$))+/, '');

            const absolutePath = path.join(
                process.cwd(),
                'public',
                cleanRelativePath,
            );

            const publicPath = path.join(process.cwd(), 'public');
            if (!absolutePath.startsWith(publicPath)) {
                console.error('DELETING_PATH_ERROR :', relativePath);
                return;
            }

            try {
                await fs.unlink(absolutePath);
                console.log(`Deleted : ${relativePath}`);
            } catch (err: any) {
                if (err.code === 'ENOENT') {
                    console.warn("File doesn't exist : ", relativePath);
                } else {
                    console.error(
                        'Deletion error  :',
                        relativePath,
                        err.message,
                    );
                }
            }
        }),
    );

    return results;
}

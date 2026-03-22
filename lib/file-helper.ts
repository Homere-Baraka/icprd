import fs from 'fs/promises';
import path from 'path';

/**
 * Supprime un fichier du stockage local quel que soit le sous-dossier (profile, blogs, etc.)
 * @param fileUrl - L'URL stockée en DB (ex: "/uploads/profile/user-123.jpg")
 */

export async function deleteFileFromStorage(
    fileUrl: string | null | undefined,
): Promise<boolean> {
    if (!fileUrl || fileUrl.trim() === '') return false;

    try {
        const decodedPath = decodeURIComponent(fileUrl);
        const urlPath = new URL(decodedPath, 'http://localhost.com').pathname;

        const absolutePath = path.join(process.cwd(), 'public', urlPath);

        const publicDir = path.join(process.cwd(), 'public');
        if (!absolutePath.startsWith(publicDir)) {
            console.error(
                '[Security] Tentative de suppression en dehors du dossier public !',
            );
            return false;
        }

        await fs.access(absolutePath);

        await fs.unlink(absolutePath);

        console.log(`[Success] Fichier supprimé : ${urlPath}`);
        return true;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.warn(`[Warn] File doesn't exist : ${fileUrl}`);
            return true;
        }
        console.error(`[Error] Error while deleting ${fileUrl}:`, error);
        return false;
    }
}

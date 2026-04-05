import MainLayout from '@/components/admin-panel/main-layout';
import Gallery from '@/components/admin-panel/pages/gallery';
import { getDictionary } from '@/lib/get-dictionary';

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Gallery dict={dict.admin_gallery} />
        </>
    );
}

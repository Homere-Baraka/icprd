import CreateGallery from '@/components/admin-panel/pages/creations/create-gallery';

export default async function createGalleryPage({
    params,
}: {
    params: Promise<{ galleryId: string }>;
}) {
    const { galleryId } = await params;

    return (
        <>
            <CreateGallery galleryId={galleryId} />
        </>
    );
}

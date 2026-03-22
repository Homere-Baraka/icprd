import MainLayout from '@/components/admin-panel/main-layout';
import CreatePost from '@/components/admin-panel/pages/creations/create-blog';

export default async function BlogUpdatePage({
    params,
}: {
    params: Promise<{ blogId: string }>;
}) {
    const { blogId } = await params;

    return (
        <MainLayout>
            <CreatePost blogId={String(blogId)} />
        </MainLayout>
    );
}

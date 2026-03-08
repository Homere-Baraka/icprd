import MainLayout from '@/components/admin-panel/main-layout';
import CreatePost from '@/components/admin-panel/pages/creations/create-blog';

export default async function PostUpdatePage({
    params,
}: {
    params: Promise<{ blogId: string }>;
}) {
    const { blogId } = await params;

    console.log('postId: ', blogId);

    return (
        <MainLayout>
            <CreatePost blogId={String(blogId)} />
        </MainLayout>
    );
}

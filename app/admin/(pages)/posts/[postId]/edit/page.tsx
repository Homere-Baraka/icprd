import MainLayout from '@/components/admin-panel/main-layout';
import CreatePost from '@/components/admin-panel/pages/creations/create-post';

export default async function PostUpdatePage({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const { postId } = await params;

    console.log('postId: ', postId);

    return (
        <MainLayout>
            <CreatePost postId={String(postId)} />
        </MainLayout>
    );
}

import MainLayout from '@/components/sections/admin-panel/main-layout';
import CreatePost from '@/components/sections/admin-panel/pages/creations/create-post';

export default async function PostPage({
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

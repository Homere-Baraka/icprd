import { getBlogByIdAction } from '@/actions/admin/blog';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ blogId: string }> },
) {
    const { blogId } = await params;

    const result = await getBlogByIdAction(blogId, req);

    if (!result.success) {
        return Response.json(result, {
            status: result.message === 'Post not found' ? 404 : 500,
        });
    }

    return Response.json(result);
}
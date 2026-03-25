import { getBlogByIdAction } from '@/actions/admin/blog';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ blogId: string }> },
) {
    const resolvedParams = await params;

    const blogId = resolvedParams.blogId;

    console.log('blogId:', blogId);

    const result = await getBlogByIdAction(req, blogId);

    return Response.json(result);
}

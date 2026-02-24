import { getServerSession } from 'next-auth';
import { authOptions } from './options';

export async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Response('Forbiden', { status: 403 });
    }

    return session;
}

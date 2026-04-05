import MainLayout from '@/components/admin-panel/main-layout';
import CreateTeam from '@/components/admin-panel/pages/creations/create-team';

export default async function TeamUpdatePage({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = await params;

    return (
        <>
            <CreateTeam teamId={String(teamId)} />
        </>
    );
}

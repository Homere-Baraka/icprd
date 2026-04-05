import MainLayout from '@/components/admin-panel/main-layout';
import CreateAchievement from '@/components/admin-panel/pages/creations/create-achievement';

export default async function AchievementUpdatePage({
    params,
}: {
    params: Promise<{ achievementId: string }>;
}) {
    const { achievementId } = await params;

    return (
        <>
            <CreateAchievement achievementId={String(achievementId)} />
        </>
    );
}

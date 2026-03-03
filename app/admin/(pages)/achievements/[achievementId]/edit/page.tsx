import MainLayout from '@/components/sections/admin-panel/main-layout';
import CreateAchievement from '@/components/sections/admin-panel/pages/creations/create-achievement';

export default async function AchievementUpdatePage({
    params,
}: {
    params: Promise<{ achievementId: string }>;
}) {
    const { achievementId } = await params;

    console.log('achievementId: ', achievementId);

    return (
        <MainLayout>
            <CreateAchievement achievementId={String(achievementId)} />
        </MainLayout>
    );
}

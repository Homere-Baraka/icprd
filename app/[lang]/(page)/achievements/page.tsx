import MainLayout from '@/components/sections/shares/main-layout';
import AchievementsHero from '@/components/sections/achievement/achievement-hero';
import FeatureAchievement from '@/components/sections/achievement/achievement-feature';
import AchievementInfos from '@/components/sections/achievement/achievement-infos';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';
import { getDictionary } from '@/lib/get-dictionary';

export default async function AchievementPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'fr' | 'en');

    return (
        <MainLayout>
            <AchievementsHero dict={dict.achievement_hero} />
            <FeatureAchievement />
            <AchievementInfos />
            <NewsletterSection dict={dict.newsletter} />
        </MainLayout>
    );
}

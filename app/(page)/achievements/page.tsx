import MainLayout from '@/components/sections/shares/main-layout';
import AchievementsHero from '@/components/sections/achievement/achievement-hero';
import FeatureAchievement from '@/components/sections/achievement/achievement-feature';
import AchievementInfos from '@/components/sections/achievement/achievement-infos';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';

export default function BlogPage() {
    return (
        <MainLayout>
            <AchievementsHero />
            <FeatureAchievement />
            <AchievementInfos />
            <NewsletterSection />
        </MainLayout>
    );
}

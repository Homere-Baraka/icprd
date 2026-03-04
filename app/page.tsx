import HeroSection from '@/components/sections/shares/hero';
import MainLayout from '@/components/sections/shares/main-layout';
import ImpactSection from '@/components/sections/home-sections/impact-section';
import InterventionSection from '@/components/sections/home-sections/intervention-section';
import MissionSection from '@/components/sections/home-sections/mission-section';
import ReabilitationSection from '@/components/sections/home-sections/reabilitation-section';
import GallerySection from '@/components/sections/home-sections/gallery-section';
import AchievementSection from '@/components/sections/home-sections/achievement-section';
import TeamSection from '@/components/sections/home-sections/team-section';
import CTASection from '@/components/sections/home-sections/cta-section';
import BlogSection from '@/components/sections/home-sections/blog-section';
import ContactSection from '@/components/sections/home-sections/contact-section';

export default function Home() {
    return (
        <MainLayout>
            <HeroSection />
            <ImpactSection />
            <InterventionSection />
            <MissionSection />
            <ReabilitationSection />
            <GallerySection />
            <AchievementSection />
            <TeamSection />
            <CTASection />
            <BlogSection />
            <ContactSection />
        </MainLayout>
    );
}

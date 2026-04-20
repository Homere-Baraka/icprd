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

import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <MainLayout>
            <HeroSection dict={dict.hero} />
            <ImpactSection dict={dict.stats} />
            <InterventionSection dict={dict.pillars} lang={lang} />
            <MissionSection dict={dict.mission} />
            <ReabilitationSection dict={dict.environment} />
            <GallerySection dict={dict.gallery} lang={lang} />
            <AchievementSection dict={dict.achievements} />
            <TeamSection dict={dict.team} />
            <CTASection dict={dict.cta} />
            <BlogSection dict={dict.blog} />
            <ContactSection dict={dict.contact} />
        </MainLayout>
    );
}

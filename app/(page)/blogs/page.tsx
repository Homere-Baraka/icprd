import MainLayout from '@/components/sections/shares/main-layout';
import BlogHero from '@/components/sections/blog/blog-hero';
import FeatureBlog from '@/components/sections/blog/feature-blog';
import BlogInfos from '@/components/sections/blog/blog-infos';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';

export default function BlogPage() {
    return (
        <MainLayout>
            <BlogHero />
            <FeatureBlog />
            <BlogInfos />
            <NewsletterSection />
        </MainLayout>
    );
}

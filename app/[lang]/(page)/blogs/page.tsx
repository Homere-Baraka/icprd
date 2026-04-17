import MainLayout from '@/components/sections/shares/main-layout';
import BlogHero from '@/components/sections/blog/blog-hero';
import FeatureBlog from '@/components/sections/blog/feature-blog';
import BlogInfos from '@/components/sections/blog/blog-infos';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';
import { getDictionary } from '@/lib/get-dictionary';

export default async function BlogPage({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <MainLayout>
            <BlogHero dict={dict.blog_hero} />
            <FeatureBlog />
            <BlogInfos lang={lang} />
            <NewsletterSection dict={dict.newsletter} />
        </MainLayout>
    );
}

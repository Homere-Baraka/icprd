import MainLayout from '@/components/sections/shares/main-layout';
import FilterGallery from '@/components/sections/gallery/filter-gallery';
import HeroGallerySection from '@/components/sections/gallery/hero-gallery';
import CTAGallery from '@/components/sections/gallery/cta-gallery';
import GallerySection from '@/components/sections/home-sections/gallery-section';
import { getDictionary } from '@/lib/get-dictionary';

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'fr' | 'en');

    return (
        <MainLayout>
            <HeroGallerySection />
            <FilterGallery />
            <GallerySection dict={dict.gallery} />
            <CTAGallery />
        </MainLayout>
    );
}

import MainLayout from '@/components/sections/shares/main-layout';
import FilterGallery from '@/components/sections/gallery/filter-gallery';
import HeroGallerySection from '@/components/sections/gallery/hero-gallery';
import CTAGallery from '@/components/sections/gallery/cta-gallery';
import GallerySection from '@/components/sections/home-sections/gallery-section';

export default function GalleryPage() {
    return (
        <MainLayout>
            <HeroGallerySection />
            <FilterGallery />
            <GallerySection />
            <CTAGallery />
        </MainLayout>
    );
}

import MainLayout from '@/components/admin-panel/main-layout';
import Partners from '@/components/admin-panel/pages/partner';
import { getDictionary } from '@/lib/get-dictionary';

export default async function AchievementPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'fr' | 'en');

    return (
        <>
            <Partners />
        </>
    );
}

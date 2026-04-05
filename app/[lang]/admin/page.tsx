import Dashboard from '@/components/admin-panel/dashboard';
import { getDictionary } from '@/lib/get-dictionary';

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Dashboard />
        </>
    );
}

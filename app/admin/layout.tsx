import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/hooks/theme-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    console.log('session: ', session);

    if (!session || !session.user) {
        redirect('/accounts/login');
    }

    if (
        !session.user.role &&
        !['ADMIN', 'MEMBER'].includes(session.user.role)
    ) {
        redirect('/accounts/login?error=AccessDenied');
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            // forcedTheme="dark"
        >
            <div className="min-h-screen">{children}</div>
        </ThemeProvider>
    );
}

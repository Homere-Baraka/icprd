import { ThemeProvider } from '@/hooks/theme-provider';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            // forcedTheme="dark"
        >
            <div className="min-h-screen">
                {children}
            </div>
        </ThemeProvider>
    );
}

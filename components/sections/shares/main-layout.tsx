import NavBar from './nav-bar';
import FooterSection from './footer';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar />
            <main className="flex-1 overflow-x-hidden custom-scrollbar">
                {children}
            </main>
            <FooterSection />
        </div>
    );
}

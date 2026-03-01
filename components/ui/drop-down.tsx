import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function DropdownLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-text-muted hover:bg-primary/5 hover:text-primary transition-all group/item"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            <ChevronRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
            />
        </Link>
    );
}

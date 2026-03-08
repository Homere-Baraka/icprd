import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function EmptyState({
    title,
    description,
    link,
    copy,
    icon,
}: {
    title: string;
    description?: string;
    link?: string;
    copy?: string;
    icon?: any;
}) {
    return (
        <div className="w-full py-24 text-center bg-background rounded-[3rem] border border-dashed border-white/10">
            <div className="size-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500">
                {icon ? icon : <BookOpen size={48} strokeWidth={1.5} />}
            </div>
            <h2 className="text-3xl font-black text-text-main mb-3">{title}</h2>
            <p className="text-text-muted max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                {description}
            </p>
            {link && (
                <Link
                    href={link}
                    className="bg-primary text-white rounded-full px-10 py-4 font-black hover:bg-indigo-500 hover:text-white transition-all"
                >
                    {copy}
                </Link>
            )}
        </div>
    );
}

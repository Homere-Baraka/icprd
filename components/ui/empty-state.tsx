import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function EmptyState({
    title,
    description,
    copy,
}: {
    title: string;
    description?: string;
    copy?: string;
}) {
    return (
        <div className="py-24 text-center bg-background rounded-[3rem] border border-dashed border-white/10">
            <div className="size-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500">
                <BookOpen size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">{title}</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                {description}
            </p>
            <Link
                href="/admin-1001/cours/add"
                className="bg-white text-black px-10 py-4 rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all"
            >
                {copy}
            </Link>
        </div>
    );
}

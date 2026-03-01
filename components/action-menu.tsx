import { useEffect, useState, useRef } from 'react';
import DropdownLink from './ui/drop-down';
import { MoreVertical, Eye, PlusCircle } from 'lucide-react';

export default function ActionMenu({ postId }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-background rounded-md transition-colors text-slate-400"
            >
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-12 mt-2 w-56 bg-card border border-card-border rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in duration-200">
                    <DropdownLink
                        href={`/admin/posts/${postId}`}
                        icon={<Eye size={16} />}
                        label="Voir le détail"
                    />
                    <DropdownLink
                        href={`/admin/posts/${postId}/edit`}
                        icon={<PlusCircle size={16} />}
                        label="Editer la publication"
                    />
                </div>
            )}
        </div>
    );
}

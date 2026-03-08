'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { HashtagHeading } from '@/lib/hashtag';
import { useMemo, useEffect, useRef } from 'react';
import {
    Type,
    Heading1,
    List,
    Image as ImageIcon,
    Loader2,
    Quote,
    Code,
} from 'lucide-react';

interface EditorProps {
    initialContent: string;
    onChange: (html: string) => void;
    onImageUpload: (file: File) => Promise<string | null>;
}

export default function BlogEditor({
    initialContent,
    onChange,
    onImageUpload,
}: EditorProps) {
    const isInitialized = useRef(false);

    const extensions = useMemo(
        () => [
            StarterKit.configure({ heading: false }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            HashtagHeading,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full my-4 shadow-md',
                },
            }),
            Placeholder.configure({
                placeholder: 'Écrivez votre blog...',
            }),
        ],
        [],
    );

    const editor = useEditor({
        extensions,
        content: initialContent,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap prose prose-blue max-w-none focus:outline-none min-h-[350px] p-6',
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && initialContent && !isInitialized.current) {
            editor.commands.setContent(initialContent);
            isInitialized.current = true;
        }
    }, [initialContent, editor]);

    // Gestion de l'image locale à l'éditeur
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editor) {
            console.log('Upload en cours...');
            const url = await onImageUpload(file);

            console.log('URL reçue du serveur :', url);

            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
                console.log('Commande setImage exécutée');
            } else {
                console.error("L'URL est vide ou nulle");
            }
        }
    };

    if (!editor) return null;

    const btnStyle = (active: string, attrs = {}) => `
        p-2 rounded transition-colors ${
            editor.isActive(active, attrs)
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-600'
        }`;

    return (
        <div className="border border-card-border rounded-xl overflow-hidden">
            {/* Barre d'outils */}
            <div className="flex items-center gap-1 p-2 border-b border-card-border bg-card sticky top-0 z-20">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={btnStyle('paragraph')}
                >
                    <Type size={18} />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={btnStyle('heading', { level: 1 })}
                >
                    <Heading1 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={btnStyle('bulletList')}
                >
                    <List size={18} />
                </button>
                <div className="w-px h-6 bg-card-border mx-1" />
                <label className="p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-600">
                    <ImageIcon size={18} />
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={btnStyle('blockquote')}
                >
                    <Quote size={18} />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={btnStyle('codeBlock')}
                >
                    <Code size={18} />
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}

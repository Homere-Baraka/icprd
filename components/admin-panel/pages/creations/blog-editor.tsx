'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { HashtagHeading } from '@/lib/hashtag';
import { useMemo, useEffect } from 'react';
import {
    Type,
    Heading1,
    List,
    Image as ImageIcon,
    Loader2,
    Quote,
    Code,
} from 'lucide-react';

interface RichTextEditorProps {
    initialContent: string;
    onChange: (html: string) => void;
    onImageUpload: (file: File) => Promise<string | null>;
}

export default function RichTextEditor({
    initialContent,
    onChange,
    onImageUpload,
}: RichTextEditorProps) {
    const extensions = useMemo(
        () => [
            StarterKit.configure({ heading: false }),
            HashtagHeading,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full my-4 shadow-md',
                },
            }),
            Placeholder.configure({
                placeholder: 'Écrivez quelque chose d’incroyable...',
            }),
        ],
        [],
    );

    const editor = useEditor({
        extensions,
        content: initialContent,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()); // Envoie le HTML au parent à chaque frappe
        },
        editorProps: {
            attributes: {
                class: 'tiptap prose prose-blue max-w-none focus:outline-none min-h-[350px] p-6',
            },
        },
        immediatelyRender: false,
    });

    // Gestion de l'image locale à l'éditeur
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editor) {
            const url = await onImageUpload(file);
            if (url) editor.chain().focus().setImage({ src: url }).run();
        }
    };

    if (!editor) return null;

    const btnStyle = (active: string, attrs = {}) => `
    p-2 rounded transition-colors ${editor.isActive(active, attrs) ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}
  `;

    return (
        <div className="border border-card-border rounded-xl shadow-sm overflow-hidden">
            {/* Barre d'outils style Word */}
            <div className="flex items-center gap-1 p-2 border-b bg-card-border sticky top-0 z-20">
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
                        editor
                            .chain()
                            .focus()
                            .insertContent([
                                {
                                    type: 'hashtagHeading',
                                    attrs: { level: 1 },
                                    content: [{ type: 'text', text: '# ' }],
                                },
                            ])
                            .run()
                    }
                    className={btnStyle('hashtagHeading', { level: 1 })}
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
                <div className="w-px h-6 bg-gray-200 mx-1" />
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

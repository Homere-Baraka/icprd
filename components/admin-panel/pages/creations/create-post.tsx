'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePostValidation } from '@/hooks/use-validation-form';
import {
    createPostAction,
    updatePostAction,
    getPostByIdAction,
} from '@/actions/admin/post';
import { uploadBlogImage } from '@/lib/upload';
import RichTextEditor from './blog-editor'; // Vérifie que le nom du fichier est bien celui-là
import { Save, Send, ArrowLeft } from 'lucide-react';
import useNotification from '@/hooks/use-taost';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function CreatePostPage({ postId }: { postId?: string }) {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotification();

    // États de gestion
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<
        'draft' | 'publish' | null
    >(null);
    const [isInitialLoading, setIsInitialLoading] = useState(!!postId);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = usePostValidation();

    // On surveille le contenu pour pouvoir le passer à l'éditeur
    const currentContent = watch('content');

    // 1. CHARGEMENT DES DONNÉES (MODE ÉDITION)
    useEffect(() => {
        const loadPostData = async () => {
            if (!postId) return;
            setIsInitialLoading(true);
            try {
                const result = await getPostByIdAction(postId);
                if (result.success) {
                    // On remplit tout le formulaire d'un coup
                    reset(result.data as any);
                    if (result.data?.imageUrl) {
                        setPreviewImage(result.data.imageUrl);
                    }
                } else {
                    notifyError(result.message as string);
                }
            } catch (err) {
                notifyError('Erreur lors du chargement des données');
            } finally {
                setIsInitialLoading(false);
            }
        };
        loadPostData();
    }, [postId, reset, notifyError]);

    const handleImageUpload = async (file: File) => {
        const result = await uploadBlogImage(file);
        return result.success ? result.url : null;
    };

    const isEditing = !!postId;

    // 2. LOGIQUE DE SOUMISSION CORRIGÉE
    const processForm = async (data: any, actionType: 'draft' | 'publish') => {
        setIsSubmitting(actionType);
        try {
            const result =
                isEditing && postId
                    ? await updatePostAction(postId, data, actionType)
                    : await createPostAction(data, actionType);

            if (result.success) {
                notifySuccess(
                    isEditing ? 'Mis à jour !' : 'Créé avec succès !',
                );
                router.push('/admin/blogs');
                router.refresh();
            } else {
                notifyError(
                    (result.error as string) || 'Une erreur est survenue.',
                );
            }
        } catch (err) {
            notifyError('Erreur de connexion au serveur');
        } finally {
            setIsSubmitting(null);
        }
    };

    if (isInitialLoading)
        return (
            <div className="flex justify-center p-20">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto p-10">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-black">
                            {isEditing ? 'Modifier le Post' : 'Nouveau Post'}
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {/* BOUTON BROUILLON */}
                        <button
                            type="button"
                            disabled={!!isSubmitting}
                            onClick={handleSubmit((data) =>
                                processForm(data, 'draft'),
                            )}
                            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50"
                        >
                            {isSubmitting === 'draft' ? (
                                <LoadingSpinner />
                            ) : (
                                <Save size={18} />
                            )}
                            Brouillon
                        </button>

                        {/* BOUTON PUBLIER */}
                        <button
                            type="button"
                            disabled={!!isSubmitting}
                            onClick={handleSubmit((data) =>
                                processForm(data, 'publish'),
                            )}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-100"
                        >
                            {isSubmitting === 'publish' ? (
                                <LoadingSpinner />
                            ) : (
                                <Send size={18} />
                            )}
                            Publier
                        </button>
                    </div>
                </header>

                {/* TITRE */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Titre
                    </label>
                    <input
                        {...register('title')}
                        className="w-full text-4xl font-bold border-none outline-none focus:ring-0 placeholder:text-gray-100"
                        placeholder="Titre ici..."
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs font-bold">
                            {errors.title.message as string}
                        </p>
                    )}
                </div>

                {/* ÉDITEUR TIPTAP */}
                <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Contenu
                    </label>
                    <RichTextEditor
                        initialContent={currentContent || ''} // ICI: On passe la valeur de Zod
                        onChange={(html) =>
                            setValue('content', html, { shouldValidate: true })
                        }
                        onImageUpload={handleImageUpload}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-xs font-bold">
                            {errors.content.message as string}
                        </p>
                    )}
                </div>

                {/* CATÉGORIE */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Catégorie
                        </label>
                        <input
                            {...register('category')}
                            placeholder="Ex: Technologie"
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

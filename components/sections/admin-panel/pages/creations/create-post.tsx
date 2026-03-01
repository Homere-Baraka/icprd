'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useNotification from '@/hooks/use-taost';
import { useUser } from '@/hooks/use-user';
import { usePostValidation } from '@/hooks/use-validation-form';
import { createPostAction, updatePostAction } from '@/actions/admin/post';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { getPostByIdAction } from '@/actions/admin/post';
import { uploadImage } from '@/lib/upload';
import {
    Save,
    Edit2,
    ArrowLeft,
    Image as ImageIcon,
    Type,
    Layout,
    Send,
    X,
    Plus,
} from 'lucide-react';

export default function CreatePost({ postId }: { postId?: string }) {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotification();
    const [previewImage, setPreviewImage] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<
        'draft' | 'publish' | null
    >(null);
    const [isInitialLoading, setIsInitialLoading] = useState(!!postId);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = usePostValidation();

    useEffect(() => {
        const loadPostData = async () => {
            if (!postId) return;
            setIsInitialLoading(true);
            try {
                const result = await getPostByIdAction(postId);
                if (result.success) {
                    reset(result.data as any);

                    if (result.data?.imageUrl) {
                        setPreviewImage(result.data.imageUrl);
                        setValue('imageUrl', result.data.imageUrl);
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
    }, [postId, reset]);

    const isEditing = !!postId;

    const onSubmit = async (data: any, actionType: 'draft' | 'publish') => {
        setIsSubmitting(actionType);

        try {
            let result;
            if (isEditing && postId) {
                result = await updatePostAction(postId, data, actionType);
            } else {
                result = await createPostAction(data, actionType);
            }

            if (result.success) {
                const message = isEditing
                    ? actionType === 'publish'
                        ? 'Publication mise à jour !'
                        : 'Brouillon mis à jour !'
                    : actionType === 'publish'
                      ? 'Article créé avec succès !'
                      : 'Brouillon enregistré !';

                notifySuccess(message);

                router.push('/admin/posts');
                router.refresh();
            } else {
                console.error('Une erreur survenue: ', result.error);
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

    return (
        <div className="min-h-screen bg-background p-6 lg:p-10 font-sans text-text-main">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="max-w-6xl mx-auto"
            >
                {/* Header de la page */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2.5 bg-slate-50/10 border border-card-border rounded-xl hover:bg-text-main transition-colors text-slate-400"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">
                                Créer un post{' '}
                                <span className="text-blue-600">.</span>
                            </h1>
                            <p className="text-text-muted font-medium text-sm">
                                Rédigez et publiez votre prochain article.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            name="action"
                            value="draft"
                            disabled={
                                isSubmitting !== null ||
                                isUploading ||
                                isInitialLoading
                            }
                            onClick={handleSubmit((data) => {
                                onSubmit(data, 'draft');
                                console.log('data : ', data);
                            })}
                            className="flex items-center gap-2 px-6 py-2.5 bg-card border border-card-border text-text-main rounded-md font-bold hover:bg-card-border transition-all active:scale-95 cursor-pointer"
                        >
                            {isSubmitting === 'draft' ? (
                                <div className="flex gap-x-3 items-center text-white">
                                    <LoadingSpinner />
                                    Sauvegarde en cours
                                </div>
                            ) : isEditing ? (
                                <>
                                    <Edit2 size={18} />
                                    Modifier le Brouillon
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Sauvegarder en brouillon
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            name="action"
                            value="publish"
                            disabled={
                                isSubmitting !== null ||
                                isUploading ||
                                isInitialLoading
                            }
                            onClick={handleSubmit((data) =>
                                onSubmit(data, 'publish'),
                            )}
                            className="px-6 py-2.5 bg-primary text-white rounded-md font-bold flex items-center gap-2 shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer"
                        >
                            {isSubmitting === 'publish' ? (
                                <div className="flex gap-x-3 items-center text-white">
                                    <LoadingSpinner />
                                    Publication en cours
                                </div>
                            ) : isEditing ? (
                                <>
                                    <Edit2 size={18} />
                                    Modifier le blog
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Publier un blog
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Colonne Principale (Contenu) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-background rounded-xl p-8 border border-card-border shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Type size={14} /> Title
                                </label>
                                <input
                                    type="text"
                                    {...register('title')}
                                    placeholder="Entrez un titre percutant..."
                                    className="w-full text-sm font-bold p-3 bg-card border border-card-border focus:border-primary rounded-lg outline-none transition-all placeholder:text-text-muted"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Excerpt (Résumé) */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                                    EXTRAIT (Résumé)
                                </label>
                                <textarea
                                    rows="3"
                                    {...register('excerpt')}
                                    placeholder="Description courte de l'article pour les cartes de prévisualisation..."
                                    className="w-full p-4 bg-card border border-card-border focus:border-primary rounded-md outline-none transition-all resize-none placeholder:text-text-muted"
                                />
                                {errors.excerpt && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.excerpt.message}
                                    </p>
                                )}
                            </div>

                            {/* Content (Editor Placeholder) */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                                    Content
                                </label>
                                <div className="min-h-[400px] w-full rounded-lg transition-all">
                                    <textarea
                                        {...register('content')}
                                        placeholder="Contenu de la publication"
                                        className="w-full h-full p-4 bg-card rounded-lg border border-card-border focus-within:border-primary outline-none resize-none min-h-[380px] placeholder:text-text-muted"
                                    />
                                </div>
                                {errors.content && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.content.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colonne Latérale (Paramètres) */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div className="bg-card p-6 rounded-xl border border-card-border shadow-sm">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 block">
                                Cover Image
                            </label>
                            <div className="relative group">
                                <div
                                    className={`aspect-video w-full rounded-2xl border-2 border-dashed border-text-subtle flex flex-col items-center justify-center overflow-hidden transition-all ${!previewImage ? 'hover:border-blue-400 hover:bg-blue-50/30' : ''}`}
                                >
                                    {previewImage ? (
                                        <>
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => {
                                                    setPreviewImage(null);
                                                    setValue('imageUrl', '');
                                                }}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center p-4">
                                            <ImageIcon
                                                className="mx-auto text-slate-300 mb-2"
                                                size={32}
                                            />
                                            <p className="text-xs font-bold text-text-muted">
                                                Click to upload image
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={isUploading}
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            setPreviewImage(
                                                URL.createObjectURL(file),
                                            );
                                            setIsUploading(true);

                                            try {
                                                const result =
                                                    await uploadImage(file);

                                                if (result.success) {
                                                    setValue(
                                                        'imageUrl',
                                                        result.url,
                                                        {
                                                            shouldValidate: true,
                                                        },
                                                    );
                                                    notifySuccess(
                                                        'Image téléchargée !',
                                                    );
                                                } else {
                                                    notifyError(
                                                        "Échec de l'upload",
                                                    );
                                                    throw new Error();
                                                }
                                            } catch (err) {
                                                setPreviewImage(null);
                                                notifyError(
                                                    "Erreur réseau lors de l'upload",
                                                );
                                                setValue('imageUrl', '');
                                            } finally {
                                                setIsUploading(false);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Paramètres de Publication - Version Corrigée */}
                        <div className="p-8 rounded-xl border border-card-border shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                                    Catégorie
                                </label>
                                <input
                                    type="text"
                                    {...register('category')}
                                    placeholder="Catégorie du post."
                                    className="w-full text-sm font-bold p-3 bg-card border border-card-border focus:border-primary rounded-lg outline-none transition-all placeholder:text-text-muted"
                                />
                            </div>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

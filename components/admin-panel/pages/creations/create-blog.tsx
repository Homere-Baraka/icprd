'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePostValidation } from '@/hooks/use-validation-form';
import {
    createBlogAction,
    updateBlogAction,
    getBlogByIdAction,
} from '@/actions/admin/blog';
import { uploadBlogContentImage, uploadBlogImage } from '@/lib/upload';
import BlogEditor from '../../../taptap-editor';
import { Save, Send, ArrowLeft, ImageIcon } from 'lucide-react';
import useNotification from '@/hooks/use-taost';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function CreatePostPage({ blogId }: { blogId?: string }) {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotification();

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<
        'draft' | 'publish' | null
    >(null);
    const [isInitialLoading, setIsInitialLoading] = useState(!!blogId);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = usePostValidation();

    const currentContent = watch('contents');

    useEffect(() => {
        const loadPostData = async () => {
            if (!blogId || isDataLoaded) return;

            setIsInitialLoading(true);
            try {
                const result = await getBlogByIdAction(blogId);
                if (result.success) {
                    const blogData = result?.data;

                    let htmlContent = '';

                    if (Array.isArray(blogData?.contents)) {
                        htmlContent = blogData.contents
                            .map((item: any) => item.value)
                            .join('');
                    } else {
                        htmlContent = blogData?.contents || '';
                    }

                    console.log('htmlContent: ', htmlContent);

                    reset({ ...blogData, contents: htmlContent } as any);

                    if (blogData?.imageUrl) {
                        setPreviewImage(blogData?.imageUrl);
                    }

                    setIsDataLoaded(true);
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
    }, [blogId, reset, notifyError, isDataLoaded]);

    const handleBlogContentUpload = async (file: File) => {
        const result = await uploadBlogContentImage(file);
        return result.success ? result.url : null;
    };

    const handleBlogUpload = async (file: File) => {
        const result = await uploadBlogImage(file);
        return result.success ? result.url : null;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewImage(localPreview);

            const url = await handleBlogUpload(file);
            if (url) {
                setPreviewImage(url);
                setValue('imageUrl', url, { shouldValidate: true });
                notifySuccess('Image de couverture téléchargée');
            } else {
                notifyError("Erreur lors de l'upload");
                setPreviewImage(null);
            }
        }
    };

    const isEditing = !!blogId;

    const processForm = async (data: any, actionType: 'draft' | 'publish') => {
        setIsSubmitting(actionType);

        try {
            const result =
                isEditing && blogId
                    ? await updateBlogAction(blogId, data, actionType)
                    : await createBlogAction(data, actionType);

            if (result.success) {
                notifySuccess(
                    isEditing
                        ? 'Contenus mis à jour !'
                        : 'Blog créé avec succès !',
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

    return (
        <>
            {isInitialLoading ? (
                <div className="flex justify-center p-20">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="max-w-5xl mx-auto p-10">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-8"
                    >
                        <header className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="p-2 bg-card border border-card-border rounded-lg hover:bg-card-border cursor-pointer"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <h1 className="text-3xl font-black">
                                    {isEditing
                                        ? 'Modifier le Post'
                                        : 'Nouveau Post'}
                                </h1>
                            </div>
                        </header>

                        {/* TITRE */}
                        <div className="max-w-[400px]">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Titre
                            </label>
                            <input
                                {...register('title')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg outline-none focus:border-blue-500 transition-all"
                                placeholder="Titre ici..."
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.title.message as string}
                                </p>
                            )}
                        </div>

                        <div className="max-w-[300px]">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Catégorie
                                </label>
                                <input
                                    {...register('category')}
                                    placeholder="Ex: Technologie"
                                    className="w-full p-3 bg-card border border-card-border rounded-lg outline-none focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* IMAGE DE COUVERTURE DU BLOG */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Image de couverture (Banner)
                            </label>

                            <div className="relative group w-full h-72 border-2 border-dashed border-card-border rounded-2xl overflow-hidden bg-card flex items-center justify-center transition-all hover:border-blue-500/50">
                                {previewImage ? (
                                    <>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                                                Changer l'image
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors">
                                        <div className="p-4 bg-gray-100 rounded-full">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold">
                                                Cliquez pour uploader la
                                                bannière
                                            </p>
                                            <p className="text-xs">
                                                PNG, JPG ou WEBP (Max. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>
                            {errors.imageUrl && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.imageUrl.message as string}
                                </p>
                            )}
                        </div>

                        {/* ÉDITEUR TIPTAP */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Contenu
                            </label>
                            {(blogId ? isDataLoaded : true) ? (
                                <BlogEditor
                                    initialContent={currentContent || ''}
                                    onChange={(html) =>
                                        setValue('contents', html, {
                                            shouldValidate: true,
                                        })
                                    }
                                    onImageUpload={handleBlogContentUpload}
                                />
                            ) : (
                                <div className="h-[350px] bg-card animate-pulse rounded-xl border border-card-border" />
                            )}
                            {errors.contents && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.contents.message as string}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={!!isSubmitting}
                                onClick={() => {
                                    if (isSubmitting) return;
                                    handleSubmit((data) =>
                                        processForm(data, 'draft'),
                                    );
                                }}
                                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50"
                            >
                                {isSubmitting === 'draft' ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Save size={18} />
                                )}
                                Brouillon
                            </button>

                            <button
                                type="submit"
                                disabled={!!isSubmitting}
                                onClick={() => {
                                    if (isSubmitting) return;
                                    handleSubmit((data) =>
                                        processForm(data, 'publish'),
                                    );
                                }}
                                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
                            >
                                {isSubmitting === 'publish' ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Send size={18} />
                                )}
                                Publier
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

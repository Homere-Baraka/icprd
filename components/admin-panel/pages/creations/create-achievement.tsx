'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAchievementValidation } from '@/hooks/use-validation-form';
import {
    createAchievementAction,
    updateAchievementAction,
    getAchievementByIdAction,
} from '@/actions/admin/achievement';
import {
    uploadAchievementContentImage,
    uploadAchievementImage,
} from '@/lib/upload';
import BlogEditor from '@/components/taptap-editor';
import { Save, Send, Shield, ArrowLeft, ImageIcon } from 'lucide-react';
import useNotification from '@/hooks/use-taost';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function CreateAchievement({
    achievementId,
}: {
    achievementId?: string;
}) {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotification();

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<
        'draft' | 'publish' | null
    >(null);
    const [isInitialLoading, setIsInitialLoading] = useState(!!achievementId);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = useAchievementValidation();

    const currentContent = watch('contents');

    useEffect(() => {
        const loadPostData = async () => {
            if (!achievementId || isDataLoaded) return;

            setIsInitialLoading(true);
            try {
                const result = await getAchievementByIdAction(achievementId);
                if (result.success) {
                    const achievementData = result?.data;

                    let htmlContent = '';

                    if (Array.isArray(achievementData?.contents)) {
                        htmlContent = achievementData.contents
                            .map((item: any) => item.value)
                            .join('');
                    } else {
                        htmlContent = achievementData?.contents || '';
                    }

                    console.log('htmlContent: ', htmlContent);

                    reset({ ...achievementData, contents: htmlContent } as any);

                    if (achievementData?.imageUrl) {
                        setPreviewImage(achievementData?.imageUrl);
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
    }, [achievementId, reset, notifyError, isDataLoaded]);

    const handleAchievementContentUpload = async (file: File) => {
        const result = await uploadAchievementContentImage(file);
        return result.success ? result.url : null;
    };

    const handleAchievementUpload = async (file: File) => {
        const result = await uploadAchievementImage(file);
        return result.success ? result.url : null;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewImage(localPreview);

            const url = await handleAchievementUpload(file);
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

    const isEditing = !!achievementId;

    const processForm = async (data: any, actionType: 'draft' | 'publish') => {
        setIsSubmitting(actionType);

        console.log('content: ', data?.contents);
        try {
            const result =
                isEditing && achievementId
                    ? await updateAchievementAction(
                          achievementId,
                          data,
                          actionType,
                      )
                    : await createAchievementAction(data, actionType);

            if (result.success) {
                notifySuccess(
                    isEditing
                        ? 'Contenus mis à jour !'
                        : 'Réalisation créé avec succès !',
                );
                router.push('/admin/achievements');
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
                        <div className="max-w-[40%]">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                Titre
                            </label>
                            <input
                                {...register('title')}
                                className="w-full p-3 border border-card-border rounded-lg outline-none focus:border-blue-500 transition-all"
                                placeholder="Titre ici..."
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.title.message as string}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 max-w-[60%]">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                    Date de réalisation
                                </label>
                                <input
                                    type="date"
                                    {...register('date')}
                                    className="w-full p-3 bg-background border border-card-border rounded-lg outline-none focus:border-primary transition-all"
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-xs font-bold">
                                        {errors.date.message as string}
                                    </p>
                                )}
                            </div>

                            {/* CATÉGORIE */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                    Catégorie
                                </label>
                                <input
                                    {...register('category')}
                                    placeholder="Ex: Éducation, Santé..."
                                    className="w-full p-3 bg-background border border-card-border rounded-lg outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-tighter ml-1">
                                    Rôle Système
                                </label>
                                <div className="relative">
                                    <Shield
                                        className="absolute left-3 top-3 text-text-muted"
                                        size={16}
                                    />
                                    <select
                                        {...register('status')}
                                        className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-lg outline-none focus:border-primary text-sm font-bold appearance-none"
                                    >
                                        <option value="PENDING">
                                            Réalisation en cours
                                        </option>
                                        <option value="FINISHED">
                                            Réalisation terminée
                                        </option>
                                        <option value="CANCELED">
                                            Réalisation abandonnée
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* REVENUE / BUDGET */}
                        <div className="grid grid-cols-3 gap-4 max-w-[60%]">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                    Revenu / Budget (USD)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('revenue', {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="0.00"
                                    className="w-full p-3 bg-background border border-card-border rounded-lg outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                    Provinces touchées
                                </label>
                                <input
                                    type="number"
                                    {...register('province', {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="0"
                                    className="w-full p-3 bg-background border border-card-border rounded-lg outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                    Pays touchés
                                </label>
                                <input
                                    type="number"
                                    {...register('countries', {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="0"
                                    className="w-full p-3 bg-background border border-card-border rounded-lg outline-none focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* IMAGE DE COUVERTURE DU BLOG */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-widest">
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
                            <label className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                Contenu
                            </label>
                            {(achievementId ? isDataLoaded : true) ? (
                                <BlogEditor
                                    initialContent={currentContent || ''}
                                    onChange={(html) =>
                                        setValue('contents', html, {
                                            shouldValidate: true,
                                        })
                                    }
                                    onImageUpload={
                                        handleAchievementContentUpload
                                    }
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

                            <button
                                type="button"
                                disabled={!!isSubmitting}
                                onClick={handleSubmit((data) =>
                                    processForm(data, 'publish'),
                                )}
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

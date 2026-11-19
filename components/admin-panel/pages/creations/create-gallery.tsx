'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    UploadCloud,
    X,
    ChevronLeft,
    Image as ImageIconLucide,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import { useGalleryValidation } from '@/hooks/use-validation-form';
import {
    getGalleryByIdAction,
    updateGalleryAction,
    createGalleryAction,
} from '@/actions/admin/gallery';
import { uploadGalleryImage } from '@/lib/upload';
import useNotification from '@/hooks/use-taost';

export default function CreateGallery({ galleryId }: { galleryId?: string }) {
    const router = useRouter();
    const { notifySuccess, notifyError } = useNotification();

    // États pour la gestion d'image et UI
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(!!galleryId);
    const [isPending, setIsPending] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEditing = !!galleryId;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useGalleryValidation();

    useEffect(() => {
        if (!galleryId) return;

        const loadGalleryData = async () => {
            setIsInitialLoading(true);
            try {
                const result = await getGalleryByIdAction(galleryId);
                if (result?.success && result.data) {
                    const gallery = result.data;

                    reset({
                        title: gallery.title || '',
                        category: gallery.category || '',
                        description: gallery.description || '',
                        imageUrl: gallery.imageUrl || '',
                    });

                    if (gallery.imageUrl) setPreviewImage(gallery.imageUrl);
                } else {
                    notifyError(
                        result?.error || 'Impossible de charger la galerie',
                    );
                    router.push('/admin/gallery');
                }
            } catch (err) {
                notifyError('Erreur lors du chargement des données');
            } finally {
                setIsInitialLoading(false);
            }
        };
        loadGalleryData();
    }, [galleryId, reset, router, notifyError]);

    // --- GESTION DES FICHIERS ---
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        prepareImage(file);
    };

    const prepareImage = (file: File) => {
        const localPreview = URL.createObjectURL(file);
        setPreviewImage(localPreview);
        setSelectedFile(file);

        setValue('imageUrl', 'pending_upload', { shouldValidate: true });
    };

    const removeImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        setValue('imageUrl', '', { shouldValidate: true });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) prepareImage(file);
    };

    const onSubmit = async (data: any) => {
        setIsPending(true);
        try {
            let finalImageUrl = data.imageUrl;

            if (selectedFile) {
                const uploadResult = await uploadGalleryImage(selectedFile);
                if (uploadResult.success) {
                    finalImageUrl = uploadResult.url;
                } else {
                    throw new Error("Erreur lors de l'upload de l'image");
                }
            }

            const finalData = { ...data, imageUrl: finalImageUrl };

            const result = isEditing
                ? await updateGalleryAction(galleryId!, finalData)
                : await createGalleryAction(finalData);

            if (result.success) {
                notifySuccess(
                    isEditing ? 'Mise à jour réussie' : 'Création réussie',
                );
                router.push('/admin/gallery');
                router.refresh();
            } else {
                notifyError(result.error || 'Une erreur est survenue');
            }
        } catch (err: any) {
            notifyError(err.message || 'Erreur de communication');
        } finally {
            setIsPending(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-main p-4 lg:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            <ImageIconLucide
                                className="text-primary"
                                size={32}
                            />
                            {isEditing
                                ? "Modifier l'élément"
                                : 'Nouvelle Galerie'}
                        </h1>
                    </div>
                    <Link
                        href="/admin/gallery"
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/40 rounded-xl transition-all"
                    >
                        <ChevronLeft size={18} /> Retour
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action="#"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    {/* --- UPLOAD --- */}
                    <div className="lg:col-span-5 space-y-4">
                        <h2 className="text-sm font-bold uppercase text-primary">
                            Média principal
                        </h2>
                        <input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={`relative aspect-square rounded-[2rem] overflow-hidden border-2 border-dashed transition-all
                                ${errors.imageUrl ? 'border-red-500 bg-red-500/5' : 'border-card-border'}
                                ${isDragging ? 'border-primary bg-primary/10 scale-[0.98]' : ''}`}
                        >
                            {!previewImage ? (
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center h-full cursor-pointer p-6 text-center"
                                >
                                    <UploadCloud
                                        size={48}
                                        className="text-primary mb-4"
                                    />
                                    <p className="font-bold">
                                        Glisser ou cliquer pour uploader
                                    </p>
                                    {errors.imageUrl && (
                                        <p className="text-red-500 text-xs mt-2 font-medium">
                                            L'image est requise
                                        </p>
                                    )}
                                </label>
                            ) : (
                                <div className="relative h-full group">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
                                        >
                                            <X size={24} />
                                        </button>
                                        <label
                                            htmlFor="file-upload"
                                            className="p-3 bg-white text-slate-900 rounded-xl cursor-pointer hover:bg-slate-100"
                                        >
                                            <UploadCloud size={24} />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                        {errors.imageUrl && (
                            <p className="text-red-500 text-xs mt-1 ml-1">
                                {errors.imageUrl.message as string}
                            </p>
                        )}
                    </div>

                    {/* --- FORMULAIRE --- */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold mb-2 uppercase text-text-muted">
                                    Titre
                                </label>
                                <input
                                    {...register('title')}
                                    className={`w-full bg-card border ${errors.title ? 'border-red-500' : 'border-card-border'} rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all`}
                                    placeholder="Titre de l'image"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                        {errors.title.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-2 uppercase text-text-muted">
                                    Catégorie
                                </label>
                                <input
                                    {...register('category')}
                                    className={`w-full bg-card border ${errors.category ? 'border-red-500' : 'border-card-border'} rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all`}
                                    placeholder="Ex: Infrastructure, Social..."
                                />
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                        {errors.category.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-2 uppercase text-text-muted">
                                    Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows={6}
                                    className="w-full bg-card border border-card-border rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all resize-none"
                                    placeholder="Détails optionnels..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                        {errors.description.message as string}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            disabled={isPending}
                            className="w-full bg-primary hover:bg-blue-600 disabled:bg-slate-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <CheckCircle2 size={20} />
                            )}
                            {isEditing
                                ? 'Mettre à jour'
                                : 'Enregistrer la galerie'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

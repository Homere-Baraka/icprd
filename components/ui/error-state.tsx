import { RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }: any) {
    return (
        <div className="p-10 text-center bg-red-500/5 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 font-medium mb-4">
                {message || 'Une erreur est survenue'}
            </p>
            <button
                onClick={onRetry}
                className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-red-600 transition-all"
            >
                <RefreshCw size={18} /> Réessayer
            </button>
        </div>
    );
}

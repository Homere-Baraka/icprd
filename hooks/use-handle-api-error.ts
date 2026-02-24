import { AxiosError } from 'axios';

export function handleApiError(error: unknown) {
    if (error instanceof AxiosError) {
        if (error.response) {
            const { status, data } = error.response;

            return {
                message:
                    data?.message ||
                    'Une erreur est survenue, veiller réssayer.',
                status,
                details: data?.details || null,
            };
        } else if (error.request) {
            return {
                message: 'Le serveur ne répond pas',
                status: 0,
                details: null,
            };
        }
    }

    return {
        message: (error as Error)?.message || 'Erreur inconnue',
        status: 0,
        details: null,
    };
}

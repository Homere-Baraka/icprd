'use client';

import { useEffect } from 'react';

export default function GoogleCallback() {
    useEffect(() => {
        if (window.opener) {
            window.opener.location.href = '/explore';
            window.close();
        }
    }, []);

    return <p>Connexion réussie… fermeture de la popup.</p>;
}

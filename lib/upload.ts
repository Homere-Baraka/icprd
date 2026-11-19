export async function uploadTeamImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/team', {
        method: 'POST',
        body: formData,
    });

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur corrompue :', resultText);
        throw new Error('Le serveur a renvoyé une réponse invalide.');
    }

    if (!response.ok) throw new Error('Error to upload file.');

    return data;
}

export async function uploadBlogImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/blog', {
        method: 'POST',
        body: formData,
    });

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur corrompue :', resultText);
        throw new Error('Le serveur a renvoyé une réponse invalide.');
    }

    if (!response.ok) throw new Error('Error to upload file.');

    return data;
}

export async function uploadBlogContentImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/blog/blog-content', {
        method: 'POST',
        body: formData,
    });

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur corrompue :', resultText);
        throw new Error('Le serveur a renvoyé une réponse invalide.');
    }

    if (!response.ok) throw new Error('Error to upload file.');

    return data;
}

export async function uploadAchievementImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/achievement', {
        method: 'POST',
        body: formData,
    });

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur corrompue :', resultText);
        throw new Error('Le serveur a renvoyé une réponse invalide.');
    }

    if (!response.ok) throw new Error('Error to upload file.');

    return data;
}

export async function uploadAchievementContentImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
        '/api/upload/achievement/achievement-content',
        {
            method: 'POST',
            body: formData,
        },
    );

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur corrompue :', resultText);
        throw new Error('Le serveur a renvoyé une réponse invalide.');
    }

    if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'upload du fichier.");
    }

    return data;
}

// PROFILE UPLOAD
export async function uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    console.log("Démarrage de l'upload profil...");

    const response = await fetch('/api/upload/profile', {
        method: 'POST',
        body: formData,
    });

    const resultText = await response.text();

    let data;
    try {
        data = JSON.parse(resultText);
    } catch (err) {
        console.error('Réponse serveur invalide (non-JSON) :', resultText);
        throw new Error('Le serveur a renvoyé une erreur critique.');
    }

    if (!response.ok) {
        throw new Error(data.error || "Échec de l'upload du profil.");
    }

    return data;
}

// GALLERY UPLOAD
export async function uploadGalleryImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/gallery', {
        method: 'POST',
        body: formData,
    });

    const rawResponse = await response.text();

    try {
        const data = JSON.parse(rawResponse);
        if (!response.ok) {
            throw new Error(data.error || "Erreur lors de l'upload");
        }
        return data;
    } catch (err) {
        console.error('Réponse serveur non JSON :', rawResponse);
        throw new Error('Le serveur a renvoyé une erreur formatée en HTML.');
    }
}

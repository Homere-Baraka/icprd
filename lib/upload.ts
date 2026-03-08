export async function uploadBlogImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/blog', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error to upload file.');

    return await response.json();
}

export async function uploadBlogContentImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/blog/blog-content', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error to upload file.');

    return await response.json();
}

export async function uploadAchievementImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/achievement', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Error to upload file.');

    return await response.json();
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

    if (!response.ok) throw new Error('Error to upload file.');

    return await response.json();
}

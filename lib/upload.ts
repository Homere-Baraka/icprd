export async function uploadBlogImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/post', {
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

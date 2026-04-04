export function getDescription(contents: any) {
    if (!contents) return 'No description available.';

    if (Array.isArray(contents)) {
        const firstBlock = contents.find(
            (block) => block.type === 'PARAGRAPH' || block.value,
        );
        const text = firstBlock?.value || '';
        return text.replace(/<[^>]*>?/gm, '').slice(0, 180) + '...';
    }

    if (typeof contents === 'string') {
        return contents.replace(/<[^>]*>?/gm, '').slice(0, 180) + '...';
    }

    return 'Read more...';
}

export function getDescriptionForHeadline(contents: any) {
    if (!contents) return 'No description available.';

    if (Array.isArray(contents)) {
        const firstBlock = contents.find(
            (block) => block.type === 'PARAGRAPH' || block.value,
        );
        const text = firstBlock?.value || '';
        return text.replace(/<[^>]*>?/gm, '').slice(0, 400) + '...';
    }

    if (typeof contents === 'string') {
        return contents.replace(/<[^>]*>?/gm, '').slice(0, 400) + '...';
    }

    return 'Read more...';
}

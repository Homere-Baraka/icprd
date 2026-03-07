export const getAvatarColor = (name: string) => {
    const colors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-emerald-500',
        'bg-amber-500',
        'bg-rose-500',
        'bg-indigo-500',
        'bg-cyan-500',
    ];

    const charSum = name
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
};

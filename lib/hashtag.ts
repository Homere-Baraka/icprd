import { Node, mergeAttributes } from '@tiptap/core';

export const HashtagHeading = Node.create({
    name: 'hashtagHeading',
    group: 'block',
    content: 'inline*',
    defining: true,
    addAttributes() {
        return {
            level: { default: 1 },
            hashtag: { default: '' },
        };
    },
    parseHTML() {
        return [
            { tag: 'h1', attrs: { level: 1 } },
            { tag: 'h2', attrs: { level: 2 } },
        ];
    },
    renderHTML({ node, HTMLAttributes }) {
        const tag = `h${node.attrs.level}`;
        return [tag, HTMLAttributes, 0];
    },
});

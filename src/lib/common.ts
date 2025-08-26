/* eslint-disable import/prefer-default-export */
export function stripMarkdown(input: string) {
    if (typeof input !== 'string') {
        return '';
    }

    return input
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`([^`]*)`/g, '$1')
        // Remove images
        .replace(/!\[.*?\]\(.*?\)/g, '')
        // Remove links but keep text
        .replace(/\[([^\]]*?)\]\(.*?\)/g, '$1')
        // Remove blockquotes
        .replace(/^\s*>+\s?/gm, '')
        // Remove emphasis (bold, italics, strikethrough)
        .replace(/(\*{1,2}|_{1,2}|~{2})(.*?)\1/g, '$2')
        // Remove headings
        .replace(/^\s*#{1,6}\s?/gm, '')
        // Remove horizontal rules
        .replace(/-{3,}|_{3,}|\*{3,}/g, '')
        // Remove extra newlines
        .replace(/\n{2,}/g, '\n')
        .trim();
}

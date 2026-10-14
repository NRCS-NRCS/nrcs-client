interface MdastNode {
    type: string;
    url?: string;
    title?: string | null;
    alt?: string | null;
    value?: string;
    children?: MdastNode[];
}

export interface RemarkImageCaptionOptions {
    figureClassName?: string;
    captionClassName?: string;
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getLoneImage(node: MdastNode) {
    if (node.type !== 'paragraph' || !node.children) {
        return undefined;
    }

    const meaningful = node.children.filter((child) => (
        child.type !== 'text' || (child.value ?? '').trim() !== ''
    ));

    const [image] = meaningful;
    if (meaningful.length !== 1 || image.type !== 'image') {
        return undefined;
    }

    return (image.title ?? '').trim() === '' ? undefined : image;
}

function renderFigure(image: MdastNode, options: RemarkImageCaptionOptions) {
    const alt = image.alt ?? '';
    const caption = (image.title ?? '').trim();

    return `<figure class="${options.figureClassName ?? ''}">`
        + `<img src="${escapeHtml(image.url ?? '')}" alt="${escapeHtml(alt)}" loading="lazy">`
        + `<figcaption class="${options.captionClassName ?? ''}">${escapeHtml(caption)}</figcaption>`
        + '</figure>';
}

function transform(node: MdastNode, options: RemarkImageCaptionOptions) {
    if (!node.children) {
        return;
    }

    const children: MdastNode[] = [];

    node.children.forEach((child) => {
        const image = getLoneImage(child);
        if (image) {
            children.push({ type: 'html', value: renderFigure(image, options) });
            return;
        }

        transform(child, options);
        children.push(child);
    });

    // eslint-disable-next-line no-param-reassign
    node.children = children;
}

export default function remarkImageCaption(options: RemarkImageCaptionOptions = {}) {
    return function transformer(tree: unknown) {
        transform(tree as MdastNode, options);
    };
}

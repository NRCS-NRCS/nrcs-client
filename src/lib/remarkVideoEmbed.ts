import { _cs } from '@togglecorp/fujs';

const YOUTUBE_URL = /^(?:https?:\/\/)?(?:(?:www|m|music)\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|live\/|embed\/|v\/)|youtu\.be\/)([\w-]{11})/i;
const FACEBOOK_URL = /^(?:https?:\/\/)?(?:(?:www|web|m|mbasic)\.)?(?:facebook\.com\/(?:watch\/?\?(?:[^#]*&)?v=\d+|video\.php\?(?:[^#]*&)?v=\d+|reels?\/\d+|[^/?#]+\/videos\/(?:[^/?#]+\/)?\d+)|fb\.watch\/[\w-]+)/i;

const YOUTUBE_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
const FACEBOOK_ALLOW = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';

interface MdastNode {
    type: string;
    lang?: string | null;
    value?: string;
    children?: MdastNode[];
}

type Orientation = 'horizontal' | 'vertical';

interface Embed {
    src: string;
    title: string;
    allow: string;
    ratio: number;
    orientation: Orientation;
    caption?: string;
}

export interface RemarkVideoEmbedOptions {
    figureClassName?: string;
    frameClassName?: string;
    horizontalClassName?: string;
    verticalClassName?: string;
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

function getEmbed(
    rawUrl: string,
    orientation: Orientation,
    caption?: string,
): Embed | undefined {
    const url = rawUrl.trim().replace(/^<|>$/g, '');
    const vertical = orientation === 'vertical';
    const ratio = vertical ? 9 / 16 : 16 / 9;

    const youtube = YOUTUBE_URL.exec(url);
    if (youtube) {
        // Rebuilding from the id drops ?si=, utm_*, &t= and friends
        return {
            src: `https://www.youtube.com/embed/${youtube[1]}`,
            title: 'YouTube video player',
            allow: YOUTUBE_ALLOW,
            ratio,
            orientation,
            caption,
        };
    }

    if (FACEBOOK_URL.test(url)) {
        const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
        const width = vertical ? 720 : 1280;
        const height = vertical ? 1280 : 720;
        return {
            src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}`
                + `&show_text=false&width=${width}&height=${height}`,
            title: 'Facebook video player',
            allow: FACEBOOK_ALLOW,
            ratio,
            orientation,
            caption,
        };
    }

    return undefined;
}

function renderEmbed(embed: Embed, options: RemarkVideoEmbedOptions) {
    const frameClass = _cs(
        options.frameClassName,
        embed.orientation === 'vertical'
            ? options.verticalClassName
            : options.horizontalClassName,
    );
    const caption = embed.caption
        ? `<figcaption class="${options.captionClassName ?? ''}">${escapeHtml(embed.caption)}</figcaption>`
        : '';

    return `<figure class="${options.figureClassName ?? ''}">`
        + `<div class="${frameClass ?? ''}" style="aspect-ratio:${embed.ratio.toFixed(4)}">`
        + `<iframe src="${escapeHtml(embed.src)}" title="${embed.title}" allow="${embed.allow}"`
        + ' loading="lazy" frameborder="0" scrolling="no" allowfullscreen></iframe>'
        + `</div>${caption}</figure>`;
}

function getBlockEmbed(value: string) {
    const fields: Record<string, string> = {};

    value.split('\n').forEach((line) => {
        const field = /^\s*(url|orientation|caption)\s*:\s*(.+?)\s*$/i.exec(line);
        if (field) {
            const [, key, fieldValue] = field;
            fields[key.toLowerCase()] = fieldValue;
        }
    });

    if (!fields.url) {
        return undefined;
    }

    const orientation: Orientation = fields.orientation?.toLowerCase() === 'vertical'
        ? 'vertical'
        : 'horizontal';

    return getEmbed(fields.url, orientation, fields.caption);
}

function transform(node: MdastNode, options: RemarkVideoEmbedOptions) {
    if (!node.children) {
        return;
    }

    const children: MdastNode[] = [];

    node.children.forEach((child) => {
        if (child.type === 'code' && child.lang?.trim().toLowerCase() === 'embed') {
            const embed = getBlockEmbed(child.value ?? '');
            // Unsupported urls are dropped rather than leaked onto the page as code
            if (embed) {
                children.push({ type: 'html', value: renderEmbed(embed, options) });
            }
            return;
        }

        transform(child, options);
        children.push(child);
    });

    // eslint-disable-next-line no-param-reassign
    node.children = children;
}

export default function remarkVideoEmbed(options: RemarkVideoEmbedOptions = {}) {
    return function transformer(tree: unknown) {
        transform(tree as MdastNode, options);
    };
}

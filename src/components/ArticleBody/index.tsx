import { _cs } from '@togglecorp/fujs';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

import remarkVideoEmbed from '#lib/remarkVideoEmbed';

import styles from './styles.module.css';

interface Props {
    className?: string;
    content?: string;
}

export default async function ArticleBody(props: Props) {
    const {
        className,
        content = '',
    } = props;

    const processedContent = await remark()
        .use(html, { sanitize: false })
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkVideoEmbed, {
            figureClassName: styles.videoEmbed,
            frameClassName: styles.videoEmbedFrame,
            horizontalClassName: styles.horizontal,
            verticalClassName: styles.vertical,
            captionClassName: styles.videoEmbedCaption,
        })
        .process(content);
    const contentHtml = processedContent.toString();

    return (
        <div
            className={_cs(styles.articleBody, className)}
            // TODO: sanitize
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}

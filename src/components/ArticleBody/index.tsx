import { _cs } from '@togglecorp/fujs';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

import styles from './styles.module.css';

interface Props {
    className?: string;
    content?: string;
}

export default function ArticleBody(props: Props) {
    const {
        className,
        content = '',
    } = props;

    const processedContent = remark()
        .use(html, { sanitize: false })
        .use(remarkGfm)
        .processSync(content);
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

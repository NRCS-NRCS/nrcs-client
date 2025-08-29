'use client';

import {
    useEffect,
    useState,
} from 'react';
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
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function processContent() {
            const processed = await remark()
                .use(remarkGfm)
                .use(html, { sanitize: false })
                .process(content);

            if (!cancelled) {
                setContentHtml(processed.toString());
            }
        }

        processContent();

        return () => {
            cancelled = true;
        };
    }, [content]);

    return (
        <div
            className={_cs(styles.articleBody, className)}
            // TODO: sanitize
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}

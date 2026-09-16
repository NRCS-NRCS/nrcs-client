'use client';

import {
    useEffect,
    useState,
} from 'react';
import { IoClose } from 'react-icons/io5';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import Portal from '#components/Portal';
import type { NewsQuery } from '#generated/types/graphql';
import { stripMarkdown } from '#lib/common';

import styles from './styles.module.css';

type NewsItem = NonNullable<NonNullable<NewsQuery['news']['results']>[number]>;

interface Props {
    news: NewsItem;
}

const DESCRIPTION_MAX_LENGTH = 240;

function truncateDescription(description: string | null | undefined) {
    const plainText = stripMarkdown(description ?? '');
    if (plainText.length <= DESCRIPTION_MAX_LENGTH) {
        return plainText;
    }
    return `${plainText.slice(0, DESCRIPTION_MAX_LENGTH).trimEnd()}...`;
}

export default function HighlightPopup({ news }: Props) {
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setVisible(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!visible || !mounted) {
        return null;
    }

    const description = truncateDescription(news.content);

    return (
        <Portal>
            <div
                className={styles.backdrop}
                role="presentation"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setVisible(false);
                    }
                }}
            >
                <div
                    className={styles.modal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={news.title}
                >
                    <Button
                        name={undefined}
                        variant="transparent"
                        className={styles.closeButton}
                        onClick={() => setVisible(false)}
                        title="Close"
                    >
                        <IoClose />
                    </Button>
                    {news.coverImage?.url && (
                        <ImageWrapper
                            src={news.coverImage.url}
                            alt={news.coverImage.name ?? 'news image'}
                            className={styles.image}
                            imageClassName={styles.imageInner}
                        />
                    )}
                    <div className={styles.content}>
                        <Heading size="large">{news.title}</Heading>
                        {description && (
                            <p className={styles.description}>{description}</p>
                        )}
                        <div className={styles.actions}>
                            <Link
                                href={`/resources/news-and-events/${news.slug}/`}
                                variant="button"
                                onClick={() => setVisible(false)}
                            >
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}

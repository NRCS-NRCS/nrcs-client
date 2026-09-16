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
import type { AllQueryQuery } from '#generated/types/graphql';
import { stripMarkdown } from '#lib/common';

import styles from './styles.module.css';

type Highlight = NonNullable<NonNullable<AllQueryQuery['highlights'][number]>>;

interface Props {
    highlight: Highlight;
}

const DESCRIPTION_MAX_LENGTH = 240;

function truncateDescription(description: string | null | undefined) {
    const plainText = stripMarkdown(description ?? '');
    if (plainText.length <= DESCRIPTION_MAX_LENGTH) {
        return plainText;
    }
    return `${plainText.slice(0, DESCRIPTION_MAX_LENGTH).trimEnd()}...`;
}

export default function HighlightPopup({ highlight }: Props) {
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

    const description = truncateDescription(highlight.description);

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
                    aria-label={highlight.heading}
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
                    {highlight.image?.url && (
                        <ImageWrapper
                            src={highlight.image.url}
                            alt={highlight.image.name ?? 'highlight image'}
                            className={styles.image}
                            imageClassName={styles.imageInner}
                        />
                    )}
                    <div className={styles.content}>
                        <Heading size="large">{highlight.heading}</Heading>
                        {description && (
                            <p className={styles.description}>{description}</p>
                        )}
                        <div className={styles.actions}>
                            <Link
                                href={`/highlight/${highlight.id}`}
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

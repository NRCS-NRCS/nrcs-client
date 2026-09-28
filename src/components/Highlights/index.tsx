'use client';

import {
    useEffect,
    useState,
} from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import KeyStat from '#components/KeyStat';
import Link from '#components/Link';
import type { NewsQuery } from '#generated/types/graphql';
import { stripMarkdown } from '#lib/common';

import styles from './styles.module.css';

type NewsItem = NonNullable<NonNullable<NewsQuery['news']['results']>[number]>;

interface Props {
    news: NewsItem[];
}
const SWIPE_THRESHOLD = 60;
const DESCRIPTION_MAX_LENGTH = 200;

function truncateDescription(description: string | null | undefined) {
    const plainText = stripMarkdown(description ?? '');
    if (!plainText) {
        return { text: '', isTruncated: false };
    }
    if (plainText.length <= DESCRIPTION_MAX_LENGTH) {
        return { text: plainText, isTruncated: false };
    }
    return {
        text: plainText.slice(0, DESCRIPTION_MAX_LENGTH).trimEnd(),
        isTruncated: true,
    };
}

export default function HighlightsCarousel({ news = [] }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startX, setStartX] = useState<number | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    // Auto-slide every 15 seconds
    useEffect(() => {
        if (news.length <= 1 || isInteracting) {
            return undefined;
        } const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % news.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [news.length, isInteracting]);

    /* Pointer handlers */
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsInteracting(true);
        setStartX(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (startX === null) {
            setIsInteracting(false);
            return;
        }
        const diff = startX - e.clientX;
        if (Math.abs(diff) >= SWIPE_THRESHOLD) {
            setActiveIndex((prev) => (prev + 1) % news.length);
        }
        setStartX(null);
        setIsInteracting(false);
    };

    return (
        <div className={styles.carousel}>
            <div
                className={styles.slidesContainer}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                {news.map((newsItem, index) => {
                    const description = truncateDescription(newsItem.content);
                    const keyStats = (newsItem.keyStats ?? [])
                        .filter((keyStat) => keyStat.featured);

                    return (
                        <div
                            key={newsItem.id}
                            className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
                        >
                            {newsItem.coverImage?.url && (
                                <ImageWrapper
                                    src={newsItem.coverImage.url}
                                    alt={newsItem.coverImage.name ?? 'news image'}
                                    className={styles.image}
                                    imageClassName={styles.imageInner}
                                />
                            )}
                            <div className={styles.content}>
                                <Heading
                                    className={styles.heading}
                                    size="large"
                                >
                                    {newsItem.title}
                                </Heading>
                                <p
                                    className={styles.description}
                                >
                                    {description.text}
                                    {description.isTruncated && '...'}
                                </p>
                                <div className={styles.actions}>
                                    <Link
                                        href={`/resources/news-and-events/${newsItem.slug}/`}
                                        variant="buttonReverse"

                                    >
                                        Read more
                                    </Link>

                                </div>
                            </div>
                            {keyStats.length > 0 && (
                                <div className={styles.keyStats}>
                                    {keyStats.map((keyStat) => (
                                        <KeyStat
                                            key={keyStat.id}
                                            className={styles.keyStat}
                                            label={keyStat.title}
                                            value={keyStat.stat}
                                            size="medium"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Dots */}
            <div className={styles.dotsContainer}>
                {news.map((newsItem, index) => (
                    <Button
                        name={undefined}
                        key={newsItem.id}
                        onClick={() => setActiveIndex(index)}
                        className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

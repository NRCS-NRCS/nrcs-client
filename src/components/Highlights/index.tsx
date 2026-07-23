'use client';

import {
    useEffect,
    useState,
} from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import { type NewsQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

type newsItems = NonNullable<NonNullable<NewsQuery['news']['results'][number]>>;

interface Props {
    news: newsItems[];
}
const SWIPE_THRESHOLD = 60;

export default function HighlightsCarousel({ news = [] }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startX, setStartX] = useState<number | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    const highlights = news.filter((data) => data.isHighlighted);
    // Auto-slide every 6 seconds
    useEffect(() => {
        if (highlights.length <= 1 || isInteracting) {
            return undefined;
        } const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % highlights.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [highlights.length, isInteracting]);

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
            setActiveIndex((prev) => (prev + 1) % highlights.length);
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
                {highlights.map((highlight, index) => (
                    <div
                        key={highlight.id}
                        className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
                    >
                        {highlight.coverImage?.url && (
                            <ImageWrapper
                                src={highlight.coverImage.url}
                                alt={highlight.coverImage.name ?? 'highlight image'}
                                className={styles.image}
                                imageClassName={styles.imageInner}
                            />
                        )}
                        <div className={styles.content}>
                            <Heading
                                className={styles.heading}
                                size="large"
                            >
                                {highlight?.title}
                            </Heading>
                            <p
                                className={styles.description}
                            >
                                {highlight?.content}
                            </p>
                            <Link
                                href={`resources/news-and-events/${highlight.slug}`}
                                variant="underline"
                                className={styles.readMore}
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className={styles.dotsContainer}>
                {highlights.map((highlight, index) => (
                    <Button
                        name={undefined}
                        key={highlight.id}
                        onClick={() => setActiveIndex(index)}
                        className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

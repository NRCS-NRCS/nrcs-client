'use client';

import {
    useEffect,
    useState,
} from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import type { AllQueryQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

type Highlight = NonNullable<NonNullable<AllQueryQuery['highlights'][number]>>;

interface Props {
    highlights: Highlight[];
}
const SWIPE_THRESHOLD = 60;

export default function HighlightsCarousel({ highlights = [] }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startX, setStartX] = useState<number | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);

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
                        {highlight.image?.url && (
                            <ImageWrapper
                                src={highlight.image.url}
                                alt={highlight.image.name ?? 'highlight image'}
                                className={styles.image}
                                imageClassName={styles.imageInner}
                            />
                        )}
                        <div className={styles.content}>
                            <Heading className={styles.heading} size="large">{highlight?.heading}</Heading>
                            <p className={styles.description}>{highlight?.description}</p>
                            {highlight?.actionLinks?.length > 0 && (
                                <div className={styles.actions}>
                                    {highlight.actionLinks.map((link) => (
                                        <Link
                                            key={link?.url}
                                            href={link?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="buttonReverse"
                                        >
                                            {link?.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
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

'use client';

import {
    useEffect,
    useState,
} from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import type { HomePageQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

type Highlight = NonNullable<HomePageQuery['highlights']>[number];

interface Props {
    highlights: Highlight[];
}

export default function HighlightsCarousel({ highlights = [] }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-slide every 2 seconds
    useEffect(() => {
        if (highlights.length <= 1) { return undefined; } // no need to slide
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % highlights.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [highlights.length]);

    return (
        <div className={styles.carousel}>
            <div className={styles.slidesContainer}>
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

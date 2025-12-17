'use client';

import { _cs } from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import AuthorSection from '#components/AuthorSection';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import { stripMarkdown } from '#lib/common';

import styles from './styles.module.css';

interface Props {
    className?: string;
    isHorizontal?: boolean;
    imageSrc: string | StaticImageData;
    imageAlt: string;
    heading: string;
    link?: string;
    description: string;
    author?: string;
    date?: string | null;
    isSmall?: boolean;
}

export default function ArticleCard(props: Props) {
    const {
        className,
        isSmall,
        isHorizontal,
        imageSrc,
        imageAlt,
        heading,
        description,
        author,
        date,
        link,
    } = props;

    const children = (
        <>
            <ImageWrapper
                className={styles.articleCardImage}
                src={imageSrc}
                alt={imageAlt}
            />
            <div className={styles.articleCardDescription}>
                <Heading
                    className={styles.heading}
                    size={isSmall ? 'extraSmall' : 'medium'}
                >
                    {heading}
                </Heading>
                <AuthorSection
                    authorClassName={styles.author}
                    author={author}
                    date={date}
                    articleLength={description.length}
                />
                {!isSmall && (
                    <p className={styles.description}>
                        {stripMarkdown(description)}
                    </p>
                )}
            </div>
        </>
    );

    if (link) {
        return (
            <Link
                href={link}
                variant="div"
                className={_cs(
                    className,
                    styles.linkArticle,
                    isSmall && styles.latestArticle,
                    isHorizontal && styles.workArticleContent,
                    styles.otherArticleContent,
                )}
            >
                {children}
            </Link>
        );
    }

    return (
        <div
            className={_cs(
                className,
                isSmall && styles.latestArticle,
                isHorizontal && styles.workArticleContent,
                styles.otherArticleContent,
            )}
        >
            {children}
        </div>
    );
}

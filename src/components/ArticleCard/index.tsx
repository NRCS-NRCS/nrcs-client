'use client';

import { _cs } from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import AuthorSection from '../AuthorSection';
import Heading from '../Heading';
import ImageWrapper from '../ImageWrapper';
import Link from '../Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    isHorizontal?: boolean;
    imageSrc: string | StaticImageData;
    imageAlt: string;
    heading: string;
    link?: string;
    description: string;
    author: string;
    date: string;
}

export default function ArticleCard(props: Props) {
    const {
        className,
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
                <div>
                    <Heading
                        size="small"
                    >
                        {heading}
                    </Heading>
                    <p className={styles.dateDescription}>
                        {description}
                    </p>
                </div>
                <AuthorSection
                    author={author}
                    date={date}
                />
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
                isHorizontal && styles.workArticleContent,
                styles.otherArticleContent,
            )}
        >
            {children}
        </div>
    );
}

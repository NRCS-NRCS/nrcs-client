import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    images: StaticImageData[];
    title?: string;
    description?: string;
    link: string;
    size?: 'small' | 'normal';
    linkText?: string;
}

export default function Card(props: Props) {
    const {
        className,
        title,
        images,
        description,
        link,
        size = 'normal',
        linkText = 'View More',
    } = props;

    return (
        <div
            className={_cs(
                styles.card,
                className,
            )}
        >
            {images && (
                <ImageWrapper
                    className={styles.imageWrapper}
                    imageClassName={styles.image}
                    src={images[0]}
                    alt={title ?? 'card-image'}
                />
            )}
            <Heading
                className={styles.title}
                size={size === 'normal' ? 'large' : 'extraSmall'}
            >
                {title}
            </Heading>
            {description && (
                <div className={styles.description}>
                    {description}
                </div>
            )}
            {size === 'normal' && (
                <Link
                    className={styles.link}
                    href={link}
                    showIcon
                >
                    {linkText}
                </Link>
            )}
        </div>
    );
}

import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';

import styles from './styles.module.css';

interface Props {
    className?: string;
    icon?: StaticImageData | string;
    title: string;
    description: string;
    transparent?: boolean;
}

export default function Card(props: Props) {
    const {
        className,
        title,
        icon,
        description,
        transparent = false,
    } = props;

    return (
        <div
            className={_cs(
                styles.keyFigureCard,
                transparent && styles.transparent,
                className,
            )}
        >
            {icon && (
                <ImageWrapper
                    className={styles.icon}
                    imageClassName={styles.image}
                    src={icon}
                    alt={title ?? 'card-image'}
                />
            )}
            <div className={styles.rightContent}>
                <Heading
                    className={styles.title}
                    size="large"
                >
                    {title}
                </Heading>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    );
}

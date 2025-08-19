import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    icon?: StaticImageData | string;
    title: string;
    link: string;
    linkDescription: string;
}

export default function CallToAction(props: Props) {
    const {
        className,
        title,
        icon,
        link,
        linkDescription,
    } = props;

    return (
        <div
            className={_cs(
                styles.callToAction,
                className,
            )}
        >
            {icon && (
                <ImageWrapper
                    className={styles.imageWrapper}
                    imageClassName={styles.image}
                    src={icon}
                    alt={title ?? 'card-image'}
                />
            )}
            <Heading
                className={styles.title}
                size="small"
            >
                {title}
            </Heading>
            <Link
                href={link}
                variant="buttonTransparent"
            >
                {linkDescription}
            </Link>
        </div>
    );
}

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
    title: React.ReactNode;
    link: string;
    linkDescription: string;
    isExternalLink?: boolean;
}

export default function CallToAction(props: Props) {
    const {
        className,
        title,
        icon,
        link,
        linkDescription,
        isExternalLink,
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
                    alt={String(title) ?? 'card-image'}
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
                target={isExternalLink ? '_blank' : ''}

            >
                {linkDescription}
            </Link>
        </div>
    );
}

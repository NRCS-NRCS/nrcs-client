import { type ReactNode } from 'react';
import {
    _cs,
    isNotDefined,
    isTruthyString,
} from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import logo from '#public/logo.png';

import Heading from '../Heading';
import ImageWrapper from '../ImageWrapper';

import styles from './styles.module.css';

type ImageSource = StaticImageData | string;

interface Props {
    className?: string;
    imageSrc?: ImageSource | null;
    imageAlt?: string;
    heading?: string;
    caption?: string;
    fit?: 'cover' | 'contain';
    withBackdrop?: boolean;
    nonOptimizedImage?: boolean;
}

export default function ResourcesBanner(props: Props) {
    const {
        className,
        imageSrc,
        imageAlt,
        heading,
        caption,
        fit = 'cover',
        withBackdrop = false,
        nonOptimizedImage,
    } = props;

    const isContained = fit === 'contain';
    const src: ImageSource | undefined = (typeof imageSrc === 'string' && !isTruthyString(imageSrc))
        ? undefined
        : imageSrc ?? undefined;

    const alt = imageAlt ?? heading ?? '';
    const withoutBackdrop = isContained && !withBackdrop;

    let image: ReactNode;

    if (isNotDefined(src)) {
        image = (
            <div className={styles.placeholder}>
                <ImageWrapper
                    className={styles.placeholderLogo}
                    imageClassName={styles.placeholderLogoImage}
                    src={logo}
                    alt={alt}
                />
                <p className={styles.placeholderTitle}>
                    Nepal Red Cross Society
                </p>
                {caption && (
                    <p className={styles.placeholderCaption}>
                        {caption}
                    </p>
                )}
            </div>
        );
    } else if (isContained) {
        image = (
            <div className={styles.containedImage}>
                {withBackdrop && (
                    <ImageWrapper
                        className={styles.backdrop}
                        src={src}
                        alt=""
                        aria-hidden
                        nonOptimizedImage={nonOptimizedImage}
                    />
                )}
                <ImageWrapper
                    className={styles.foreground}
                    imageClassName={styles.foregroundImage}
                    src={src}
                    alt={alt}
                    nonOptimizedImage={nonOptimizedImage || withoutBackdrop}
                />
            </div>
        );
    } else {
        image = (
            <ImageWrapper
                src={src}
                alt={alt}
                nonOptimizedImage={nonOptimizedImage}
            />
        );
    }

    return (
        <div
            className={_cs(
                className,
                styles.resourcesBanner,
                withoutBackdrop && styles.withoutBackdrop,
            )}
        >
            {image}
            {heading && (
                <Heading
                    className={styles.heading}
                    withBackground
                >
                    {heading}
                </Heading>
            )}
        </div>
    );
}

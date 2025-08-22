'use client';

import React from 'react';
import { _cs } from '@togglecorp/fujs';
import Image, {
    type ImageProps,
    type StaticImageData,
} from 'next/image';

import styles from './styles.module.css';

export interface Props extends ImageProps {
    className?: string;
    src: string | StaticImageData;
    imageClassName?: string;
    nonOptimizedImage?: boolean;
}

const staticLoader = ({ src }: {
    src: string;
    width: number | undefined;
    quality?: number | undefined
}) => src;

function ImageWrapper(props: Props) {
    const {
        className,
        imageClassName,
        src,
        nonOptimizedImage = false,
        ...otherProps
    } = props;

    const isExternal = String(src)?.startsWith('http');
    const safeSrc = isExternal ? String(src).replace(/^http:\/\/web:8000/, 'http://localhost:8000') : src;

    return (
        <div className={_cs(className, styles.imageWrapper)}>
            {!nonOptimizedImage ? (
                <Image
                    src={safeSrc}
                    className={_cs(imageClassName, styles.image)}
                    fill={isExternal}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...otherProps}
                    loader={staticLoader}
                    placeholder={(typeof src !== 'string' && src?.blurDataURL) ? 'blur' : 'empty'}
                    blurDataURL={typeof src !== 'string' ? src?.blurDataURL : undefined}
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={String(safeSrc)}
                    className={_cs(imageClassName, styles.image, styles.nonOptimizedImage)}
                    alt={otherProps.alt}
                />
            )}
        </div>
    );
}

export default ImageWrapper;

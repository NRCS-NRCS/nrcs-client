import React, { useMemo } from 'react';
import {
    _cs,
    decodeDate,
    isNotDefined,
} from '@togglecorp/fujs';
import { type StaticImageData } from 'next/image';

import Heading, { type SizeTypes } from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    image?: StaticImageData | string;
    title: string;
    date?: string;
    link: string;
    isExternalLink?: boolean;
    headingSize?: SizeTypes;
}

export default function Card(props: Props) {
    const {
        className,
        title,
        image,
        date: fullDate,
        link,
        headingSize = 'extraSmall',
        isExternalLink = false,
    } = props;

    const dateStrings = useMemo((): { date: string, month: string, year: string } | undefined => {
        if (!fullDate) {
            return undefined;
        }
        const validDate = decodeDate(fullDate);
        return {
            date: `${validDate.getDate()}`,
            month: validDate.toLocaleString('default', { month: 'long' }),
            year: String(validDate.getFullYear()),
        };
    }, [fullDate]);

    return (
        <Link
            className={_cs(
                styles.workCard,
                className,
                isNotDefined(image) && styles.noImage,
                styles.link,
            )}
            variant="div"
            href={link}
            target={isExternalLink ? '_blank' : ''}
        >
            {image && (
                <ImageWrapper
                    className={styles.imageWrapper}
                    imageClassName={styles.image}
                    src={image}
                    alt={title ?? 'card-image'}
                />
            )}
            <Heading
                className={styles.title}
                size={headingSize}
            >
                {title}
            </Heading>
            {dateStrings?.date && dateStrings?.month && (
                <div className={styles.dateContainer}>
                    <p>{dateStrings.date}</p>
                    <p>{dateStrings.month}</p>
                    <p>{dateStrings.year}</p>
                </div>
            )}
        </Link>
    );
}

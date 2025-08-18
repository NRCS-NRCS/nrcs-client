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
    link?: string;
    headingSize?: SizeTypes;
    description?: string;
}

export default function RecentNewsCard(props: Props) {
    const {
        className,
        title,
        image,
        date: fullDate,
        link,
        description,
        headingSize = 'medium',
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

    const trimmedDescription = useMemo(() => {
        if ((description?.length ?? 0) > 400) {
            return `${description?.substring(0, 400)}...`;
        }
        return description;
    }, [description]);

    return (
        <div
            className={_cs(
                styles.recentNewsCard,
                className,
                isNotDefined(image) && styles.noImage,
            )}
        >
            {image && (
                <ImageWrapper
                    className={styles.imageWrapper}
                    imageClassName={styles.image}
                    src={image}
                    alt={title ?? 'card-image'}
                />
            )}
            <div className={styles.rightContent}>
                <Heading
                    className={styles.title}
                    size={headingSize}
                >
                    {title}
                </Heading>
                <div className={styles.description}>
                    {trimmedDescription}
                </div>
                {dateStrings?.date && dateStrings?.month && (
                    <div className={styles.dateContainer}>
                        <p>{dateStrings.date}</p>
                        <p>{dateStrings.month}</p>
                        <p>{dateStrings.year}</p>
                    </div>
                )}
                {link && (
                    <Link
                        href={link}
                        variant="button"
                    >
                        Read More
                    </Link>
                )}
            </div>
        </div>
    );
}

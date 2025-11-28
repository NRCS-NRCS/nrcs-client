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
import { stripMarkdown } from '#lib/common';

import styles from './styles.module.css';

interface Props {
    className?: string;
    image?: StaticImageData | string;
    title?: string;
    date?: string;
    link?: string;
    linkLabel?: string;
    headingSize?: SizeTypes;
    description?: string;
    trimDescription?: number;
}

export default function RecentNewsCard(props: Props) {
    const {
        className,
        title,
        image,
        date: fullDate,
        link,
        linkLabel = 'Read More',
        trimDescription = 400,
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

    const strippedDescription = useMemo(() => (
        stripMarkdown(description ?? '')
    ), [description]);

    const trimmedDescription = useMemo(() => {
        if ((strippedDescription?.length ?? 0) > trimDescription) {
            return `${strippedDescription?.substring(0, trimDescription)}...`;
        }
        return strippedDescription;
    }, [
        strippedDescription,
        trimDescription,
    ]);

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
                {title && (
                    <Heading
                        className={styles.title}
                        size={headingSize}
                    >
                        {title}
                    </Heading>
                )}
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
                        {linkLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}

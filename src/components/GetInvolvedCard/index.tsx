import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';
import Link from '#components/Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    name: string;
    title: string;
    date: string;
    link: string;
    transparent?: boolean;
    isExternalLink?: boolean;
}

export default function GetInvolvedCard(props: Props) {
    const {
        className,
        title,
        name,
        date,
        link,
        transparent = false,
        isExternalLink = false,
    } = props;

    return (
        <Link
            className={_cs(
                styles.getInvolvedCard,
                transparent && styles.transparent,
                className,
            )}
            variant="div"
            href={link}
            target={isExternalLink ? '_blank' : ''}
        >
            <Heading
                className={styles.title}
                size="medium"
            >
                {title}
            </Heading>
            <div className={styles.content}>
                <div className={styles.date}>
                    {date}
                </div>
                <span className={styles.redDot} />
                <div className={styles.name}>
                    {name}
                </div>
            </div>
        </Link>
    );
}

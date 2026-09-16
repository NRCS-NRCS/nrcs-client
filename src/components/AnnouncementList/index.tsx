import React from 'react';
import {
    IoArrowForward,
    IoCalendarOutline,
} from 'react-icons/io5';
import {
    _cs,
    formatDateToString,
} from '@togglecorp/fujs';

import EmptyMessage from '#components/EmptyMessage';
import Heading from '#components/Heading';
import Link from '#components/Link';

import styles from './styles.module.css';

export interface Announcement {
    id: string;
    title: string;
    expiryDate: string;
    link: string;
}

interface Props {
    className?: string;
    heading?: string;
    items: Announcement[];
    emptyTitle: string;
    emptyDescription: string;
}

export default function AnnouncementList(props: Props) {
    const {
        className,
        heading,
        items,
        emptyTitle,
        emptyDescription,
    } = props;

    return (
        <div className={_cs(className, styles.announcementList)}>
            {heading && (
                <Heading size="small">
                    {heading}
                </Heading>
            )}
            <div className={styles.items}>
                {items.length <= 0 ? (
                    <EmptyMessage
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                ) : items.map((item, index) => (
                    <Link
                        key={item.id}
                        className={styles.item}
                        href={item.link}
                        variant="div"
                    >
                        <div className={styles.index}>
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className={styles.itemContent}>
                            <Heading
                                className={styles.itemTitle}
                                size="small"
                            >
                                {item.title}
                            </Heading>
                            <div className={styles.expiryDate}>
                                <IoCalendarOutline className={styles.expiryIcon} />
                                {`Expiry date: ${formatDateToString(new Date(item.expiryDate), 'MMM dd, yyyy')}`}
                            </div>
                        </div>
                        <IoArrowForward className={styles.itemIcon} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

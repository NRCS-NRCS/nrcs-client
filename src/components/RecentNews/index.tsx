'use client';

import React, { useState } from 'react';
import {
    IoChevronBackOutline,
    IoChevronForwardOutline,
} from 'react-icons/io5';
import {
    _cs,
    decodeDate,
} from '@togglecorp/fujs';

import Button from '#components/Button';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import Section from '#components/Section';
import {
    getReadTimeInMinutes,
    stripMarkdown,
} from '#lib/common';
import allData from '#lib/staticData';

import styles from './styles.module.css';

const NUM_LATEST_NEWS = 4;
const DESCRIPTION_MAX_LENGTH = 100;
const ORGANIZATION_NAME = 'Nepal Red Cross Society';

function formatDate(value: string | undefined) {
    if (!value) {
        return undefined;
    }

    const validDate = decodeDate(value);
    const month = validDate.toLocaleString('default', { month: 'long' });

    return `${validDate.getDate()} ${month} ${validDate.getFullYear()}`;
}

function getDescription(content: string | undefined) {
    const plainText = stripMarkdown(content ?? '');
    if (plainText.length > DESCRIPTION_MAX_LENGTH) {
        return `${plainText.substring(0, DESCRIPTION_MAX_LENGTH).trimEnd()}...`;
    }
    return plainText;
}

function RecentNews() {
    const [activeIndex, setActiveIndex] = useState(0);

    const news = (allData?.news.results ?? []).slice(0, NUM_LATEST_NEWS);

    if (news.length === 0) {
        return null;
    }

    const activeNews = news[activeIndex] ?? news[0];
    const coverImageUrl = activeNews.coverImage?.url;
    const readTime = getReadTimeInMinutes(activeNews.content);
    const date = formatDate(activeNews.publishedDate);

    const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
    const goNext = () => setActiveIndex((i) => Math.min(i + 1, news.length - 1));

    return (
        <Section
            heading="Recent News and Events"
            headingWithBackground
            childrenContainerClassName={styles.recentNewsChildrenContainer}
        >
            <div className={styles.recentNews}>
                <div className={styles.media}>
                    {coverImageUrl ? (
                        <ImageWrapper
                            className={styles.mediaImage}
                            src={coverImageUrl}
                            alt={activeNews.coverImage?.name ?? activeNews.title}
                        />
                    ) : (
                        <div className={styles.brand}>
                            <svg
                                className={styles.brandMark}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8 2h8v6h6v8h-6v6H8v-6H2V8h6z" />
                            </svg>
                            <div className={styles.brandName}>
                                {ORGANIZATION_NAME}
                            </div>
                        </div>
                    )}
                    {date && (
                        <div className={styles.mediaFooter}>
                            {date}
                            {readTime ? ` · ${readTime} min read` : ''}
                        </div>
                    )}
                </div>
                <div className={styles.list}>
                    <div className={styles.listHeader}>
                        <div className={styles.listLabel}>
                            Latest Four
                        </div>
                        <div className={styles.listActions}>
                            <Button
                                name="prev"
                                variant="transparent"
                                className={styles.navButton}
                                title="Previous"
                                onClick={goPrev}
                                disabled={activeIndex === 0}
                            >
                                <IoChevronBackOutline />
                            </Button>
                            <Button
                                name="next"
                                variant="transparent"
                                className={styles.navButton}
                                title="Next"
                                onClick={goNext}
                                disabled={activeIndex === news.length - 1}
                            >
                                <IoChevronForwardOutline />
                            </Button>
                        </div>
                    </div>
                    <div className={styles.items}>
                        {news.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={item.id}
                                    className={_cs(styles.item, isActive && styles.activeItem)}
                                >
                                    <div className={styles.itemIndex}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className={styles.itemContent}>
                                        <Button
                                            name={item.id}
                                            variant="transparent"
                                            className={styles.itemTitle}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            {item.title}
                                        </Button>
                                        {isActive && (
                                            <>
                                                <div className={styles.titleUnderline} />
                                                <p className={styles.itemDescription}>
                                                    {getDescription(item.content)}
                                                </p>
                                                <Link
                                                    className={styles.readMore}
                                                    href={`/resources/news-and-events/${item.slug}/`}
                                                    variant="button"
                                                    showIcon
                                                >
                                                    Read more
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Link
                        className={styles.viewAll}
                        href="/resources/news-and-events/"
                        showIcon
                    >
                        View all news
                    </Link>
                </div>
            </div>
        </Section>
    );
}

export default RecentNews;

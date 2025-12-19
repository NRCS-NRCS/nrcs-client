'use client';

import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    IoChevronBackOutline,
    IoChevronForwardOutline,
} from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import DefaultImage from '#public/logoWithName.jpg';

import Button from '../Button';
import RecentNewsCard from '../RecentNewsCard';
import Section from '../Section';

import styles from './styles.module.css';

type NewsType = NonNullable<NonNullable<AllQueryQuery['news']>>;

function RecentNews() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowSize, setWindowSize] = useState(5);
    const tabsRef = useRef<HTMLDivElement>(null);

    const news = [...(allData?.news ?? [])].slice(0, 10) as unknown as NewsType;
    useEffect(() => {
        const calculateWindowSize = () => {
            if (!tabsRef.current) return;
            const containerWidth = tabsRef.current.offsetWidth;
            const tabWidth = 150;
            const maxItems = Math.floor(containerWidth / tabWidth);
            setWindowSize(Math.max(1, maxItems));
        };

        calculateWindowSize();
        window.addEventListener('resize', calculateWindowSize);
        return () => window.removeEventListener('resize', calculateWindowSize);
    }, []);

    if (news.length === 0) return null;

    const maxStart = Math.max(news.length - windowSize, 0);
    const windowStart = Math.min(
        Math.max(activeIndex - Math.floor(windowSize / 2), 0),
        maxStart,
    );

    const visibleNews = news.slice(windowStart, windowStart + windowSize);

    const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
    const goNext = () => setActiveIndex((i) => Math.min(i + 1, news.length - 1));

    return (
        <Section
            heading="Recent News and Events"
            headingWithBackground
            childrenContainerClassName={styles.recentNewsChildrenContainer}
        >
            <div
                className={styles.navigation}
            >
                <Button
                    name="prev"
                    variant="transparent"
                    className={_cs(styles.tabButton, styles.chevron)}
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                >
                    <IoChevronBackOutline />
                </Button>

                <div className={styles.tabs} ref={tabsRef}>
                    {visibleNews.map((item, index) => {
                        const realIndex = windowStart + index;
                        const isLastVisible = index === visibleNews.length - 1;
                        const isActualLast = realIndex === news.length - 1;
                        return (
                            <Button
                                key={item.id}
                                name="event"
                                variant="transparent"
                                className={_cs(
                                    styles.tabButton,
                                    realIndex === activeIndex ? styles.activeTab : styles.tab,

                                )}
                                onClick={() => setActiveIndex(realIndex)}
                            >
                                {item.title}
                                {isLastVisible && !isActualLast ? '...' : ''}
                            </Button>
                        );
                    })}
                </div>
                <Button
                    name="next"
                    variant="transparent"
                    className={_cs(styles.tabButton, styles.chevron)}
                    onClick={goNext}
                    disabled={activeIndex === news.length - 1}
                >
                    <IoChevronForwardOutline />
                </Button>
            </div>
            <RecentNewsCard
                key={news[activeIndex].id}
                title={news[activeIndex].title}
                description={news[activeIndex].content}
                date={news[activeIndex].publishedDate}
                image={news[activeIndex].coverImage?.url ?? DefaultImage}
                trimDescription={300}
                link={`/resources/news-and-events/${news[activeIndex].slug}/`}
            />
        </Section>
    );
}

export default RecentNews;

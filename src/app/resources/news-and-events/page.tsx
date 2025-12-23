'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import paginate from '#lib/paginate';
import defaultImage from '#public/defaultImage.png';

type NewsType = NonNullable<NonNullable<AllQueryQuery['news']>>;

function NewsAndEventsPage() {
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;
    const newsList: NewsType = allData.news;
    const paginateData = paginate(
        newsList,
        Number(currentPage),
        pageSize,
    );
    return (
        <Page>
            <Section heading="News and Events" headingWithBackground>
                {newsList.length <= 0 ? (
                    <EmptyMessage
                        message="No news or events available"
                    />
                ) : paginateData.map((news) => (
                    <ArticleCard
                        key={news.id}
                        imageSrc={news.coverImage?.url ?? defaultImage}
                        imageAlt={news.title}
                        heading={news.title}
                        description={news.content}
                        date={news.publishedDate}
                        link={news.slug}
                    />
                ))}
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={newsList.length}
                />
            </Section>
        </Page>
    );
}

export default function NewsAndEvents() {
    return (
        <Suspense>
            <NewsAndEventsPage />
        </Suspense>
    );
}

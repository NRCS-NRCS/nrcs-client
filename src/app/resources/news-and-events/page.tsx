'use client';

import React, {
    Suspense,
    useMemo,
    useState,
} from 'react';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import useDebouncedValue from '#hooks/useDebouncedValue';
import paginate from '#lib/paginate';
import defaultImage from '#public/defaultImage.png';

type NewsType = NonNullable<NonNullable<AllQueryQuery['news']>>;

function NewsAndEventsPage() {
    const [search, setSearch] = useState<string>('');
    const debouncedSearchText = useDebouncedValue(search);
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;

    const newsList = useMemo(
        () => (allData.news as unknown as NewsType)
            .filter((news) => news.title?.toLowerCase()
                .includes(debouncedSearchText.toLowerCase())),
        [debouncedSearchText],
    );

    const paginateData = paginate(
        newsList,
        Number(currentPage),
        pageSize,
    );

    return (
        <Page>
            <Section
                heading="News and Events"
                headingWithBackground
                searchField="title"
                searchValue={search}
                handleSearchChange={setSearch}
            >
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
                    search={debouncedSearchText}
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

'use client';

import React, {
    Suspense,
    useMemo,
    useState,
} from 'react';
import { isDefined } from '@togglecorp/fujs';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import useDebouncedValue from '#hooks/useDebouncedValue';
import paginate from '#lib/paginate';
import allData from '#lib/staticData';
import defaultImage from '#public/defaultImage.png';

function BlogPage() {
    const [search, setSearch] = useState<string>('');
    const debouncedSearchText = useDebouncedValue(search);
    const searchParams = useSearchParams();
    const paramPage = searchParams?.get('page');
    const currentPage = paramPage ?? 1;
    const pageSize = 5;

    const blogData = useMemo(
        () => (allData.blogs.results ?? [])
            .filter((blog) => blog.title?.toLowerCase()
                .includes(debouncedSearchText.toLowerCase())),
        [debouncedSearchText],
    );

    const paginateData = paginate(
        blogData,
        Number(currentPage),
        pageSize,
    );
    return (
        <Page>
            <Section
                heading="Blogs"
                headingWithBackground
                withoutChildrenGap
                searchField="title"
                searchValue={search}
                handleSearchChange={setSearch}
            >
                {(isDefined(blogData) && blogData.length <= 0) ? (
                    <EmptyMessage
                        title={debouncedSearchText
                            ? `No results for “${debouncedSearchText}”`
                            : 'No blogs yet'}
                        description={debouncedSearchText
                            ? "We couldn't find any blogs matching your search. Try a different keyword."
                            : 'Stories and reflections from across the Society will appear here once they are published.'}
                    />
                ) : paginateData?.map((blog) => (
                    <ArticleCard
                        key={blog.id}
                        imageSrc={blog.coverImage?.url ?? defaultImage}
                        imageAlt={blog.title}
                        heading={blog.title}
                        author={blog.author}
                        description={blog.content}
                        date={blog.publishedDate}
                        link={blog.slug}
                    />
                ))}
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={blogData.length}
                    search={debouncedSearchText}
                />
            </Section>
        </Page>
    );
}

export default function Blogs() {
    return (
        <Suspense>
            <BlogPage />
        </Suspense>
    );
}

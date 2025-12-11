'use client';

import React, { Suspense } from 'react';
import { isDefined } from '@togglecorp/fujs';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import paginate from '#lib/paginate';

type BlogType = NonNullable<NonNullable<AllQueryQuery['blogs']>>;

function BlogPage() {
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;
    const blogData = allData.blogs as unknown as BlogType;
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
            >
                {(isDefined(blogData) && blogData.length <= 0) ? (
                    <EmptyMessage
                        message="No blogs available"
                    />
                ) : paginateData?.map((blog) => (
                    <ArticleCard
                        key={blog.id}
                        imageSrc={blog.coverImage?.url ?? ''}
                        imageAlt={blog.title}
                        heading={blog.title}
                        author={blog.author}
                        description={blog.content}
                        date={blog.publishedDate}
                        // FIXME: Update to slug after its implemented in server
                        link={blog.id}
                    />
                ))}
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={blogData.length}
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

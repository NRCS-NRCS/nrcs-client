import React from 'react';
import { isDefined } from '@togglecorp/fujs';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type GetBlogsQuery,
    type GetBlogsQueryVariables,
} from '#generated/types/graphql';

import { urqlClient } from '@/lib/urqlClient';
import { GET_BLOGS } from '@/queries';

export default async function Blogs() {
    const result = await urqlClient.query<
        GetBlogsQuery,
        GetBlogsQueryVariables
    >(
        GET_BLOGS,
        {},
    ).toPromise();

    const data = result?.data?.blogs;

    return (
        <Page>
            <Section
                heading="Blogs"
                headingWithBackground
            >
                {(isDefined(data) && data.length <= 0) ? (
                    <EmptyMessage
                        message="No blogs available"
                    />
                ) : data?.map((blog) => (
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
            </Section>
        </Page>
    );
}

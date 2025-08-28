import React from 'react';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type NewsListQuery,
    type NewsListQueryVariables,
} from '#generated/types/graphql';

import { urqlClient } from '@/lib/urqlClient';
import { NEWS_LIST } from '@/queries';

export default async function NewsAndEvents() {
    const result = await urqlClient.query<
        NewsListQuery,
        NewsListQueryVariables
    >(
        NEWS_LIST,
        {},
    ).toPromise();

    const newsList = result?.data?.news ?? [];
    return (
        <Page>
            <Section
                heading="News and Events"
                headingWithBackground
            >
                {newsList.map((news) => (
                    <ArticleCard
                        key={news.id}
                        imageSrc={news.coverImage?.url ?? ''}
                        imageAlt={news.title}
                        heading={news.title}
                        author={news.title}
                        description={news.content}
                        date={news.publishedDate}
                        link={news.id}
                    />
                ))}
            </Section>
        </Page>
    );
}

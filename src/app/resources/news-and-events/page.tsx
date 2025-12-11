import React from 'react';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

type NewsType = NonNullable<NonNullable<AllQueryQuery['news']>>;

export default async function NewsAndEvents() {
    const newsList: NewsType = allData.news;
    return (
        <Page>
            <Section heading="News and Events" headingWithBackground>
                {newsList.length <= 0 ? (
                    <EmptyMessage
                        message="No news or events available"
                    />
                ) : newsList.map((news) => (
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

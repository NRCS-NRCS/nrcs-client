import React from 'react';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type GetResourcesQuery,
    type GetResourcesQueryVariables,
} from '#generated/types/graphql';
import cardImage from '#public/card.png';

import { urqlClient } from '@/lib/urqlClient';
import { GET_RESOURCES } from '@/queries';

export default async function Reports() {
    const result = await urqlClient.query<
        GetResourcesQuery,
        GetResourcesQueryVariables
    >(
        GET_RESOURCES,
        {},
    ).toPromise();

    const data = result?.data?.resources;

    return (
        <Page>
            <Section
                heading="Published Reports"
                headingWithBackground
            >
                {data?.map((report) => (
                    <ArticleCard
                        key={report.id}
                        // FIXME: Update this to resource cover image after its
                        // implemented in server
                        imageSrc={cardImage}
                        imageAlt={report.title}
                        heading={report.title}
                        author={report.title}
                        description={report.content}
                        date={report.publishedDate}
                        link={report.id}
                    />
                ))}
            </Section>
        </Page>
    );
}

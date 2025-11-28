import React from 'react';
import { isDefined } from '@togglecorp/fujs';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type GetReportsQuery,
    type GetReportsQueryVariables,
} from '#generated/types/graphql';
import cardImage from '#public/card.png';

import { urqlClient } from '@/lib/urqlClient';
import { GET_REPORTS } from '@/queries';

export default async function Reports() {
    const result = await urqlClient.query<
        GetReportsQuery,
        GetReportsQueryVariables
    >(
        GET_REPORTS,
        {},
    ).toPromise();

    const data = result?.data?.resources;

    return (
        <Page>
            <Section
                heading="Published Reports"
                headingWithBackground
            >
                {(isDefined(data) && data.length <= 0) ? (
                    <EmptyMessage
                        message="No reports available"
                    />
                ) : data?.map((report) => (
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
                        link={`/resources/reports/${report.id}`}
                    />
                ))}
            </Section>
        </Page>
    );
}

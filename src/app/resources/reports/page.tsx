import React from 'react';
import { isDefined } from '@togglecorp/fujs';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import cardImage from '#public/card.png';

type ReportType = NonNullable<NonNullable<AllQueryQuery['resources']>>;

export default async function Reports() {
    const allResources = allData.resources as unknown as ReportType;
    const data = allResources.filter((res) => res.type === 'REPORT');

    return (
        <Page>
            <Section
                heading="Published Reports"
                headingWithBackground
            >
                {(isDefined(data) && data.length <= 0) ? (
                    <EmptyMessage
                        message="No published reports available"
                    />
                ) : data?.map((report) => (
                    <ArticleCard
                        key={report.id}
                        imageSrc={report.coverImage?.url ?? cardImage}
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

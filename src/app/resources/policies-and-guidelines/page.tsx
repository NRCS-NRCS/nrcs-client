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

export default async function PoliciesandGuidelines() {
    const allResources = allData.resources as unknown as ReportType;
    const data = allResources.filter((res) => res.type === 'POLICY_AND_GUIDELINES');

    return (
        <Page>
            <Section
                heading="Policies and Guidelines"
                headingWithBackground
            >
                {(isDefined(data) && data.length <= 0) ? (
                    <EmptyMessage
                        message="No resources found"
                    />
                ) : data?.map((policy) => (
                    <ArticleCard
                        key={policy.id}
                        // FIXME: Update this to resource cover image after its
                        // implemented in server
                        imageSrc={cardImage}
                        imageAlt={policy.title}
                        heading={policy.title}
                        author={policy.title}
                        description={policy.content}
                        date={policy.publishedDate}
                        link={`/resources/policies-and-guidelines/${policy.id}`}
                    />
                ))}
            </Section>
        </Page>
    );
}

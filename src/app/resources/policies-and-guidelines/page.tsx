import React from 'react';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type GetPoliciesAndGuidelinesQuery,
    type GetPoliciesAndGuidelinesQueryVariables,
} from '#generated/types/graphql';
import cardImage from '#public/card.png';

import { urqlClient } from '@/lib/urqlClient';
import { GET_POLICIES_AND_GUIDELINES } from '@/queries';

export default async function PoliciesandGuidelines() {
    const result = await urqlClient.query<
        GetPoliciesAndGuidelinesQuery,
        GetPoliciesAndGuidelinesQueryVariables
    >(
        GET_POLICIES_AND_GUIDELINES,
        {},
    ).toPromise();

    const data = result?.data?.resources;

    return (
        <Page>
            <Section
                heading="Policies and Guidelines"
                headingWithBackground
            >
                {data?.map((policy) => (
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

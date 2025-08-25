import React from 'react';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type GetWorksQuery,
    type GetWorksQueryVariables,
} from '#generated/types/graphql';

import { urqlClient } from '@/lib/urqlClient';
import { GET_WORKS } from '@/queries';

export default async function Works() {
    const result = await urqlClient.query<
        GetWorksQuery,
        GetWorksQueryVariables
    >(
        GET_WORKS,
        {},
    ).toPromise();

    const data = result?.data?.works;

    return (
        <Page>
            <Section
                heading="Our Works"
                headingWithBackground
            >
                {data?.map((work) => (
                    <ArticleCard
                        key={work.id}
                        isHorizontal
                        imageSrc={work.coverImage.url}
                        imageAlt={work.title}
                        heading={work.title}
                        author={work.title}
                        description={work.description}
                        date={work.startDate}
                        link={work.id}
                    />
                ))}
            </Section>
        </Page>
    );
}

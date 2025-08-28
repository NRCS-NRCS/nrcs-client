import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import {
    type GetWorkDetailsQuery,
    type GetWorkDetailsQueryVariables,
    type GetWorksQuery,
    type GetWorksQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_WORK_DETAILS,
    GET_WORKS,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetWorksQuery,
        GetWorksQueryVariables
    >(
        GET_WORKS,
        {},
    ).toPromise();

    const data = result?.data?.works;
    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No works found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { id: string }) => ({
        slug: d.id,
    }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function WorkDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const result = await urqlClient.query<
        GetWorkDetailsQuery,
        GetWorkDetailsQueryVariables
    >(
        GET_WORK_DETAILS,
        { workId: slug },
    ).toPromise();

    if (!result.data?.work) {
        // eslint-disable-next-line no-console
        console.warn('No work found in GraphQL response');
    }

    const workDetails = result?.data?.work;

    if (isNotDefined(workDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section>
                <ResourcesBanner
                    imageSrc={workDetails.coverImage.url}
                    imageAlt={workDetails.title}
                    heading={workDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={workDetails.title}
                    date={workDetails.startDate}
                    articleLength={workDetails.description.length}
                />
                <ArticleBody
                    content={workDetails?.description}
                />
            </Section>
        </Page>
    );
}

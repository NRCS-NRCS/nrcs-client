import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import {
    type GetProjectDetailsQuery,
    type GetProjectDetailsQueryVariables,
    type GetProjectsQuery,
    type GetProjectsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_PROJECT_DETAILS,
    GET_PROJECTS,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetProjectsQuery,
        GetProjectsQueryVariables
    >(
        GET_PROJECTS,
        {},
    ).toPromise();

    const data = result?.data?.projects;

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No news found in GraphQL response');
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

export default async function ProjectsDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const result = await urqlClient.query<
        GetProjectDetailsQuery,
        GetProjectDetailsQueryVariables
    >(
        GET_PROJECT_DETAILS,
        { projectId: slug },
    ).toPromise();

    if (!result.data?.project) {
        // eslint-disable-next-line no-console
        console.warn('No project found in GraphQL response');
    }

    const projectDetails = result?.data?.project;

    if (isNotDefined(projectDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section>
                {isDefined(projectDetails.coverImage) && (
                    <ResourcesBanner
                        imageSrc={projectDetails.coverImage?.url}
                        imageAlt={projectDetails.coverImage?.name}
                        heading={projectDetails.title}
                    />
                )}
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={projectDetails.title}
                    date={projectDetails.startDate}
                    articleLength={projectDetails.description.length}
                />
                <ArticleBody
                    content={projectDetails.description}
                />
            </Section>
        </Page>
    );
}

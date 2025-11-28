import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import DownloadTemplate from '#components/DownloadTemplate';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import {
    type GetReportsQuery,
    type GetReportsQueryVariables,
    type GetResourceDetailsQuery,
    type GetResourceDetailsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';
import cardImage from '#public/card.png';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_REPORTS,
    GET_RESOURCE_DETAILS,
} from '@/queries';

export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetReportsQuery,
        GetReportsQueryVariables
    >(
        GET_REPORTS,
        {},
    ).toPromise();

    const data = result?.data?.resources;
    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No reports found in GraphQL response');
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

export default async function reportDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const result = await urqlClient.query<
        GetResourceDetailsQuery,
        GetResourceDetailsQueryVariables
    >(
        GET_RESOURCE_DETAILS,
        { resourceId: slug },
    ).toPromise();

    if (!result.data?.resource) {
        // eslint-disable-next-line no-console
        console.warn('No reports found in GraphQL response');
    }

    const resourceDetails = result?.data?.resource;

    if (isNotDefined(resourceDetails)) {
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
                    // FIXME: Update this after its implemented in server
                    imageSrc={cardImage}
                    imageAlt={resourceDetails.title}
                    heading={resourceDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={resourceDetails.title}
                    date={resourceDetails.publishedDate}
                    articleLength={resourceDetails.content.length}
                />
                <ArticleBody
                    content={resourceDetails.content}
                />
                {isDefined(resourceDetails.file) && (
                    <DownloadTemplate
                        title={resourceDetails.file.name}
                        file={resourceDetails.file.url}
                        fileSize={resourceDetails.file.size}
                    />
                )}
            </Section>
        </Page>
    );
}

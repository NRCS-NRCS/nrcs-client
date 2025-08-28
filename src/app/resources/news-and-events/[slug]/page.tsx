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
    type NewsItemQuery,
    type NewsItemQueryVariables,
    type NewsListQuery,
    type NewsListQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    NEWS_ITEM,
    NEWS_LIST,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        NewsListQuery,
        NewsListQueryVariables
    >(
        NEWS_LIST,
        {},
    ).toPromise();

    const data = result?.data?.news;

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

export default async function NewsDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const result = await urqlClient.query<
        NewsItemQuery,
        NewsItemQueryVariables
    >(
        NEWS_ITEM,
        { newsId: slug },
    ).toPromise();

    if (!result.data?.newsItem) {
        // eslint-disable-next-line no-console
        console.warn('No news found in GraphQL response');
    }

    const newsDetails = result?.data?.newsItem;

    if (isNotDefined(newsDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section>
                {isDefined(newsDetails.coverImage) && (
                    <ResourcesBanner
                        imageSrc={newsDetails.coverImage?.url}
                        imageAlt={newsDetails.coverImage?.name}
                        heading={newsDetails.title}
                    />
                )}
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={newsDetails.title}
                    date={newsDetails.publishedDate}
                    articleLength={newsDetails.content.length}
                />
                <ArticleBody
                    content={newsDetails.content}
                />
            </Section>
        </Page>
    );
}

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
import allData from '#data/staticData.json';
import { type NewsQuery } from '#generated/types/graphql';
import defaultImage from '#public/defaultImage.png';

import styles from './page.module.css';

type NewsType = NonNullable<NonNullable<NewsQuery['news']>['results']>;

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data: NewsType = allData.news.results;

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No news found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { slug: string }) => ({
        slug: d.slug,
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
    const allNews: NewsType = allData.news.results;
    const newsDetails = allNews.find(
        (data) => data.slug === slug,
    ) as unknown as NewsType[number];

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
                <ResourcesBanner
                    imageSrc={newsDetails.coverImage?.url ?? defaultImage}
                    imageAlt={newsDetails.coverImage?.name ?? ''}
                    heading={newsDetails.title}
                />
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
                {isDefined(newsDetails.file) && (
                    <DownloadTemplate
                        title={newsDetails.file.name}
                        file={newsDetails.file.url}
                        fileSize={newsDetails.file.size}
                        isExternalLink
                    />
                )}
            </Section>
        </Page>
    );
}

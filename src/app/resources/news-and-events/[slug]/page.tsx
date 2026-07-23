import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import allData from '#lib/staticData';
import defaultImage from '#public/defaultImage.png';

import styles from './page.module.css';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.news.results ?? [];

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
    const allNews = allData.news.results ?? [];
    const newsDetails = allNews.find(
        (data) => data.slug === slug,
    );

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
                {(newsDetails?.actionLinks ?? []).length > 0 && (
                    <div>
                        <Heading size="small">Related Links</Heading>
                        {(newsDetails.actionLinks ?? []).map((link) => (
                            <Link
                                key={link?.url}
                                href={link?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="underline"
                                className={styles.actions}
                            >
                                {link?.url}
                            </Link>
                        ))}
                    </div>
                )}
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

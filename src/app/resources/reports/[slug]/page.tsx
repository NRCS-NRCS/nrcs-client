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
import allData from '#lib/staticData';
import defaultImage from '#public/defaultImage.png';

import styles from './page.module.css';

export async function generateStaticParams() {
    const data = allData.resources.results ?? [];
    if (!data || data?.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No reports found in GraphQL response');
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

export default async function reportDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;
    const allResources = allData.resources.results ?? [];

    const reportDetails = allResources.find(
        (data) => data.slug === slug && data.type === 'REPORT',
    );

    if (!reportDetails) {
        // eslint-disable-next-line no-console
        console.warn('No reports found in GraphQL response');
    }
    if (isNotDefined(reportDetails)) {
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
                    imageSrc={reportDetails?.coverImage?.url ?? defaultImage}
                    imageAlt={reportDetails.title}
                    heading={reportDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={reportDetails.title}
                    date={reportDetails.publishedDate}
                    articleLength={reportDetails.content.length}
                />
                <ArticleBody
                    content={reportDetails.content}
                />
                {isDefined(reportDetails.file) && (
                    <DownloadTemplate
                        title={reportDetails.file.name}
                        file={reportDetails.file.url}
                        fileSize={reportDetails.file.size}
                        isExternalLink
                    />
                )}
            </Section>
        </Page>
    );
}

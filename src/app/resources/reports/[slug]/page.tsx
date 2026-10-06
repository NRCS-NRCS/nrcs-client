import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import BackLink from '#components/BackLink';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import ShareButtons from '#components/ShareButtons';
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

    if (isNotDefined(reportDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <div className={styles.articleHeader}>
                    <BackLink
                        href="/resources/reports"
                        label="Back to Published Reports"
                    />
                    <Heading
                        className={styles.title}
                        size="extraLarge"
                    >
                        {reportDetails.title}
                    </Heading>
                    <AuthorSection
                        className={styles.meta}
                        date={reportDetails.publishedDate}
                        articleLength={reportDetails.content.length}
                    />
                    <ShareButtons
                        className={styles.share}
                        title={reportDetails.title}
                    />
                </div>
                <ResourcesBanner
                    imageSrc={reportDetails.coverImage?.url ?? defaultImage}
                    imageAlt={reportDetails.coverImage?.name ?? reportDetails.title}
                />
                <ArticleBody
                    content={reportDetails.content}
                />
                {isDefined(reportDetails.file) && (
                    <div className={styles.block}>
                        <Heading
                            className={styles.blockHeading}
                            size="small"
                        >
                            Attachment
                        </Heading>
                        <div className={styles.attachments}>
                            <DownloadTemplate
                                title={reportDetails.file.name}
                                file={reportDetails.file.url}
                                fileSize={reportDetails.file.size}
                                isExternalLink
                            />
                        </div>
                    </div>
                )}
                <ShareButtons
                    className={styles.articleFooterShare}
                    title={reportDetails.title}
                    align="center"
                />
            </Section>
        </Page>
    );
}

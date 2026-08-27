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
    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No policies found in GraphQL response');
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

export default async function policyAndGuidelineDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const allResources = allData.resources.results ?? [];

    const policyDetails = allResources.find(
        (data) => data.slug === slug && data.type === 'POLICY_AND_GUIDELINES',
    );

    if (isNotDefined(policyDetails)) {
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
                        href="/resources/policies-and-guidelines"
                        label="Back to Policies and Guidelines"
                    />
                    <Heading
                        className={styles.title}
                        size="superLarge"
                    >
                        {policyDetails.title}
                    </Heading>
                    <AuthorSection
                        className={styles.meta}
                        date={policyDetails.publishedDate}
                        articleLength={policyDetails.content.length}
                    />
                    <ShareButtons
                        className={styles.share}
                        title={policyDetails.title}
                    />
                </div>
                <ResourcesBanner
                    imageSrc={policyDetails.coverImage?.url ?? defaultImage}
                    imageAlt={policyDetails.coverImage?.name ?? policyDetails.title}
                />
                <ArticleBody
                    content={policyDetails.content}
                />
                {isDefined(policyDetails.file) && (
                    <div className={styles.block}>
                        <Heading
                            className={styles.blockHeading}
                            size="small"
                        >
                            Attachment
                        </Heading>
                        <div className={styles.attachments}>
                            <DownloadTemplate
                                title={policyDetails.file.name}
                                file={policyDetails.file.url}
                                fileSize={policyDetails.file.size}
                                isExternalLink
                            />
                        </div>
                    </div>
                )}
                <ShareButtons
                    className={styles.articleFooterShare}
                    title={policyDetails.title}
                    align="center"
                />
            </Section>
        </Page>
    );
}

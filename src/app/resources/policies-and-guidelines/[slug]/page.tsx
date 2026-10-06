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
            <Section>
                <ResourcesBanner
                    imageSrc={policyDetails.coverImage?.url ?? defaultImage}
                    imageAlt={policyDetails.title}
                    heading={policyDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={policyDetails.title}
                    date={policyDetails.publishedDate}
                    articleLength={policyDetails.content.length}
                />
                <ArticleBody
                    content={policyDetails.content}
                />
                {isDefined(policyDetails.file) && (
                    <DownloadTemplate
                        title={policyDetails.file.name}
                        file={policyDetails.file.url}
                        fileSize={policyDetails.file.size}
                        isExternalLink
                    />
                )}
            </Section>
        </Page>
    );
}

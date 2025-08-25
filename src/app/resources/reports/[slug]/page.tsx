import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';

import { blogs } from '../page';

import styles from './page.module.css';

export type Reports = NonNullable<
    (typeof blogs)['results']
>[number];

async function getReports(): Promise<Reports[]> {
    return blogs.results;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const reportList = await getReports();
    if (!reportList || reportList.length === 0) {
        return [{ slug: 'empty' }];
    }
    return reportList.map((item) => ({ slug: item.slug }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ReportDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const report = await getReports();

    const reportDetails = report?.find((item) => item.slug === slug);

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
                    imageSrc={reportDetails.cover_image}
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
                    date={reportDetails.published_date}
                    articleLength={reportDetails.content.length}
                />
                <ArticleBody
                    content={reportDetails.content}
                />
            </Section>
        </Page>
    );
}

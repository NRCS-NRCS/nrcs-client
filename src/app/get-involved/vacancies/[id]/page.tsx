import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#lib/staticData';

import styles from './page.module.css';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.jobVacancies.results ?? [];

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No vacancies found in GraphQL response');
        return [{ id: 'dummy' }];
    }

    return data?.map((d: { id: string }) => ({
        id: d.id,
    }));
}

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function VacancyDetailPage({ params }: PageProps) {
    const {
        id,
    } = await params;
    const allVacancies = allData.jobVacancies.results ?? [];

    const vacancyDetails = allVacancies.find(
        (data) => data.id === id,
    );

    if (!vacancyDetails) {
        // eslint-disable-next-line no-console
        console.warn('No vacancies found in GraphQL response');
        return notFound();
    }

    return (
        <Page contentClassName={styles.vacancyDetails}>
            <Section
                heading={vacancyDetails?.title}
            >
                <Heading
                    className={styles.heading}
                    size="small"
                    font="normal"
                >
                    Published on &nbsp;
                    {/* // TODO: Add published date */}
                </Heading>
            </Section>
            <Section>
                <ArticleBody
                    content={vacancyDetails?.description}
                />
                {isDefined(vacancyDetails.file) && (
                    <DownloadTemplate
                        title={vacancyDetails.file.name}
                        file={vacancyDetails.file.url}
                        fileSize={vacancyDetails.file.size}
                        isExternalLink
                    />
                )}
            </Section>
        </Page>
    );
}

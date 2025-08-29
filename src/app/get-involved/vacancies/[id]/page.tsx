import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type VacanciesQuery,
    type VacanciesQueryVariables,
    type VacancyQuery,
    type VacancyQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    VACANCIES,
    VACANCY,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        VacanciesQuery,
        VacanciesQueryVariables
    >(VACANCIES, {}).toPromise();

    const data = result?.data?.jobVacancies;

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
    const result = await urqlClient.query<
        VacancyQuery,
        VacancyQueryVariables
    >(VACANCY, { id }).toPromise();

    if (!result.data?.jobVacancy) {
    // eslint-disable-next-line no-console
        console.warn('No vacancies found in GraphQL response');
        return notFound();
    }

    return (
        <Page contentClassName={styles.vacancyDetails}>
            <Section
                heading={result.data.jobVacancy?.title}
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
                    content={result.data.jobVacancy?.description}
                />
                {isDefined(result.data.jobVacancy.file) && (
                    <DownloadTemplate
                        title={result.data.jobVacancy.file.name}
                        file={result.data.jobVacancy.file.url}
                        fileSize={result.data.jobVacancy.file.size}
                    />
                )}
            </Section>
        </Page>
    );
}

import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';

import { vacancies } from '../page';

import styles from './page.module.css';

export type Vacancy = NonNullable<
  (typeof vacancies)['vacancy_description']['items']
>[number];

async function getVacancies(): Promise<Vacancy[]> {
    return vacancies.vacancy_description.items;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const vacancyList = await getVacancies();
    if (!vacancyList || vacancyList.length === 0) {
        return [{ id: 'empty' }];
    }
    return vacancyList.map((item) => ({ id: item.id }));
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
    const vacancy = await getVacancies();

    const vacancyDetails = vacancy?.find((item) => item.id === id);

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
                    {vacancyDetails?.published_date}
                </Heading>
            </Section>
            <Section>
                <ArticleBody
                    content={vacancyDetails?.description}
                />
                {vacancyDetails && (
                    <DownloadTemplate
                        title={vacancyDetails.title}
                        file={vacancyDetails.file.url}
                        fileSize={vacancyDetails.file.size}
                    />
                )}
            </Section>
        </Page>
    );
}

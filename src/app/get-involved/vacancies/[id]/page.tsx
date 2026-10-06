import { formatDateToString } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import AnnouncementDetail, { type MetaItem } from '#components/AnnouncementDetail';
import Page from '#components/Page';
import allData from '#lib/staticData';

import styles from './page.module.css';

const contactEmail = 'nrcs@nrcs.org';

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

    const metaItems: MetaItem[] = [
        {
            label: 'Expiry date',
            value: formatDateToString(new Date(vacancyDetails.expiryDate), 'MMM dd, yyyy'),
        },
        ...(vacancyDetails.position ? [{
            label: 'Position',
            value: vacancyDetails.position,
        }] : []),
        ...(vacancyDetails.numberOfVacancies > 0 ? [{
            label: 'No. of vacancies',
            value: vacancyDetails.numberOfVacancies,
        }] : []),
        {
            label: 'Apply to',
            value: contactEmail,
            link: `mailto:${contactEmail}`,
        },
    ];

    return (
        <Page contentClassName={styles.vacancyDetails}>
            <AnnouncementDetail
                backLink="/get-involved/vacancies/"
                backLabel="All vacancies"
                title={vacancyDetails.title}
                metaItems={metaItems}
                description={vacancyDetails.description}
                attachmentHeading="Announcement"
                attachment={vacancyDetails.file}
            />
        </Page>
    );
}

import {
    formatDateToString,
    isDefined,
} from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import AnnouncementDetail, { type MetaItem } from '#components/AnnouncementDetail';
import Page from '#components/Page';
import allData from '#lib/staticData';

import styles from './page.module.css';

const contactEmail = 'nrcs@nrcs.org';

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
    const data = allData.procurements.results ?? [];

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [{ id: 'dummy' }];
    }

    return data?.map((d: { id: string }) => ({
        id: d.id,
    }));
}

export default async function ProcurementDetailPage(
    { params }: { params: Promise<{ id: string }> },
) {
    const {
        id,
    } = await params;
    const allProcurements = allData.procurements.results ?? [];

    const procurementDetails = allProcurements.find(
        (data) => data.id === id,
    );

    if (!procurementDetails) {
        // eslint-disable-next-line no-console
        console.warn('No procurement found in GraphQL response');
        return notFound();
    }

    const metaItems: MetaItem[] = [
        {
            label: 'Expiry date',
            value: formatDateToString(new Date(procurementDetails.expiryDate), 'MMM dd, yyyy'),
        },
        ...(isDefined(procurementDetails.publishedDate) ? [{
            label: 'Published on',
            value: formatDateToString(new Date(procurementDetails.publishedDate), 'MMM dd, yyyy'),
        }] : []),
        {
            label: 'Enquiries to',
            value: contactEmail,
            link: `mailto:${contactEmail}`,
        },
    ];

    return (
        <Page contentClassName={styles.procurementDetails}>
            <AnnouncementDetail
                backLink="/get-involved/procurements/"
                backLabel="All procurements"
                title={procurementDetails.title}
                metaItems={metaItems}
                description={procurementDetails.description}
                attachmentHeading="Tender document"
                attachment={procurementDetails.file}
            />
        </Page>
    );
}

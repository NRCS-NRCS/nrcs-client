import React from 'react';

import AnnouncementList from '#components/AnnouncementList';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#lib/staticData';

import styles from './page.module.css';

export default async function Procurements() {
    const procurements = (allData.procurements.results ?? [])
        .map((procurement) => ({
            id: procurement.id,
            title: procurement.title,
            expiryDate: procurement.expiryDate,
            link: `/get-involved/procurements/${procurement.id}/`,
        })).sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());

    return (
        <Page contentClassName={styles.procurement}>
            <Section
                heading="Procurement"
                headingWithBackground
                childrenContainerClassName={styles.pageContent}
            >
                <p className={styles.procurementDescription}>
                    National and international tender announcements for NRCS.
                </p>
                <AnnouncementList
                    heading="Current Procurement"
                    items={procurements}
                    emptyTitle="No open procurements"
                    emptyDescription="National and international tender announcements will be listed here when they open."
                />
            </Section>
        </Page>
    );
}

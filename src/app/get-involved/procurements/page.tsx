import React from 'react';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';

import procurements from './data';

import styles from './page.module.css';

export default function Procurements() {
    return (
        <Page contentClassName={styles.procurement}>
            <Section
                heading="Procurement"
                headingWithBackground
            >
                National and international tender announcements for NRCS.
                <div className={styles.procurementCard}>
                    {procurements?.results?.map((procurement) => (
                        <Card
                            key={procurement.id}
                            title={procurement.title}
                            date={procurement.expiry_date}
                            link={procurement.id}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

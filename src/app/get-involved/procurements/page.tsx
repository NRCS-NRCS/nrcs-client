import React from 'react';
import { notFound } from 'next/navigation';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';
import {
    type ProcurementsQuery,
    type ProcurementsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import { PROCUREMENTS } from '@/queries';

export default async function Procurements() {
    const result = await urqlClient.query<
        ProcurementsQuery,
        ProcurementsQueryVariables
    >(PROCUREMENTS, {}).toPromise();
    if (!result.data?.procurements) {
    // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [];
    }
    const procurements = result.data?.procurements;

    if (!procurements) {
        return notFound();
    }
    return (
        <Page contentClassName={styles.procurement}>
            <Section
                heading="Procurement"
                headingWithBackground
            >
                National and international tender announcements for NRCS.
                <div className={styles.procurementCard}>
                    {procurements?.map((procurement) => (
                        <Card
                            key={procurement.id}
                            title={procurement.title}
                            date={procurement.expiryDate}
                            link={procurement.id}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

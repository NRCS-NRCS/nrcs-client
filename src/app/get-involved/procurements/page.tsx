import React from 'react';
import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';
import AllData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type ProcurementsType = NonNullable<NonNullable<AllQueryQuery['procurements']>>;

export default async function Procurements() {
    const procurementsData: ProcurementsType = AllData.procurements;
    if (!procurementsData) {
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
                    {(isDefined(procurementsData) && procurementsData.length <= 0) ? (
                        <EmptyMessage
                            message="No procurements available"
                        />
                    ) : procurementsData?.map((procurement) => (
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

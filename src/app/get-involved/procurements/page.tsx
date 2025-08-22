import React from 'react';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';

import styles from './page.module.css';

interface FileType {
    url: string;
    size: string;
}

interface ProcurementItem {
    id: string;
    title: string;
    description: string;
    file: FileType;
    published_date: string;
    expiry_date: string;
}

interface Procurements {
    results: ProcurementItem[];
}

export const procurements: Procurements = {
    results: [
        {
            id: '1',
            title: 'Laptop Supply',
            description: 'Procurement of laptops for field staff.',
            file: {
                url: '/files/laptops.pdf',
                size: '50KB',
            },
            published_date: '2025-07-01',
            expiry_date: '2025-07-31',
        },
        {
            id: '2',
            title: 'Vehicle Hire',
            description: 'Hiring vehicles for emergency deployment.',
            file: {
                url: '/files/vehicles.pdf',
                size: '50KB',
            },
            published_date: '2025-06-15',
            expiry_date: '2025-07-15',
        },
        {
            id: '3',
            title: 'Satellite Phones',
            description: 'Reliable communication during disasters.',
            file: {
                url: '/files/sat-phones.pdf',
                size: '50KB',
            },
            published_date: '2025-08-01',
            expiry_date: '2025-09-01',
        },
        {
            id: '4',
            title: 'Medical Kits',
            description: 'Emergency health supplies for field workers.',
            file: {
                url: '/files/medical-kits.pdf',
                size: '50KB',
            },
            published_date: '2025-05-20',
            expiry_date: '2025-06-20',
        },
        {
            id: '5',
            title: 'Generators',
            description: 'Backup power sources for operations.',
            file: {
                url: '/files/generators.pdf',
                size: '50KB',
            },
            published_date: '2025-04-10',
            expiry_date: '2025-05-10',
        },
    ],
};

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

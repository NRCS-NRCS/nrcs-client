import React from 'react';

import ArticleBody from '#components/ArticleBody';
import Card from '#components/GetInvolvedCard';
import Page from '#components/Page';
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
    procurement_description: {
        description: string;
        items: ProcurementItem[];
    }
}

export const procurements: Procurements = {
    procurement_description: {
        description: 'Procurement is the strategic process an organization uses to acquire the goods and services it needs to operate effectively, encompassing everything from identifying needs and market research to selecting suppliers, negotiating contracts, and managing relationships.',
        items: [
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
    },
};

export default function Procurements() {
    return (
        <Page contentClassName={styles.procurement}>
            <Section
                heading="Procurement"
                headingWithBackground
            >
                <ArticleBody
                    content={procurements?.procurement_description?.description}
                />
                <div className={styles.procurementCard}>
                    {procurements?.procurement_description.items?.map((procurement) => (
                        <Card
                            key={procurement.id}
                            title={procurement.title}
                            date={procurement.published_date}
                            name={procurement.description}
                            link={procurement.id}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

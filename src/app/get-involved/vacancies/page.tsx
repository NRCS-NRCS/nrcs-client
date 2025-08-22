import React from 'react';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';

import styles from './page.module.css';

interface FileType {
    url: string;
    size: string;
}

interface VacancyItem {
    id: string;
    title: string;
    description: string;
    file: FileType;
    published_date: string;
    expiry_date: string;
    department: number;
}

interface Vacancy {
    results: VacancyItem[];
}

export const vacancies: Vacancy = {
    results: [
        {
            id: '1',
            title: 'Frontend Developer',
            description: 'React developer to build user interfaces.',
            file: {
                url: 'https://tourism.gov.in/sites/default/files/2019-04/dummy-pdf_2.pdf',
                size: '123KB',
            },
            published_date: '2025-08-10',
            expiry_date: '2025-09-10',
            department: 1,
        },
        {
            id: '2',
            title: 'Project Manager',
            description: 'Lead disaster response projects.',
            file: {
                url: '/files/project-manager.pdf',
                size: '45KB',
            },
            published_date: '2025-07-15',
            expiry_date: '2025-08-15',
            department: 2,
        },
        {
            id: '3',
            title: 'Data Analyst',
            description: 'Analyze disaster data trends.',
            file: {
                url: '/files/data-manager.pdf',
                size: '45KB',
            },
            published_date: '2025-07-01',
            expiry_date: '2025-07-30',
            department: 1,
        },
        {
            id: '4',
            title: 'Field Coordinator',
            description: 'Coordinate field operations during emergencies.',
            file: {
                url: '/files/field-coordinator.pdf',
                size: '45KB',
            },
            published_date: '2025-06-20',
            expiry_date: '2025-07-20',
            department: 2,
        },
        {
            id: '5',
            title: 'Communications Officer',
            description: 'Manage organizational communications.',
            file: {
                url: '/files/field-coordinator.pdf',
                size: '45KB',
            },
            published_date: '2025-05-15',
            expiry_date: '2025-06-15',
            department: 1,
        },
    ],
};

export default function Vacancies() {
    return (
        <Page contentClassName={styles.vacancies}>
            <Section
                heading="Vacancy"
                headingWithBackground
            >
                <div className={styles.vacancyDescription}>
                    <p>
                        Join our mission to serve humanity.
                        The Nepal Red Cross Society is committed to giving back to the community—not
                        only through our programs but also by creating meaningful job opportunities.
                        Explore our current openings and become part of lasting change.
                    </p>
                    <p>
                        Interested candidates can send their CV and cover letter to &nbsp;
                        <a
                            href="mailto:nrcs@nrcs.org"
                        >
                            <span>
                                nrcs@nrcs.org
                            </span>
                        </a>
                        &nbsp; or contact us directly at &nbsp;
                        <a
                            className={styles.link}
                            href="tel:+977-1-1234567"
                        >
                            <span>
                                +977-1-1234567
                            </span>
                        </a>
                        &nbsp; for more information.
                    </p>
                </div>
                <div className={styles.vacancyCard}>
                    {vacancies?.results?.map((vacancy) => (
                        <Card
                            key={vacancy.id}
                            title={vacancy.title}
                            date={vacancy.expiry_date}
                            link={vacancy.id}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

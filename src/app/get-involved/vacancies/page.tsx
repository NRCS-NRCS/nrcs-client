import React from 'react';
import { notFound } from 'next/navigation';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type vacancies = NonNullable<NonNullable<AllQueryQuery['jobVacancies']>['results']>;

export default async function Vacancies() {
    const vacancies = allData.jobVacancies.results as unknown as vacancies;

    if (!vacancies) {
        return notFound();
    }

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
                    {vacancies?.map((vacancy) => (
                        <Card
                            key={vacancy.id}
                            title={vacancy.title}
                            date={vacancy.expiryDate}
                            link={vacancy.id}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

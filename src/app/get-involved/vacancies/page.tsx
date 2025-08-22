import React from 'react';

import Page from '#components/Page';
import Card from '#components/ProcurementVacancyCard';
import Section from '#components/Section';

import vacancies from './data';

import styles from './page.module.css';

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

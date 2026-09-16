import React from 'react';
import { IoMailOutline } from 'react-icons/io5';

import AnnouncementList from '#components/AnnouncementList';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#lib/staticData';

import styles from './page.module.css';

const contactEmail = 'nrcs@nrcs.org';
const contactPhone = '+977-1-1234567';

export default async function Vacancies() {
    const vacancies = (allData.jobVacancies.results ?? [])
        .map((vacancy) => ({
            id: vacancy.id,
            title: vacancy.title,
            expiryDate: vacancy.expiryDate,
            link: `/get-involved/vacancies/${vacancy.id}/`,
        })).sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());

    return (
        <Page contentClassName={styles.vacancies}>
            <Section
                heading="Vacancy"
                headingWithBackground
                childrenContainerClassName={styles.pageContent}
            >
                <div className={styles.vacancyDescription}>
                    <p>
                        Join our mission to serve humanity.
                        The Nepal Red Cross Society is committed to giving back to the community—not
                        only through our programs but also by creating meaningful job opportunities.
                        Explore our current openings and become part of lasting change.
                    </p>
                    <div className={styles.contactCallout}>
                        <IoMailOutline className={styles.calloutIcon} />
                        <p>
                            Interested candidates can send their CV and cover letter to &nbsp;
                            <a
                                className={styles.link}
                                href={`mailto:${contactEmail}`}
                            >
                                {contactEmail}
                            </a>
                            &nbsp; or contact us directly at &nbsp;
                            <a
                                className={styles.link}
                                href={`tel:${contactPhone}`}
                            >
                                {contactPhone}
                            </a>
                            &nbsp; for more information.
                        </p>
                    </div>
                </div>
                <AnnouncementList
                    heading="Current openings"
                    items={vacancies}
                    emptyTitle="No vacancy announcements"
                    emptyDescription="Vacancy announcements will be listed here once they are published."
                />
            </Section>
        </Page>
    );
}

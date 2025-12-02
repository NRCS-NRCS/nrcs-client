import React from 'react';
import { IoDownload } from 'react-icons/io5';

import ArticleBody from '#components/ArticleBody';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Page from '#components/Page';
import Section from '#components/Section';

import styles from './page.module.css';

const memberHeading = 'Become a Member';
const memberText = `
Become a Member of Nepal Red Cross Society (NRCS) to support the valuable work done by our volunteers and staff all around Nepal! NRCS Membership is open to all, so join the happy group of thousands of members we already have.
NRCS membership is an easy way to support the work we do but also a great way to speak out for humane values and help the ones in need.\n
To become a Member, follow these two very easy steps:\n
1. Print and fill the application form, or ask the form from your Local Red Cross Branch.\n
2. Return the form filled to your Local Red Cross Branch.
`;

const memberships = [
    {
        id: 'life-member',
        title: 'Life Member',
        fee: 'One-time, NPR 25 entry fee and NPR 1,000 membership fee',
        description: 'Life Member membership does not need to be renewed.',
    },
    {
        id: 'ordinary-member',
        title: 'Ordinary Member',
        fee: 'NPR 25 entry fee and NPR 250 membership fee for 5 years',
        description: 'Ordinary Membership status needs to be renewed every five years.',
    },
    {
        id: 'distinguished-member',
        title: 'Distinguished Member',
        fee: 'NPR 25,000 in Cash or Kind',
        description: 'Provincial Executive Committee may grant the Distinguished Membership to any person donating a lump sum of a fixed amount in the form of cash, kind or in the form of any immovable property worth thereof to the Society.',
    },
    {
        id: 'illustrious-member',
        title: 'Illustrious Member',
        fee: 'NPR 100,000 in Cash or Kind',
        description: 'Provincial Executive Committee may grant Illustrious Membership to any person remarkably donating a lump sum of a fixed amount in the form of cash, kind or in the form of any immovable property worth thereof to the Society.',
    },
    {
        id: 'institutional-membership',
        title: 'Institutional Membership',
        fee: 'Yearly, NPR 25,000 membership fee',
        description: 'Institutional Membership may be granted to any Organisations donating annually a lump sum of a fixed amount to the Society. Such a body may participate in the meetings of the concerned Assembly through its representative.',
    },
    {
        id: 'honorary-member',
        title: 'Honorary Member',
        fee: 'No fixed fee',
        description: 'The Central Executive Committee may grant Honorary Membership of the Society to any member or person who has incessantly rendered distinctive services or contributions to the Society through the person’s physical, mental and intellectual mite conforming to the Fundamental Principles of Red Cross and the objectives of Nepal Red Cross Society, in recognition of person’s contribution.',
    },
];

export default function Volunteer() {
    return (
        <Page contentClassName={styles.page}>
            <Section
                heading={memberHeading}
                headingWithBackground
                className={styles.member}
                contentClassName={styles.memberContent}
                childrenContainerClassName={styles.memberChildren}
            >
                <ArticleBody content={memberText} />
                <div className={styles.downloadButtonsWrapper}>
                    <Link
                        className={styles.downloadButton}
                        href="/life-member-application-nepali.pdf"
                        target="_blank"
                        download
                        rel="noopener noreferrer"
                    >
                        Fill out the form in Nepali
                        &nbsp;
                        <IoDownload />
                    </Link>
                    <Link
                        className={styles.downloadButton}
                        href="/life-member-application-english.pdf"
                        target="_blank"
                        download
                        rel="noopener noreferrer"
                    >
                        Fill out the form in English
                        &nbsp;
                        <IoDownload />
                    </Link>
                </div>
            </Section>
            <Section
                className={styles.membershipTypes}
                contentClassName={styles.membershipTypesContent}
                childrenContainerClassName={styles.membershipTypesChildren}
            >
                {memberships.map((membership) => (
                    <div
                        key={membership.id}
                        className={styles.item}
                    >
                        <Heading
                            size="small"
                            className={styles.title}
                        >
                            {membership.title}
                        </Heading>
                        <div className={styles.description}>
                            <Heading
                                size="small"
                            >
                                {membership.fee}
                            </Heading>
                            <span className={styles.additionalText}>
                                {membership.description}
                            </span>
                        </div>
                    </div>
                ))}
            </Section>
        </Page>
    );
}

import React from 'react';
import {
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoYoutube,
} from 'react-icons/io5';
import { RiTwitterXFill } from 'react-icons/ri';

import Accordion from '#components/Accordion';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import Page from '#components/Page';
import Section from '#components/Section';
import bannerImg from '#public/banner.png';

import ContactForm from './ContactForm';

import styles from './page.module.css';

const faqs = [
    {
        id: '1',
        title: 'How is NRCS funded?',
        description: 'NRCS relies on donations from individuals, communities, partner organizations, and international support.',
    },
    {
        id: '2',
        title: 'Can I volunteer with NRCS?',
        description: 'Yes. With more than 75,000 volunteers nationwide, NRCS welcomes individuals willing to contribute time and skills. You can apply through your local Red Cross branch or the NRCS headquarters.',
    },
    {
        id: '3',
        title: 'What kind of services does NRCS provide?',
        description: 'NRCS delivers disaster response and preparedness, emergency health services, blood transfusion, water and sanitation programs, and community development across Nepal.',
    },
    {
        id: '4',
        title: 'How can I donate to NRCS?',
        description: 'You can donate through the official NRCS website, bank transfer, or authorized donation platforms. All donations directly support humanitarian work and disaster response.',
    },
];
const contactUsHeading = 'We’d love to hear from you.';
const contactUsText = 'Have questions, need support or possible partnership? We\'re here to help. Reach out to us through the form below or use the contact details provided — we\'ll get back to you as soon as possible.';
const reportConcernHeading = 'You can report a concern';
const reportConcernText = 'If you’ve witnessed or experienced something that concerns you, we encourage you to report it. Your feedback helps us ensure accountability, transparency, and a safer environment for all.';

export default function Contact() {
    return (
        <Page contentClassName={styles.contactPage}>
            <Section
                className={styles.contact}
                contentClassName={styles.contactContent}
                childrenContainerClassName={styles.contactChildren}
            >
                <ImageWrapper
                    src={bannerImg}
                    alt="banner image"
                />
                <div className={styles.contactForm}>
                    <Heading>
                        {contactUsHeading}
                    </Heading>
                    {contactUsText}
                    <ContactForm />
                </div>
            </Section>
            <Section
                className={styles.concern}
                contentClassName={styles.concernContent}
                childrenContainerClassName={styles.concernChildren}
            >
                <Heading>
                    {reportConcernHeading}
                </Heading>
                {reportConcernText}
                <div className={styles.contactTypes}>
                    <div className={styles.contactItem}>
                        <Heading
                            size="small"
                        >
                            Email
                        </Heading>

                        <Link
                            href="mailto:nrcs@nrcs.org"
                            className={styles.link}
                        >
                            nrcs@nrcs.org
                        </Link>
                        <Link
                            href="mailto:info@nrcs.org"
                            className={styles.link}
                        >
                            info@nrcs.org
                        </Link>
                    </div>
                    <div className={styles.contactItem}>
                        <Heading
                            size="small"
                        >
                            Telephone
                        </Heading>

                        <Link
                            href="tel:+977-1-537 2761"
                            className={styles.link}
                        >
                            +977-1-537 2761
                        </Link>
                        <Link
                            href="tel:+977-1-537 0650"
                            className={styles.link}
                        >
                            +977-1-537 0650
                        </Link>
                        <Link
                            href="tel:+977-1-537 2761"
                            className={styles.link}
                        >
                            +977-1-537 2761
                        </Link>
                    </div>
                    <div className={styles.contactItem}>
                        <Heading
                            size="small"
                        >
                            Social Media
                        </Heading>
                        <div className={styles.links}>
                            <Link
                                // TODO: Fix this link
                                href="https://www.instagram.com/nrcsnepal2020"
                                className={styles.icon}
                            >
                                <IoLogoInstagram />
                            </Link>
                            <Link
                                // TODO: Fix this link
                                href="https://www.facebook.com/nrcsnepal2020"
                                className={styles.icon}
                            >
                                <IoLogoFacebook />
                            </Link>
                            <Link
                                // TODO: Fix this link
                                href="https://www.youtube.com/@nrcs.nepal"
                                className={styles.icon}
                            >
                                <IoLogoYoutube />
                            </Link>
                            <Link
                                // TODO: Fix this link
                                href="https://www.linkedin.com/company/citizenship-affected-people-s-network-nepal"
                                className={styles.icon}
                            >
                                <IoLogoLinkedin />
                            </Link>
                            <Link
                                // TODO: Fix this link
                                href="https://twitter.com"
                                className={styles.icon}
                            >
                                <RiTwitterXFill />
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
            <Section
                className={styles.faq}
                contentClassName={styles.faqContent}
                childrenContainerClassName={styles.faqChildren}
            >
                <Heading
                    size="small"
                >
                    Frequently Asked Questions
                </Heading>
                <Accordion
                    items={faqs}
                    allowMultipleExpansion
                />
            </Section>
        </Page>
    );
}

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
import {
    type FaqsQuery,
    type FaqsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';
import bannerImg from '#public/banner.png';

import ContactForm from './ContactForm';
import FeedbackForm from './FeedbackForm';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import { FAQS } from '@/queries';

const contactUsHeading = 'We’d love to hear from you.';
const contactUsText = 'Have questions, need support or possible partnership? We\'re here to help. Reach out to us through the form below or use the contact details provided — we\'ll get back to you as soon as possible.';
const feedbackHeading = 'Leave your feedback';
const feedbackText = 'Your feedback is valuable to us. Kindly share your thoughts to help us serve you better.';
const reportConcernHeading = 'You can report a concern';
const reportConcernText = 'If you’ve witnessed or experienced something that concerns you, we encourage you to report it. Your feedback helps us ensure accountability, transparency, and a safer environment for all.';
const getInTouchHeading = 'Get in touch with us';
const getInTouchText = 'You can also get involved with us in meaningful ways—through donations, volunteering, or becoming a member. Every action you take helps us make a greater impact together.';

export default async function Contact() {
    const result = await urqlClient.query<
        FaqsQuery,
        FaqsQueryVariables
    >(FAQS, {}).toPromise();

    const faqs = result.data?.faqs?.sort((a, b) => a.orderIndex - b.orderIndex).map(
        (faq) => ({
            id: faq.id,
            title: faq.question,
            description: faq.answer,
        }),
    );

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
                className={styles.feedback}
                contentClassName={styles.feedbackContent}
                childrenContainerClassName={styles.feedbackChildren}
                heading={feedbackHeading}
                headingSize="medium"
            >
                {feedbackText}
                <FeedbackForm />
            </Section>
            <Section
                className={styles.concern}
                contentClassName={styles.concernContent}
                childrenContainerClassName={styles.concernChildren}
                heading={reportConcernHeading}
                headingSize="medium"
            >
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
                    items={faqs ?? []}
                    allowMultipleExpansion
                />
            </Section>
            <Section
                className={styles.getInTouch}
                contentClassName={styles.getInTouchContent}
                childrenContainerClassName={styles.getInTouchChildren}
            >
                <div className={styles.getInTouch}>
                    <Heading
                        className={styles.heading}
                    >
                        {getInTouchHeading}
                    </Heading>
                    {getInTouchText}
                </div>
                <div className={styles.links}>
                    <Link
                        href="/get-involved/volunteer/"
                        className={styles.link}
                    >
                        Volunteer for a cause
                    </Link>
                    <Link
                        href="/donate/"
                        className={styles.link}
                    >
                        Donate
                    </Link>
                    <Link
                        // TODO: Fix this link to download membership form
                        href="/donate/"
                        className={styles.link}
                    >
                        Become a member
                    </Link>
                </div>
            </Section>
            <div className={styles.mapContainer}>
                <iframe
                    className={styles.map}
                    title="NRCS location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28260.721783940204!2d85.25562017910154!3d27.699057300000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb186127871d01%3A0xffe5ec3bb6afa776!2z4KSo4KWH4KSq4KS-4KSyIOCksOClh-CkoeCkleCljeCksOCkuCDgpLjgpYvgpLjgpL7gpIfgpJ_gpYAg4KSV4KWH4KSo4KWN4KSm4KWN4KSw4KS_4KSvIOCkleCkvuCksOCljeCkr-CkvuCksuCkryAo4KSk4KS-4KS54KS-4KSa4KSyLSDgpKzgpL7gpKvgpLIpIOCkteCkoeCkviDgpKjgpIIu4KWn4KWp!5e0!3m2!1sen!2snp!4v1756272325998!5m2!1sen!2snp"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />

            </div>
        </Page>
    );
}

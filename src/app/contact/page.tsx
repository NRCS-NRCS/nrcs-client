import React from 'react';
import {
    IoLocationOutline,
    IoMailOutline,
} from 'react-icons/io5';

import Banner from '#components/Banner';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import ContactUsImage from '#public/contact.png';

import styles from './page.module.css';

const contactUsText = 'We welcome your inquiries, feedback, and partnership ideas. Contact us and let’s work together for change.';

export default function Contact() {
    return (
        <Page contentClassName={styles.contact}>
            <Banner
                bannerImageSrc={ContactUsImage}
                eyebrowHeading="CONTACT US"
                heading={(
                    <>
                        Have a Question?
                        <span>Get in Touch</span>
                    </>
                )}
            />
            <Section>
                <div className={styles.wrapper}>
                    <div className={styles.leftCard}>
                        <Heading
                            className={styles.heading}
                            size="large"
                        >
                            Contact Details
                        </Heading>
                        <div className={styles.item}>
                            <IoMailOutline className={styles.icon} />
                            <a
                                className={styles.text}
                                href="mailto:info.contact@nrcs.org"
                            >
                                info.contact@nrcs.org
                            </a>
                        </div>
                        <div className={styles.item}>
                            <IoLocationOutline className={styles.icon} />
                            <span className={styles.text}>
                                Kathmandu
                            </span>
                        </div>
                        <span className={styles.text}>
                            {contactUsText}
                        </span>
                    </div>
                    <iframe
                        className={styles.map}
                        title="nrcs location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.59023197015!2d85.28638827100514!3d27.699057022642997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb186127871d01%3A0xffe5ec3bb6afa776!2z4KSo4KWH4KSq4KS-4KSyIOCksOClh-CkoeCkleCljeCksOCkuCDgpLjgpYvgpLjgpL7gpIfgpJ_gpYAg4KSV4KWH4KSo4KWN4KSm4KWN4KSw4KS_4KSvIOCkleCkvuCksOCljeCkr-CkvuCksuCkryAo4KSk4KS-4KS54KS-4KSa4KSyLSDgpKzgpL7gpKvgpLIpIOCkteCkoeCkviDgpKjgpIIu4KWn4KWp!5e0!3m2!1sen!2snp!4v1755521933255!5m2!1sen!2snp"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </Section>
        </Page>
    );
}

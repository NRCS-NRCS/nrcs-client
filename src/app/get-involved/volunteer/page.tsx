import React from 'react';

import ImageWrapper from '#components/ImageWrapper';
import Page from '#components/Page';
import Section from '#components/Section';
import homeBanner from '#public/banner.png';

import VolunteerForm from './VolunteerForm';

import styles from './page.module.css';

export default function Volunteer() {
    return (
        <Page contentClassName={styles.page}>
            <Section className={styles.section}>
                <div className={styles.homeBanner}>
                    <ImageWrapper
                        className={styles.bannerImage}
                        imageClassName={styles.image}
                        src={homeBanner}
                        alt="Banner Image"
                    />
                </div>
                <VolunteerForm />
            </Section>
        </Page>
    );
}

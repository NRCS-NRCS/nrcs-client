import React from 'react';

import Divider from '#components/Divider';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';

import styles from './page.module.css';

export default function Home() {
    return (
        <Page contentClassName={styles.page}>
            <Section
                className={styles.definition}
                contentClassName={styles.definitionSection}
            >
                <Heading
                    className={styles.definitionHeading}
                    size="large"
                >
                    Nepal Red Cross Society
                </Heading>
            </Section>
            <Divider />
        </Page>
    );
}

import Page from '#components/Page';
import Section from '#components/Section';

import TabSection from './TabSection';

import styles from './page.module.css';

export default function DonateBlood() {
    return (
        <Page contentClassName={styles.donateBlood}>
            <Section
                heading="Donate Blood"
                headingWithBackground
            >
                <p>
                    Every day, people in Nepal need blood to survive—from accident
                    victims to premature babies. Your donation can make that possible.
                    Join a scheduled blood camp or find us at local events.
                    Groups and organizations are welcome—see below for how to get involved.
                </p>
            </Section>
            <Section>
                <TabSection />
            </Section>
        </Page>
    );
}

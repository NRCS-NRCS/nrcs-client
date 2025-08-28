import ImageWrapper from '#components/ImageWrapper';
import Page from '#components/Page';
import Section from '#components/Section';
import adminStructure from '#public/administrative-structure.jpg';
import organizationStructure from '#public/organizational-structure.jpg';

import styles from './page.module.css';

export default function AboutUs() {
    return (
        <Page contentClassName={styles.page}>
            <Section
                heading="Administrative Structure"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <ImageWrapper
                    className={styles.bannerImage}
                    imageClassName={styles.image}
                    src={adminStructure}
                    alt="NRCS Administrative Structure"
                />
            </Section>
            <Section
                heading="Organizational Structure"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <ImageWrapper
                    className={styles.bannerImage}
                    imageClassName={styles.image}
                    src={organizationStructure}
                    alt="NRCS Organizaitonal Structure"
                />
            </Section>
        </Page>
    );
}

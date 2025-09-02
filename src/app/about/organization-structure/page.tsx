import ArticleBody from '#components/ArticleBody';
import ImageWrapper from '#components/ImageWrapper';
import Page from '#components/Page';
import Section from '#components/Section';
import adminStructure from '#public/administrative-structure.jpg';
import organizationStructure from '#public/organizational-structure.jpg';

import styles from './page.module.css';

const ceoContent = `## Central Executive Committee
Nepal Red Cross Society (NRCS) is led by a Central Executive Committee (CEC).

Government of Nepal has formed a 9-member Ad hoc Central Executive Committee (CEC) dated 9 Shrawan 2082. The name list of the committee with designation is as follows:

|                          |                                 |
|--------------------------|---------------------------------|
| **Chairman**             | **Members**                     |
| Mr. Binod Kumar Sharma   | Prof. Dr. Hari Darshan Shrestha |
| **Vice Chairman**        | Ms. Surya Kumari Shrestha       |
| Mr. Hari Baral           | Ms. Kanti Rajbhandari           |
| **Secretary General**    | Dr. Gangadhar Adhikari          |
| Mr. Min Bahadur Malla    | Mr. Hem Raj Ojha                |
| **Treasurer General**    |                                 |
| Mr. Lok Darshan Shrestha |                                 |
| **Governance Secretariat** |                               |
| Mr. Sakun Kumar Joshi    |                                 |
| sakun.joshi@nrcs.org     |                                 |
`;

export default function AboutUs() {
    return (
        <Page contentClassName={styles.page}>
            <Section>
                <ArticleBody
                    content={ceoContent}
                />
            </Section>
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

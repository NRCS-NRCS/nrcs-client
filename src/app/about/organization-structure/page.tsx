import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Page from '#components/Page';
import Section from '#components/Section';
import adminStructure from '#public/administrative-structure.jpg';
import organizationStructure from '#public/organizational-structure.jpg';

import styles from './page.module.css';

export default function AboutUs() {
    const cecLeader = [
        { title: 'Chairman', name: 'Mr. Binod Kumar Sharma' },
        { title: 'Vice Chairman', name: 'Mr. Hari Baral' },
        { title: 'Secretary General', name: 'Mr. Min Bahadur Malla' },
        { title: 'Treasurer General', name: 'Mr. Lok Darshan Shrestha' },
        { title: 'Governance Secretariat', name: 'Mr. Sakun Kumar Joshi', email: 'sakun.joshi@nrcs.org' },
    ];

    const cecMember = [
        'Prof. Dr. Hari Darshan Shrestha',
        'Ms. Surya Kumari Shrestha',
        'Ms. Kanti Rajbhandari',
        'Dr. Gangadhar Adhikari',
        'Mr. Hem Raj Ojha',
    ];

    const cecDescriptions = 'Nepal Red Cross Society (NRCS) is led by a Central Executive Committee (CEC). \n \n Government of Nepal has formed a 9-member Ad hoc Central Executive Committee (CEC) dated 9 Shrawan 2082. The name list of the committee with designation is as follows:';

    return (
        <Page contentClassName={styles.page}>
            <Section
                heading="Central Executive Committee"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <Heading size="small" font="normal" className={styles.description}>
                    {cecDescriptions}
                </Heading>
                <div className={styles.cecList}>
                    <div className={styles.leadership}>
                        {cecLeader.map((leader) => (
                            <div key={leader.title}>
                                <Heading size="medium" className={styles.title}>
                                    {leader.title}
                                </Heading>
                                <Heading font="normal" size="small" className={styles.leaderName}>
                                    {leader.name}
                                </Heading>
                                {leader.email && (
                                    <Heading font="normal" size="small" className={styles.leaderEmail}>
                                        {leader.email}
                                    </Heading>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.members}>
                        <Heading size="medium" className={styles.title}>
                            Member
                        </Heading>
                        <div className={styles.memberList}>
                            {cecMember.map((member) => (
                                <Heading key={member} font="normal" size="small" className={styles.memberName}>
                                    {member}
                                </Heading>
                            ))}
                        </div>
                    </div>
                </div>
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

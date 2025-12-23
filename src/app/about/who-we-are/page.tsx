import ArticleBody from '#components/ArticleBody';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Page from '#components/Page';
import Section from '#components/Section';
import aboutUsImage from '#public/aboutUs.jpeg';
import bannerImage from '#public/banner.png';

import styles from './page.module.css';

const aboutUsTagline = '"Where there is suffering, there is Red Cross"';
const aboutUsDescription = 'Nepal Red Cross Society (NRCS) came into being in 1963. It was recognized by the International Committee of the Red Cross (ICRC) in 1964 and affiliated to the International Federation of Red Cross and Red Crescent Societies (IFRC) in the same year. NRCS has, over the years, grown to be the largest humanitarian organization in Nepal, with its network of District Chapters (DCs) extended in each of the 77 districts of the country. District Chapters receive organizational support from 1,554 Sub-Chapters and more than 153 Co-operation Committees under them. A significant portion of its activities is also borne by students and youth volunteers of Nepal Junior and Youth Red Cross Circles organized at schools, campuses and communities. At present, NRCS owns 6,538 J/Y Red Cross Circles. ';
const missionHeading = 'Our Mission';
const missionDescription = 'The mission of the Nepal Red Cross is to relieve human suffering and to reduce vulnerability through community participation and mobilization of an increased number of volunteers, by expanding and strengthening the organizational structure of the society and by building links with governmental and non-governmental organizations. ';
const visionHeading = 'Our Vision';
const visionDescription = 'Nepal Red Cross Society shall remain an efficient, self-sustainable, and independent humanitarian organization committed to provide immediate relief to human suffering and reduce vulnerability, under the Fundamental Principles of the Red Cross, through its network of Red Cross workers throughout the country working closely with communities and governmental and non-governmental organizations in a democratic, transparent and participatory way. ';
const objectivesHeading = 'Objectives and Function';
const objectivesDescription = `
With the primary objective of alleviating or reducing human suffering without discrimination on grounds of religion, race, sex, class, caste, tribe, nationality or political belief, the Society shall have the following functions: \n \n
- To serve war-victims, both civilians and army personnel, in times of armed conflict, and to work in the fields identified by the Geneva Conventions, including Tracing, in times of peace.
- To contribute to promoting and improving health conditions, preventing diseases and reducing suffering.
- To arrange for emergency relief services for disaster victims.
- To organize Junior and Youth Red Cross as an integral part of Nepal Red Cross Society and to conduct activities promoting their participation.
- To promote the Fundamental Principles of the Red Cross Movement and International Humanitarian Law with the objective of developing humanitarian ideals.
- To ensure respect for the International Humanitarian Law and protection of the Red Cross Emblem.
- To perform other functions of community development and public welfare.
`;

export default function AboutUs() {
    return (
        <Page contentClassName={styles.page}>
            <Section
                heading={aboutUsTagline}
                childrenContainerClassName={styles.aboutContent}
            >
                <ArticleBody content={aboutUsDescription} />
            </Section>
            <Section
                className={styles.mission}
                contentClassName={styles.missionContent}
                childrenContainerClassName={styles.missionChildren}
            >
                <ImageWrapper
                    className={styles.bannerImage}
                    imageClassName={styles.image}
                    src={bannerImage}
                    alt="Banner Image"
                />
                <div className={styles.description}>
                    <Heading
                        className={styles.heading}
                        withBackground
                        size="extraLarge"
                    >
                        {missionHeading}
                    </Heading>
                    <ArticleBody content={missionDescription} />
                </div>
            </Section>
            <Section
                className={styles.mission}
                contentClassName={styles.missionContent}
                childrenContainerClassName={styles.missionChildren}
            >
                <div className={styles.description}>
                    <Heading
                        className={styles.heading}
                        withBackground
                        size="extraLarge"
                    >
                        {visionHeading}
                    </Heading>
                    <ArticleBody content={visionDescription} />
                </div>
                <ImageWrapper
                    className={styles.aboutImageContainer}
                    imageClassName={styles.aboutImage}
                    src={aboutUsImage}
                    alt="Banner Image"
                />
            </Section>
            <Section
                heading={objectivesHeading}
                headingWithBackground
                className={styles.objectives}
                contentClassName={styles.objectivesContent}
                childrenContainerClassName={styles.objectivesChildren}
            >
                { /* TODO: Turn this description to icon and description format */}
                <ArticleBody content={objectivesDescription} />
            </Section>
        </Page>
    );
}

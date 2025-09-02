import React from 'react';

import CallToAction from '#components/CallToAction';
import ImageSlider from '#components/ImageSlider';
import KeyFigureCard from '#components/KeyFigureCard';
import Page from '#components/Page';
import RecentNewsCard from '#components/RecentNewsCard';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import {
    type HomePageQuery,
    type HomePageQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';
import callIcon from '#public/call.png';
import cardImage from '#public/card.png';
import donateIcon from '#public/donate.png';
import handsIcon from '#public/hands.png';
import logo from '#public/logo.png';

import Highlights from './Highlights';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import { HOME_PAGE_DETAILS } from '@/queries';

const introText = 'The Nepal Red Cross Society is the largest humanitarian organization in Nepal, providing life-saving aid, health services, disaster response, and community support through a vast network of volunteers and local branches as part of the global Red Cross and Red Crescent Movement.';
const nrcsPlanDescription = 'The 8th Development Plan 2021–2025 is the road map of Nepal Red Cross Society (NRCS) until 2025. Its key purpose is to reduce uncertainty about our future and develop a shared understanding about our engagement approach with the future. Planning means change, therefore, this plan has been guided by strategies related to innovation to bring changes as well. This plan has tried to respond to these basic questions: who it serves and where? Where are we now? Where do we want to go? How will we get there? What does it do? and How well did we do (monitoring and review) it?';

export default async function Home() {
    const result = await urqlClient.query<
        HomePageQuery,
        HomePageQueryVariables
    >(HOME_PAGE_DETAILS, {}).toPromise();

    const reports = [...result.data?.resources ?? []].slice(0, 3);
    const news = [...result.data?.news ?? []].slice(0, 10);

    return (
        <Page contentClassName={styles.page}>
            <Highlights highlights={result.data?.highlights ?? []} />
            <Section
                className={styles.introduction}
                contentClassName={styles.introductionContent}
            >
                <div className={styles.infoCards}>
                    <KeyFigureCard
                        title="20,000+"
                        description="Volunteers serving communities across Nepal."
                        icon={logo}
                    />
                    <KeyFigureCard
                        title="50,000+"
                        description="Disaster-affected individuals supported annually"
                        icon={logo}
                    />
                    <KeyFigureCard
                        title="100+"
                        description="Blood Donations centers across the country"
                        icon={logo}
                    />
                </div>
                <div className={styles.bottomContent}>
                    <div className={styles.introText}>
                        {introText}
                    </div>
                    <KeyFigureCard
                        className={styles.keyFigureOne}
                        title="20,000+"
                        description="Volunteers serving communities across Nepal."
                        icon={logo}
                        transparent
                    />
                    <KeyFigureCard
                        className={styles.keyFigureTwo}
                        title="20,000+"
                        description="Volunteers serving communities across Nepal."
                        icon={logo}
                        transparent
                    />
                </div>
            </Section>
            {news.length > 0 && (
                <Section
                    heading="Recent News and Events"
                    childrenContainerClassName={styles.recentNewsChildrenContainer}
                    headingWithBackground
                >
                    {news.map((item) => (
                        <RecentNewsCard
                            title={item.title}
                            description={item.content}
                            date={item.publishedDate}
                            image={item.coverImage?.url}
                            link={`/resources/news-and-events/${item.slug}/`}
                        />
                    ))}
                </Section>
            )}
            <Section
                className={styles.callToActions}
                contentClassName={styles.callToActionsContent}
                childrenContainerClassName={styles.callToActionsChildren}
            >
                {/* FIXME: Update icon */}
                <CallToAction
                    title={(
                        <p>
                            Become an
                            &nbsp;
                            <b>NRCS Member</b>
                            &nbsp;
                            and make an impact
                        </p>
                    )}
                    icon={donateIcon}
                    link="/get-involved/member/"
                    linkDescription="Become a member"
                />
                <CallToAction
                    title={(
                        <p>
                            With over
                            &nbsp;
                            <b>1,000+</b>
                            &nbsp;
                            volunteers enrolled
                        </p>
                    )}
                    icon={handsIcon}
                    link="/get-involved/volunteer/"
                    linkDescription="Volunteer with us"
                />
                <CallToAction
                    title={(
                        <p>
                            Donations received for
                            &nbsp;
                            <b>100+ projects</b>
                        </p>
                    )}
                    icon={donateIcon}
                    link="/get-involved/donate/"
                    linkDescription="Donate"
                />
                {/* FIXME: Update link */}
                <CallToAction
                    title={(
                        <p>
                            <b>More than 100</b>
                            &nbsp;
                            organizations reached out
                        </p>
                    )}
                    icon={callIcon}
                    link="/get-involved/donate/"
                    linkDescription="Partner with us"
                />
            </Section>
            <Section
                heading="NRCS Plan for 2025"
                childrenContainerClassName={styles.nrcsPlanChildrenContainer}
                headingWithBackground
            >
                <RecentNewsCard
                    description={nrcsPlanDescription}
                    trimDescription={1000}
                    image={cardImage}
                    linkLabel="Download PDF"
                    link="https://drive.google.com/file/d/1XYPHwa5oMHtpCM0TatQJQcus5FNjG5wU/view"
                />
            </Section>
            <ImageSlider />
            {reports.length > 0 && (
                <Section
                    heading="Published Reports"
                    className={styles.ourWorks}
                    contentClassName={styles.worksContent}
                    childrenContainerClassName={styles.worksChildren}
                    headingWithBackground
                >
                    {reports.map((item) => (
                        <WorkCard
                            title={item.title}
                            date={item.publishedDate}
                            image={item.coverImage?.url}
                            link={`/resources/reports/${item.id}/`}
                        />
                    ))}
                </Section>
            )}
        </Page>
    );
}

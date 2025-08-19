import React from 'react';

import CallToAction from '#components/CallToAction';
import ImageSlider from '#components/ImageSlider';
import ImageWrapper from '#components/ImageWrapper';
import KeyFigureCard from '#components/KeyFigureCard';
import Page from '#components/Page';
import RecentNewsCard from '#components/RecentNewsCard';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import {
    type HighlightsQuery,
    type HighlightsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';
import homeBanner from '#public/banner.png';
import callIcon from '#public/call.png';
import cardImage from '#public/card.png';
import donateIcon from '#public/donate.png';
import handsIcon from '#public/hands.png';
import logo from '#public/logo.png';

import Highlights from './Highlights';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import { HIGHLIGHTS } from '@/queries';

const introText = 'The Nepal Red Cross Society is the largest humanitarian organization in Nepal, providing life-saving aid, health services, disaster response, and community support through a vast network of volunteers and local branches as part of the global Red Cross and Red Crescent Movement.';
const nrcsPlanDescription = 'The 8th Development Plan 2021–2025 is the road map of Nepal Red Cross Society (NRCS) until 2025. Its key purpose is to reduce uncertainty about our future and develop a shared understanding about our engagement approach with the future. Planning means change, therefore, this plan has been guided by strategies related to innovation to bring changes as well. This plan has tried to respond to these basic questions: who it serves and where? Where are we now? Where do we want to go? How will we get there? What does it do? and How well did we do (monitoring and review) it?';

export default async function Home() {
    const result = await urqlClient.query<
        HighlightsQuery,
        HighlightsQueryVariables
    >(HIGHLIGHTS, {}).toPromise();

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
            <Section
                heading="Recent News and Events"
                childrenContainerClassName={styles.recentNewsChildrenContainer}
                headingWithBackground
            >
                <RecentNewsCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    description="The full scale of the devastation caused by the natural disaster is yet to be fully assessed. Tragically, over 250 lives have already been confirmed lost, with rescue operations continuing in an effort to locate the 100 individuals who remain unaccounted for. The impact of this catastrophe is immense, affecting countless families and communities who now face overwhelming challenges in the aftermath."
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
            </Section>
            {/*
            <Section
                heading="Our Presence"
                headingWithBackground
            >
                Here
            </Section>
            */}
            <Section
                heading="Our Works"
                className={styles.ourWorks}
                contentClassName={styles.worksContent}
                childrenContainerClassName={styles.worksChildren}
                headingWithBackground
            >
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
            </Section>
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
            <Section
                heading="Published Reports"
                className={styles.ourWorks}
                contentClassName={styles.worksContent}
                childrenContainerClassName={styles.worksChildren}
                headingWithBackground
            >
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
                <WorkCard
                    title="7.5 magnitude hits Tibet, other parts of Asia affected as well"
                    date="2022-01-01"
                    image={cardImage}
                    link="/news-and-events/"
                />
            </Section>
        </Page>
    );
}

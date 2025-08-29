import React from 'react';

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
import cardImage from '#public/card.png';
import logo from '#public/logo.png';

import Highlights from './Highlights';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import { HIGHLIGHTS } from '@/queries';

const introText = 'The Nepal Red Cross Society is the largest humanitarian organization in Nepal, providing life-saving aid, health services, disaster response, and community support through a vast network of volunteers and local branches as part of the global Red Cross and Red Crescent Movement.';

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
        </Page>
    );
}

import React from 'react';

import CallToAction from '#components/CallToAction';
import Heading from '#components/Heading';
import ImageSlider from '#components/ImageSlider';
import ImageWrapper from '#components/ImageWrapper';
import KeyFigureCard from '#components/KeyFigureCard';
import Link from '#components/Link';
import Page from '#components/Page';
import Partners from '#components/Partners';
import RecentNews from '#components/RecentNews';
import RecentNewsCard from '#components/RecentNewsCard';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import callIcon from '#public/call.png';
import cardImage from '#public/card.png';
import defaultImage from '#public/defaultImage.png';
import donateIcon from '#public/donate.png';
import handsIcon from '#public/hands.png';
import logo from '#public/logo.png';
import profileImage from '#public/Mr.bipulneupane.jpg';

import Highlights from './Highlights';
import RadioPrograms from './RadioPrograms';

import styles from './page.module.css';

const introText = 'The Nepal Red Cross Society is the largest humanitarian organization in Nepal, providing life-saving aid, health services, disaster response, and community support through a vast network of volunteers and local branches as part of the global Red Cross and Red Crescent Movement.';
const nrcsPlanDescription = 'The 8th Development Plan 2021–2025 is the road map of Nepal Red Cross Society (NRCS) until 2025. Its key purpose is to reduce uncertainty about our future and develop a shared understanding about our engagement approach with the future. Planning means change, therefore, this plan has been guided by strategies related to innovation to bring changes as well. This plan has tried to respond to these basic questions: who it serves and where? Where are we now? Where do we want to go? How will we get there? What does it do? and How well did we do (monitoring and review) it?';
const nrcsOfficerName = 'Mr. Bipul Neupane';
const nrcsOfficerTitleOne = 'Director, HV and Communication';
const nrcsOfficerTitleTwo = 'Information Officer';
const nrcsOfficerContactNumber = '+977 9741695097';
const nrcsOfficerEmail = 'bipul.neupane@nrcs.org';

type HighlightsType = NonNullable<NonNullable<AllQueryQuery['highlights']>['results']>;
type ResourceType = NonNullable<NonNullable<AllQueryQuery['resources']>['results']>;
type RadioType = NonNullable<NonNullable<AllQueryQuery['radioProgram']>['results']>;

export default async function Home() {
    const radioPrograms = allData.radioProgram.results as unknown as RadioType;

    const allResources = allData?.resources.results as unknown as ResourceType;
    const allHighlights = allData?.highlights.results as unknown as HighlightsType;

    const allReports = [
        ...(allResources.filter((data) => data.type === 'REPORT') ?? []),
    ] as unknown as ResourceType;

    const reports = allReports.slice(0, 4) || [];

    const highlights = allHighlights.filter(
        (data) => data?.isActive,
    );

    return (
        <Page contentClassName={styles.page}>
            <Highlights highlights={highlights ?? []} />
            <Section
                className={styles.introduction}
                contentClassName={styles.introductionContent}
            >
                <div className={styles.introText}>{introText}</div>
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
                {/* <div className={styles.bottomContent}>
                    <div className={styles.introText}>{introText}</div>
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
                </div> */}
            </Section>
            <RecentNews />
            <Section
                className={styles.callToActions}
                contentClassName={styles.callToActionsContent}
                childrenContainerClassName={styles.callToActionsChildren}
            >
                {/* FIXME: Update icon */}
                <CallToAction
                    title={(
                        <p>
                            Become an &nbsp;
                            <b>NRCS Member</b>
                            &nbsp; and make an impact
                        </p>
                    )}
                    icon={donateIcon}
                    link="/get-involved/member/"
                    linkDescription="Become a member"
                />
                <CallToAction
                    title={(
                        <p>
                            With over &nbsp;
                            <b>1,000+</b>
                            &nbsp; volunteers enrolled
                        </p>
                    )}
                    icon={handsIcon}
                    link="/get-involved/volunteer/"
                    linkDescription="Volunteer with us"
                />
                <CallToAction
                    title={(
                        <p>
                            Donations received for &nbsp;
                            <b>100+ projects</b>
                        </p>
                    )}
                    icon={donateIcon}
                    link="https://donation.nrcs.org/"
                    linkDescription="Donate"
                    isExternalLink
                />
                <CallToAction
                    title={(
                        <p>
                            <b>More than 100</b>
                            &nbsp; organizations reached out
                        </p>
                    )}
                    icon={callIcon}
                    link="/contact/"
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
                    <div className={styles.reports}>
                        {reports.map((item) => (
                            <WorkCard
                                key={item.id}
                                title={item.title}
                                date={item.publishedDate}
                                image={item.coverImage?.url ?? defaultImage}
                                link={`/resources/reports/${item.slug}/`}
                            />
                        ))}
                        {allReports.length > 4 && (
                            <Link href="/resources/reports/" variant="buttonTransparent" className={styles.seeAllLink}>See All</Link>
                        )}
                    </div>
                </Section>
            )}
            <Section
                className={styles.nrcsOfficer}
                contentClassName={styles.nrcsOfficerContent}
                childrenContainerClassName={styles.nrcsOfficerChildren}
            >
                <div className={styles.officerCard}>
                    <ImageWrapper
                        className={styles.profileImage}
                        src={profileImage}
                        alt="NRCS IM Officer"
                    />
                    <div className={styles.description}>
                        <Heading size="small">{nrcsOfficerName}</Heading>
                        <div className={styles.title}>
                            <span>{nrcsOfficerTitleOne}</span>
                            <span>{nrcsOfficerTitleTwo}</span>
                        </div>
                        <Link
                            className={styles.contactLink}
                            href={`tel:${nrcsOfficerContactNumber}`}
                        >
                            {nrcsOfficerContactNumber}
                        </Link>
                        <Link
                            className={styles.contactLink}
                            href={`mailto:${nrcsOfficerEmail}`}
                            target="_blank"
                        >
                            {nrcsOfficerEmail}
                        </Link>
                    </div>
                </div>
                <div className={styles.radioProgram}>
                    <Heading size="large">Radio Programs</Heading>
                    <RadioPrograms radioPrograms={radioPrograms ?? []} />
                </div>
            </Section>
            <Partners />
        </Page>
    );
}

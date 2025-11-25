import React, { Fragment } from 'react';
import { isDefined } from '@togglecorp/fujs';

import ArticleCard from '#components/ArticleCard';
import AudioPlayer from '#components/AudioPlayer';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type NewsListQuery,
    type NewsListQueryVariables,
    type RadioProgramsQuery,
    type RadioProgramsQueryVariables,
} from '#generated/types/graphql';

// eslint-disable-next-line import/order
import styles from './page.module.css';

import { urqlClient } from '@/lib/urqlClient';
import {
    NEWS_LIST,
    RADIO_PROGRAMS,
} from '@/queries';

export default async function RadioPrograms() {
    const result = await urqlClient
        .query<RadioProgramsQuery, RadioProgramsQueryVariables>(RADIO_PROGRAMS, {})
        .toPromise();

    const newsAndEvents = await urqlClient
        .query<NewsListQuery, NewsListQueryVariables>(NEWS_LIST, {})
        .toPromise();

    const newsList = newsAndEvents?.data?.news ?? [];

    const radioProgramData: RadioProgramsQuery['radioProgram'] = result?.data?.radioProgram ?? [];

    const radioProgramDescriptions = 'Weekly radio programs run by NRCS speak on current events in an interesting and easy-to-understand way. You will hear the latest on the daily risks, good practices, household skills, Red Cross news and experiences from different communities all around Nepal.\n \n Radio episodes reach thousands of people throughout the country.';

    return (
        <Page>
            <Section
                heading="Radio Programs"
                headingWithBackground
                childrenContainerClassName={styles.pageContent}
            >
                <div className={styles.radioProgramsSection}>
                    <Heading size="extraSmall" font="normal" className={styles.radioProgramDescriptions}>{radioProgramDescriptions}</Heading>
                    <div className={styles.radioProgramsList}>
                        {radioProgramData.map((item) => (
                            <Fragment key={item.id}>
                                {isDefined(item.audioFile)
                                 && <AudioPlayer radioProgram={item} showDate withBackground />}
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className={styles.latestPostsSection}>
                    <div className={styles.latestPostsHeader}>
                        <Heading size="medium">
                            Latest posts
                        </Heading>
                        <Link href="/resources/news-and-events" variant="button">
                            See All
                        </Link>
                    </div>
                    {newsList.map((news) => (
                        <ArticleCard
                            key={news.id}
                            imageSrc={news.coverImage?.url ?? ''}
                            imageAlt={news.title}
                            heading={news.title}
                            author={news.title}
                            description={news.content}
                            date={news.publishedDate}
                            isSmall
                            link={`/resources/news-and-events/${news.id}`}
                        />
                    ))}
                </div>
            </Section>
        </Page>
    );
}

import React, { Fragment } from 'react';
import { isDefined } from '@togglecorp/fujs';

import AudioPlayer from '#components/AudioPlayer';
import EmptyMessage from '#components/EmptyMessage';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type RadioProgramsQuery,
    type RadioProgramsQueryVariables,
} from '#generated/types/graphql';

// eslint-disable-next-line import/order
import styles from './page.module.css';

import { urqlClient } from '@/lib/urqlClient';
import { RADIO_PROGRAMS } from '@/queries';

export default async function RadioPrograms() {
    const result = await urqlClient
        .query<RadioProgramsQuery, RadioProgramsQueryVariables>(RADIO_PROGRAMS, {})
        .toPromise();

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
                    <Heading
                        size="extraSmall"
                        font="normal"
                        className={styles.radioProgramDescriptions}
                    >
                        {radioProgramDescriptions}
                    </Heading>
                    <div className={styles.radioProgramsList}>
                        {radioProgramData.length <= 0 ? (
                            <EmptyMessage
                                message="No radio programs available"
                            />
                        ) : radioProgramData.map((item) => (
                            <Fragment key={item.id}>
                                {isDefined(item.audioFile) && (
                                    <AudioPlayer
                                        radioProgram={item}
                                        showDate
                                        withBackground
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Section>
        </Page>
    );
}

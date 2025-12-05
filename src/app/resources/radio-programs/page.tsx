import React from 'react';
import { isDefined } from '@togglecorp/fujs';

import AudioPlayer from '#components/AudioPlayer';
import EmptyMessage from '#components/EmptyMessage';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import AllData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type RadioType = NonNullable<AllQueryQuery['radioProgram']>

export default async function RadioPrograms() {
    const radioProgramData = AllData.radioProgram as unknown as RadioType;
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
                            isDefined(item.audioFile) && (
                                <AudioPlayer
                                    key={item.id}
                                    radioProgram={item}
                                    showDate
                                    withBackground
                                />
                            )

                        ))}
                    </div>
                </div>
            </Section>
        </Page>
    );
}

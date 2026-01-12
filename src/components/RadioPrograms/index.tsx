'use client';

import { useState } from 'react';
import {
    compareDate,
    isDefined,
} from '@togglecorp/fujs';

import AudioPlayer from '#components/AudioPlayer';
import EmptyMessage from '#components/EmptyMessage';
import {
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '#components/Tabs';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

type RadioType = NonNullable<AllQueryQuery['radioProgram']['results'][number]>

interface Props {
    radioPrograms: RadioType[];
}

export default function RadioPrograms(props: Props) {
    const {
        radioPrograms,
    } = props;

    const [value, setValue] = useState<string | undefined>('radio-red-cross');
    const radioRedCrossList = radioPrograms
        .filter((item) => item.type === 'RADIO_RED_CROSS')
        .sort(
            (a, b) => compareDate(b.publishedDate, a.publishedDate),
        )
        .slice(0, 2);
    const togetherForHumanityList = radioPrograms
        .filter((item) => item.type === 'TOGETHER_FOR_HUMANITY')
        .sort(
            (a, b) => compareDate(b.publishedDate, a.publishedDate),
        ).slice(0, 2);
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab
                    className={styles.tab}
                    name="radio-red-cross"
                >
                    Radio Red Cross
                </Tab>
                <Tab
                    className={styles.tab}
                    name="together-for-humanity"
                >
                    Together For Humanity
                </Tab>
            </TabList>
            <TabPanel
                className={styles.tabPanel}
                name="radio-red-cross"
            >
                {radioRedCrossList.length <= 0 ? (
                    <EmptyMessage
                        message="No radio programs available"
                    />
                ) : radioRedCrossList.map((item) => (
                    isDefined(item.audioFile)
                    && <AudioPlayer key={item.id} radioProgram={item} showDate={false} />
                ))}

            </TabPanel>
            <TabPanel
                className={styles.tabPanel}
                name="together-for-humanity"
            >
                {togetherForHumanityList.length <= 0 ? (
                    <EmptyMessage
                        message="No radio programs available"
                    />
                ) : togetherForHumanityList.map((item) => (
                    isDefined(item.audioFile)
                    && <AudioPlayer key={item.id} radioProgram={item} showDate={false} />
                ))}
            </TabPanel>
        </Tabs>
    );
}

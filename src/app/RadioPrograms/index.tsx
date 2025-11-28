'use client';

import {
    Fragment,
    useState,
} from 'react';
import { isDefined } from '@togglecorp/fujs';

import AudioPlayer from '#components/AudioPlayer';
import EmptyMessage from '#components/EmptyMessage';
import {
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '#components/Tabs';
import { type RadioProgramsQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

type RadioProgram = NonNullable<NonNullable<RadioProgramsQuery['radioProgram']>[number]>;

interface Props {
    radioPrograms: RadioProgram[];
}

export default function RadioPrograms(props: Props) {
    const {
        radioPrograms,
    } = props;

    const [value, setValue] = useState<string | undefined>('tuesday-programs');
    const tuesdayProgramsList = radioPrograms.filter((item) => item.type === 'TUESDAY_PROGRAM').slice(0, 2);
    const togetherForHumanityList = radioPrograms.filter((item) => item.type === 'TOGETHER_FOR_HUMANITY').slice(0, 2);
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab
                    className={styles.tab}
                    name="tuesday-programs"
                >
                    Tuesday Programs
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
                name="tuesday-programs"
            >
                <div className={styles.content}>
                    {tuesdayProgramsList.length <= 0 ? (
                        <EmptyMessage
                            message="No radio programs available"
                        />
                    ) : tuesdayProgramsList.map((item) => (
                        <Fragment key={item.id}>
                            {isDefined(item.audioFile)
                            && <AudioPlayer radioProgram={item} showDate={false} />}
                        </Fragment>
                    ))}
                </div>
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
                    <Fragment key={item.id}>
                        {isDefined(item.audioFile)
                         && <AudioPlayer radioProgram={item} showDate={false} />}
                    </Fragment>
                ))}
            </TabPanel>
        </Tabs>
    );
}

'use client';

import { useState } from 'react';
import { isDefined } from '@togglecorp/fujs';

import AudioPlayer from '#components/AudioPlayer';
import Heading from '#components/Heading';
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
                    <Heading>
                        Tuesday
                    </Heading>
                </div>
            </TabPanel>
            <TabPanel
                className={styles.tabPanel}
                name="together-for-humanity"
            >
                <Heading>
                    Donating person has to apply:
                </Heading>
                {isDefined(radioPrograms) && (
                    <AudioPlayer radioProgram={radioPrograms[0]} />
                )}
            </TabPanel>
        </Tabs>
    );
}

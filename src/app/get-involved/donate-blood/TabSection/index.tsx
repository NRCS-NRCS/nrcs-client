'use client';

import { useState } from 'react';

import Accordion from '#components/Accordion';
import Heading from '#components/Heading';
import {
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '#components/Tabs';

import whereToDonate from './data';

import styles from './styles.module.css';

export default function TabSection() {
    const [value, setValue] = useState<string | undefined>('where');
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab name="where">
                    Where to donate?
                </Tab>
                <Tab name="can">
                    Can i donate?
                </Tab>
                <Tab name="organisation">
                    Donate blood as an organisation
                </Tab>
            </TabList>

            <TabPanel className={styles.tabPanel} name="where">
                <div className={styles.content}>
                    <Heading>
                        For blood donations inside Kathmandu Valley
                    </Heading>
                    <p>
                        Emergency blood service is open 24/7 at NRCS
                        Central Blood Bank, Soalteemod, Kathmandu.
                    </p>
                    <Accordion
                        items={whereToDonate}
                        allowMultipleExpansion
                    />
                </div>
                <div className={styles.content}>
                    <Heading>
                        For blood donations Outside Kathmandu Valley
                    </Heading>
                    <p>
                        To donate outside Kathmandu Valley, please
                        contact one of the Regional Blood Transfusion
                        Centres in Biratnagar, Pokhara, Nepalgunj,
                        and Chitwan, or the nearest District Blood Bank or Hospital unit.
                    </p>
                </div>
            </TabPanel>
            <TabPanel className={styles.tabPanel} name="can">
                <Heading>
                    Donating person has to apply:
                </Heading>
                <p>
                    - be 18 to 60 years old
                    - weight above 45 kg
                    - have hemoglobin above 12 gm/dl
                    - have blood pressure 110-160 / 70-96 mmHg
                    - not to be pregnant, breastfeeding, and have at least
                    8 days since the start of the recent menstruation
                    - not having recent use of drugs or strong medicines
                    (people who take strong medicine for a short period will
                    not able to donate blood from one week up to 2 years)
                    - not to had a medical surgery for 2 years
                    If you have had one of these conditions, you are
                    unfortunately restricted to donating blood but
                    recommended to encourage your family members, friends and loved ones to donate:
                    - cancer, heart diseases, HIV/AIDS, hepatitis B or C,
                    hemophilia and thalassemia, diabetes, liver diseases,
                    Polycythemia Vera, asthma, an endocrine disorder or a hormonal disorder
                </p>
            </TabPanel>
            <TabPanel className={styles.tabPanel} name="organisation">
                <Heading>
                    Donation event for an organization or company
                </Heading>
                <p>
                    - We are visiting daily in companies and organizations to collect blood.
                    It is a great activity for team building and recreational days,
                    and social responsibility events.
                    - Arrange a regular or one-time blood donation at your company or
                    organization by contacting Mr. Ram Bahadur Shrestha via email,
                    ram.shrestha@nrcs.org, or phone, 9841398605.
                    - The earlier we set the date, the easier we can plan the
                    efficient blood supply management. But if needed, we can
                    deploy our blood collection team with even short notice!
                    Never think it is too late or too early – today is just
                    the perfect time to start planning the blood donation event in
                    your community or company!
                </p>
            </TabPanel>
        </Tabs>
    );
}

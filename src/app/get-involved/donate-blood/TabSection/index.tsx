'use client';

import { useState } from 'react';
import { isDefined } from '@togglecorp/fujs';

import Accordion from '#components/Accordion';
import Heading from '#components/Heading';
import {
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '#components/Tabs';
import WhereToDonateCard from '#components/WhereToDonateCard';

import whereToDonate from './data';

import styles from './styles.module.css';

export default function TabSection() {
    const [value, setValue] = useState<string | undefined>('where-to-donate');
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab name="where-to-donate" className={styles.tab}>
                    Where to donate?
                </Tab>
                <Tab name="can-i-donate" className={styles.tab}>
                    Can i donate?
                </Tab>
                <Tab name="donate-blood-organization" className={styles.tab}>
                    Donate blood as an organisation
                </Tab>
            </TabList>

            <TabPanel className={styles.tabPanel} name="where-to-donate">
                <div className={styles.content}>
                    <Heading>
                        For blood donations inside Kathmandu Valley
                    </Heading>
                    <p>
                        Emergency blood service is open 24/7 at NRCS
                        Central Blood Bank, Soalteemod, Kathmandu.
                    </p>
                    <Accordion
                        items={whereToDonate.map((item) => ({
                            id: item.id,
                            title: item.title,
                            description: isDefined(item.description)
                                ? <WhereToDonateCard whereToDonateItems={item.description} />
                                : undefined,
                        }))}
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
            <TabPanel className={styles.tabPanel} name="can-i-donate">
                <Heading>
                    Donating person has to apply:
                </Heading>
                <ul className={styles.list}>
                    <li>Be 18 to 60 years old</li>
                    <li>Weight above 45 kg</li>
                    <li>Have hemoglobin above 12 gm/dl</li>
                    <li>Have blood pressure 110-160 / 70-96 mmHg</li>
                    <li>
                        Not to be pregnant, breastfeeding, and
                        have at least 8 days since the start of the recent menstruation
                    </li>
                    <li>
                        Not having recent use of drugs or strong medicines
                        (people who take strong medicine for a short period
                        will not able to donate blood from one week up to 2 years)
                    </li>
                    <li>Not to had a medical surgery for 2 years</li>
                    <strong>
                        If you have had one of these conditions, you are unfortunately restricted
                        to donating blood but recommended to encourage your
                        family members, friends and loved ones to donate
                    </strong>
                    <li>
                        Cancer, heart diseases, HIV/AIDS, hepatitis B or C, hemophilia and
                        thalassemia, diabetes, liver diseases, Polycythemia Vera, asthma, an
                        endocrine disorder or a hormonal disorder,
                    </li>
                </ul>
            </TabPanel>
            <TabPanel className={styles.tabPanel} name="donate-blood-organization">
                <Heading>
                    Donation event for an organization or company
                </Heading>
                <ul className={styles.list}>
                    <li>
                        We are visiting daily in companies and organizations
                        to collect blood.It is a great activity for team building and
                        recreational days,and social responsibility events.
                    </li>
                    <li>
                        Arrange a regular or one-time blood donation at your company or
                        organization by contacting Mr. Ram Bahadur Shrestha via email,
                        ram.shrestha@nrcs.org, or phone, 9841398605.
                    </li>

                    <li>
                        The earlier we set the date, the easier we can plan the efficient
                        blood supply management. But if needed, we can deploy our blood
                        collection team with even short notice! Never think it is too late
                        or too early – today is just the perfect time to start planning
                        the blood donation event in your community or company!
                    </li>

                </ul>
            </TabPanel>
        </Tabs>
    );
}

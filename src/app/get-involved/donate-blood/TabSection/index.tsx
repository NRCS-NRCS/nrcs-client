'use client';

import { useState } from 'react';

import Accordion from '#components/Accordion';
import ArticleBody from '#components/ArticleBody';
import Heading from '#components/Heading';
import Table, { type Column } from '#components/Table';
import {
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '#components/Tabs';

import whereToDonate, {
    canIDonate,
    donateBloodOrganization,
    type OutsideValleyTable,
    outsideValleyTable,
} from './data';

import styles from './styles.module.css';

export default function TabSection() {
    const [value, setValue] = useState<string | undefined>('where');

    const column: Column<OutsideValleyTable>[] = [
        {
            id: 'bloodCenter',
            title: 'Blood Center',
            cellRenderer: (item) => item.bloodCenter,
        },
        {
            id: 'focalPerson',
            title: 'Focal Person',
            cellRenderer: (item) => item.focalPerson,
        },
        {
            id: 'contactNo',
            title: 'Contact',
            cellRenderer: (item) => item.contactNo,
        },
        {
            id: 'district',
            title: 'District',
            cellRenderer: (item) => item.district,
        },
    ];

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
                    <Table
                        data={outsideValleyTable}
                        columns={column}
                        keySelector={(item) => item.id}
                    />
                </div>
            </TabPanel>
            <TabPanel className={styles.tabPanel} name="can">
                <ArticleBody
                    content={canIDonate}
                />
            </TabPanel>
            <TabPanel className={styles.tabPanel} name="organisation">
                <ArticleBody
                    content={donateBloodOrganization}
                />
            </TabPanel>
        </Tabs>
    );
}

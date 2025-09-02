import React from 'react';

import Page from '#components/Page';

import ChaptersTable from './chaptersTable';

import styles from './page.module.css';

export default function OurPresence() {
    return (
        <Page contentClassName={styles.districtChapterOne}>
            <ChaptersTable />
        </Page>
    );
}

'use client';

import React from 'react';

import Page from '#components/Page';
import SearchableTable from '#components/SearchTableInput/page';
import Section from '#components/Section';

import districtData from './district.json';
import eyeHospitalData from './eyeHospital.json';
import provinceData from './province.json';
import styles from './page.module.css';

interface ChapterRow {
    sN: string;
    name: string;
    province?: string;
    district?: string;
    localLevel?: string;
    wardNo?: string;
    otherAddress?: string;
    phone?: string;
    email?: string;
}

const keySelector = (item: ChapterRow) => item.sN;

function mapData(data: Record<string, string>[]): ChapterRow[] {
    return data.map((item) => ({
        sN: item['S.N'] || '-',
        name: item.Name || '-',
        province: item.Province || '-',
        district: item.District || '-',
        localLevel: item['Local Level'] || '-',
        wardNo: item['Ward No.'] || '-',
        otherAddress: item['Other Address'] || '-',
        phone: item.Phone || '-',
        email: item.Email || '-',
    }));
}

const chapterColumns: { key: keyof ChapterRow; label: string }[] = [
    { key: 'sN', label: 'S.N' },
    { key: 'name', label: 'Name' },
    { key: 'province', label: 'Province' },
    { key: 'district', label: 'District' },
    { key: 'localLevel', label: 'Address' },
    // { key: 'wardNo', label: 'Ward No.' },
    // { key: 'otherAddress', label: 'Other Address' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
];

export default function OurPresence() {
    const provinceChapters = mapData(provinceData);
    const districtChapters = mapData(districtData);
    const eyeHospital = mapData(eyeHospitalData);

    return (
        <Page contentClassName={styles.districtChapterOne}>
            <Section
                heading="Our Presence"
                headingWithBackground
                skipAnimation
            >
                <SearchableTable
                    title="Province Chapters"
                    data={provinceChapters}
                    columns={chapterColumns}
                    keySelector={keySelector}
                    searchField="province"
                />
            </Section>
            <Section
                skipAnimation
            >
                <SearchableTable
                    title="District Chapters"
                    data={districtChapters}
                    columns={chapterColumns}
                    keySelector={keySelector}
                    searchField="district"
                />
            </Section>
            <Section
                skipAnimation
            >
                <SearchableTable
                    title="Eye Hospital"
                    data={eyeHospital}
                    columns={chapterColumns}
                    keySelector={keySelector}
                />
            </Section>
        </Page>
    );
}

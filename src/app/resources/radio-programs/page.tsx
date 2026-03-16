'use client';

import React, {
    Suspense,
    useMemo,
    useState,
} from 'react';
import { isDefined } from '@togglecorp/fujs';
import { useSearchParams } from 'next/navigation';

import AudioPlayer from '#components/AudioPlayer';
import EmptyMessage from '#components/EmptyMessage';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import useDebouncedValue from '#hooks/useDebouncedValue';
import paginate from '#lib/paginate';

import styles from './page.module.css';

type RadioType = NonNullable<AllQueryQuery['radioProgram']>

function RadioProgramsPage() {
    const [search, setSearch] = useState<string>('');
    const debouncedSearchText = useDebouncedValue(search);
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;

    const radioProgramData = useMemo(
        () => (allData.resources as unknown as RadioType)
            .filter((radio) => radio.title?.toLowerCase()
                .includes(debouncedSearchText.toLowerCase())),
        [debouncedSearchText],
    );
    const paginateData = paginate(
        radioProgramData,
        Number(currentPage),
        pageSize,
    ) as unknown as RadioType;

    const radioProgramDescriptions = 'Weekly radio programs run by NRCS speak on current events in an interesting and easy-to-understand way. You will hear the latest on the daily risks, good practices, household skills, Red Cross news and experiences from different communities all around Nepal.\n \n Radio episodes reach thousands of people throughout the country.';

    return (
        <Page>
            <Section
                heading="Radio Programs"
                headingWithBackground
                childrenContainerClassName={styles.pageContent}
                searchField="title"
                searchValue={search}
                handleSearchChange={setSearch}
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
                        {paginateData.length <= 0 ? (
                            <EmptyMessage
                                message="No radio programs available"
                            />
                        ) : paginateData.map((item) => (
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
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={radioProgramData.length}
                    search={debouncedSearchText}
                />
            </Section>
        </Page>
    );
}

export default function RadioPrograms() {
    return (
        <Suspense>
            <RadioProgramsPage />
        </Suspense>
    );
}

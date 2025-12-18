'use client';

import React, { Suspense } from 'react';
import { isDefined } from '@togglecorp/fujs';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import cardImage from '#public/card.png';

import Pager from '@/components/Pager';
import paginate from '@/lib/paginate';

type ReportType = NonNullable<NonNullable<AllQueryQuery['resources']>>;

function ReportsPage() {
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;
    const allResources = allData.resources as unknown as ReportType;
    const reportData = allResources.filter((res) => res.type === 'REPORT');
    const paginateData = paginate(
        reportData,
        Number(currentPage),
        pageSize,
    );
    return (
        <Page>
            <Section
                heading="Published Reports"
                headingWithBackground
            >
                {(isDefined(reportData) && reportData.length <= 0) ? (
                    <EmptyMessage
                        message="No published reports available"
                    />
                ) : paginateData?.map((report) => (
                    <ArticleCard
                        key={report.id}
                        imageSrc={report.coverImage?.url ?? cardImage}
                        imageAlt={report.title}
                        heading={report.title}
                        description={report.content}
                        date={report.publishedDate}
                        link={report.slug}
                    />
                ))}
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={reportData.length}
                />
            </Section>
        </Page>
    );
}

export default function Reports() {
    return (
        <Suspense>
            <ReportsPage />
        </Suspense>
    );
}

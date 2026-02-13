'use client';

import React, { Suspense } from 'react';
import { isDefined } from '@togglecorp/fujs';
import { useSearchParams } from 'next/navigation';

import ArticleCard from '#components/ArticleCard';
import EmptyMessage from '#components/EmptyMessage';
import Page from '#components/Page';
import Pager from '#components/Pager';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';
import paginate from '#lib/paginate';
import defaultImage from '#public/defaultImage.png';

type ReportType = NonNullable<NonNullable<AllQueryQuery['resources']>['results']>;

function PoliciesAndGuidelinesPage() {
    const searchParams = useSearchParams();
    const page = searchParams?.get('page');
    const currentPage = page ?? 1;
    const pageSize = 5;
    const allResources = allData.resources.results as unknown as ReportType;
    const policyData = allResources.filter((res) => res.type === 'POLICY_AND_GUIDELINES');

    const paginateData = paginate(
        policyData,
        Number(currentPage),
        pageSize,
    );
    return (
        <Page>
            <Section
                heading="Policies and Guidelines"
                headingWithBackground
            >
                {(isDefined(policyData) && policyData.length <= 0) ? (
                    <EmptyMessage
                        message="No resources found"
                    />
                ) : paginateData?.map((policy) => (
                    <ArticleCard
                        key={policy.id}
                        imageSrc={policy.coverImage?.url ?? defaultImage}
                        imageAlt={policy.title}
                        heading={policy.title}
                        description={policy.content}
                        date={policy.publishedDate}
                        link={policy.slug}
                    />
                ))}
                <Pager
                    maxItemsPerPage={pageSize}
                    itemsCount={policyData.length}
                />
            </Section>
        </Page>
    );
}

export default function PoliciesAndGuidelines() {
    return (
        <Suspense>
            <PoliciesAndGuidelinesPage />
        </Suspense>
    );
}

import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type ProcurementsType = NonNullable<NonNullable<AllQueryQuery['procurements']>['results']>;

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
    const data = allData.procurements.results as unknown as ProcurementsType;

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [{ id: 'dummy' }];
    }

    return data?.map((d: { id: string }) => ({
        id: d.id,
    }));
}

export default async function ProcurementDetailPage(
    { params }: { params: Promise<{ id: string }> },
) {
    const {
        id,
    } = await params;
    const allProcurements = allData.procurements.results as unknown as ProcurementsType;

    const procurementDetails = allProcurements.find(
        (data) => data.id === id,
    ) as unknown as ProcurementsType[number];

    if (!procurementDetails) {
        // eslint-disable-next-line no-console
        console.warn('No procurement found in GraphQL response');
        return notFound();
    }

    return (
        <Page contentClassName={styles.procurementDetails}>
            <Section
                heading={procurementDetails?.title}
            >
                <Heading
                    className={styles.heading}
                    size="small"
                    font="normal"
                >
                    Published on &nbsp;
                    {procurementDetails?.publishedDate}
                </Heading>
            </Section>
            <Section>
                <ArticleBody
                    content={procurementDetails?.description}
                />
                {isDefined(procurementDetails.file) && (
                    <DownloadTemplate
                        title={procurementDetails.title}
                        file={procurementDetails.file.url}
                        fileSize={procurementDetails.file.size}
                        isExternalLink
                    />
                )}
            </Section>
        </Page>
    );
}

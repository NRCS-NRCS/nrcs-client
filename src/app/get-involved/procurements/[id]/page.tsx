import { notFound } from 'next/navigation';

import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';
import {
    type ProcurementQuery,
    type ProcurementQueryVariables,
    type ProcurementsQuery,
    type ProcurementsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    PROCUREMENT,
    PROCUREMENTS,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        ProcurementsQuery,
        ProcurementsQueryVariables
    >(PROCUREMENTS, {}).toPromise();

    const data = result?.data?.procurements;

    if (!data) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return notFound();
    }

    return data?.map((d: { id: string }) => ({
        id: d.id,
    }));
}

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProcurementDetailPage({ params }: PageProps) {
    const {
        id,
    } = await params;
    const result = await urqlClient.query<
        ProcurementQuery,
        ProcurementQueryVariables
    >(PROCUREMENT, { id }).toPromise();

    if (!result.data?.procurement) {
    // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return notFound();
    }

    return (
        <Page contentClassName={styles.procurementDetails}>
            <Section
                heading={result.data?.procurement?.title}
            >
                <Heading
                    className={styles.heading}
                    size="small"
                    font="normal"
                >
                    Published on &nbsp;
                    {result.data?.procurement?.publishedDate}
                </Heading>
            </Section>
            <Section>
                <ArticleBody
                    content={result.data?.procurement?.description}
                />
                <DownloadTemplate
                    title={result.data?.procurement.title}
                    file={result.data?.procurement.file.url}
                    fileSize={result.data?.procurement.file.size}
                />
            </Section>
        </Page>
    );
}

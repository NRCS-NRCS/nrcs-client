import ArticleBody from '#components/ArticleBody';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Page from '#components/Page';
import Section from '#components/Section';

import { procurements } from '../page';

import styles from './page.module.css';

type Procurement = NonNullable<
  NonNullable<(typeof procurements)['procurement_description']['items']>
>;

async function getProcurements() {
    return procurements.procurement_description.items as unknown as Procurement;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const procurementList = await getProcurements();
    if (!procurementList || procurementList.length === 0) {
        return [{ id: 'empty' }];
    }
    return procurementList.map((item) => ({ id: item.id }));
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
    const procurement = await getProcurements();

    const procurementDetails = procurement?.find((item) => item.id === id);

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
                    {procurementDetails?.published_date}
                </Heading>
            </Section>
            <Section>
                <ArticleBody
                    content={procurementDetails?.description}
                />
                {procurementDetails && (
                    <DownloadTemplate
                        title={procurementDetails.title}
                        file={procurementDetails.file.url}
                        fileSize={procurementDetails.file.size}
                    />
                )}
            </Section>
        </Page>
    );
}

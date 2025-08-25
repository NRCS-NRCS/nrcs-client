import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';

import { works } from '../page';

import styles from './page.module.css';

export type Works = NonNullable<
    (typeof works)['results']
>[number];

async function getWorks(): Promise<Works[]> {
    return works.results;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const workList = await getWorks();
    if (!workList || workList.length === 0) {
        return [{ slug: 'empty' }];
    }
    return workList.map((item) => ({ slug: item.slug }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function WorkDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const work = await getWorks();

    const workDetails = work?.find((item) => item.slug === slug);

    if (isNotDefined(workDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section>
                <ResourcesBanner
                    imageSrc={workDetails.cover_image}
                    imageAlt={workDetails.title}
                    heading={workDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={workDetails.title}
                    date={workDetails.start_date}
                />
                <ArticleBody
                    content={workDetails?.description}
                />
            </Section>
        </Page>
    );
}

import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';

import { blogs } from '../page';

import styles from './page.module.css';

export type News = NonNullable<
    (typeof blogs)['results']
>[number];

async function getNews(): Promise<News[]> {
    return blogs.results;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const newsList = await getNews();
    if (!newsList || newsList.length === 0) {
        return [{ slug: 'empty' }];
    }
    return newsList.map((item) => ({ slug: item.slug }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function NewsDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const news = await getNews();

    const newsDetails = news?.find((item) => item.slug === slug);

    if (isNotDefined(newsDetails)) {
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
                    imageSrc={newsDetails.cover_image}
                    imageAlt={newsDetails.title}
                    heading={newsDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={newsDetails.title}
                    date={newsDetails.published_date}
                />
                <ArticleBody
                    content={newsDetails?.content}
                />
            </Section>
        </Page>
    );
}

import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import allData from '#lib/staticData';
import defaultImage from '#public/defaultImage.png';

import styles from './page.module.css';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.blogs.results ?? [];

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No blogs found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { slug: string }) => ({
        slug: d.slug,
    }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const allBlogs = allData.blogs.results ?? [];
    const blogDetails = allBlogs.find(
        (data) => data?.slug === slug,
    );

    if (isNotDefined(blogDetails)) {
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
                    imageSrc={blogDetails.coverImage?.url ?? defaultImage}
                    imageAlt={blogDetails.title}
                    heading={blogDetails.title}
                />
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <AuthorSection
                    author={blogDetails.author}
                    date={blogDetails.publishedDate}
                    articleLength={blogDetails.content.length}
                />
                <ArticleBody
                    content={blogDetails.content}
                />
            </Section>
        </Page>
    );
}

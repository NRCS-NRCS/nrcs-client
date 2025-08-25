import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';

import { blogs } from '../page';

import styles from './page.module.css';

export type Blog = NonNullable<
    (typeof blogs)['results']
>[number];

async function getBlogs(): Promise<Blog[]> {
    return blogs.results;
}

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const blogList = await getBlogs();
    if (!blogList || blogList.length === 0) {
        return [{ slug: 'empty' }];
    }
    return blogList.map((item) => ({ slug: item.slug }));
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

    const blog = await getBlogs();

    const blogDetails = blog?.find((item) => item.slug === slug);

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
                    imageSrc={blogDetails.cover_image}
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
                    author={blogDetails.title}
                    date={blogDetails.published_date}
                    articleLength={blogDetails.content.length}
                />
                <ArticleBody
                    content={blogDetails.content}
                />
            </Section>
        </Page>
    );
}

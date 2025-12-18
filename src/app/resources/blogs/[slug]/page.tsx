import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type BlogsType = NonNullable<NonNullable<AllQueryQuery['blogs']>>;

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.blogs as unknown as BlogsType;

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

    const allBlogs = allData.blogs as unknown as BlogsType;
    const blogDetails = allBlogs.find(
        (data) => data?.slug === slug,
    ) as unknown as BlogsType[number];

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
                    imageSrc={blogDetails.coverImage?.url ?? ''}
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

import { isNotDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import {
    type GetBlogDetailsQuery,
    type GetBlogDetailsQueryVariables,
    type GetBlogsQuery,
    type GetBlogsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_BLOG_DETAILS,
    GET_BLOGS,
} from '@/queries';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetBlogsQuery,
        GetBlogsQueryVariables
    >(
        GET_BLOGS,
        {},
    ).toPromise();

    const data = result?.data?.blogs;

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No blogs found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { id: string }) => ({
        slug: d.id,
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

    const result = await urqlClient.query<
        GetBlogDetailsQuery,
        GetBlogDetailsQueryVariables
    >(
        GET_BLOG_DETAILS,
        { blogId: slug },
    ).toPromise();

    if (!result.data?.blog) {
        // eslint-disable-next-line no-console
        console.warn('No blog found in GraphQL response');
    }

    const blogDetails = result?.data?.blog;

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

import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import allData from '#lib/staticData';

import styles from './page.module.css';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.projects.results ?? [];
    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No news found in GraphQL response');
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

export default async function ProjectsDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const allProjects = allData.projects.results ?? [];

    const projectDetails = allProjects.find(
        (data) => data.id === slug,
    );

    if (isNotDefined(projectDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.projectPage}>
            <Section>
                {isDefined(projectDetails.coverImage) && (
                    <ResourcesBanner
                        imageSrc={projectDetails.coverImage?.url}
                        imageAlt={projectDetails.coverImage?.name}
                        heading={projectDetails.title}
                    />
                )}
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.projectChildren}
            >
                <ArticleBody
                    content={projectDetails.description}
                />
            </Section>
        </Page>
    );
}

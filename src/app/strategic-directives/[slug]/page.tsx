import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import Accordion from '#components/Accordion';
import ArticleBody from '#components/ArticleBody';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import MajorResponsibilityCard from '#components/MajorResponsibilityCard';
import Page from '#components/Page';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import {
    type GetSlugsQuery,
    type GetSlugsQueryVariables,
    type StrategicDirectivesQuery,
    type StrategicDirectivesQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_SLUGS,
    STRATEGIC_DIRECTIVES,
} from '@/queries';

export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetSlugsQuery,
        GetSlugsQueryVariables
    >(
        GET_SLUGS,
        {},
    ).toPromise();

    if (!result.data?.strategicDirectives.results) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [];
    }

    return result.data?.strategicDirectives.results?.map((d: { slug: string }) => ({
        slug: d.slug,
    }));
}

export default async function DirectiveDetailPage({ params }: { params: { slug: string } }) {
    const result = await urqlClient.query<
        StrategicDirectivesQuery,
        StrategicDirectivesQueryVariables
    >(STRATEGIC_DIRECTIVES, {}).toPromise();
    if (!result.data?.strategicDirectives.results) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [];
    }
    const directivesFromQuery = result.data?.strategicDirectives.results;
    const directive = directivesFromQuery.find((d: { slug: string }) => d.slug === params.slug);

    if (!directive) return notFound();

    return (
        <Page contentClassName={styles.page}>
            <Section
                heading={directive.title}
                childrenContainerClassName={styles.content}
                headingWithBackground
            >
                <ArticleBody content={directive.description} />
            </Section>
            {isDefined(directive.coverImage) && (
                <Section
                    childrenContainerClassName={styles.coverImageContent}
                >
                    <ImageWrapper
                        className={styles.coverImage}
                        imageClassName={styles.image}
                        src={directive.coverImage}
                        alt="Cover image"
                    />
                </Section>
            )}
            {directive.majorResponsibilities?.length > 0 && (
                <Section
                    heading="Major Responsibilities"
                    className={styles.responsibilities}
                    contentClassName={styles.responsibilitiesContent}
                    childrenContainerClassName={styles.responsibilitiesChildren}
                >
                    {directive.majorResponsibilities?.map((mr) => (
                        <MajorResponsibilityCard
                            className={styles.responsibilityItem}
                            title={mr.title}
                            description={mr.description}
                        />
                    ))}
                </Section>
            )}
            {directive.departments?.length > 0 && (
                <Section
                    heading="Departments supporting the cause"
                    className={styles.departments}
                    contentClassName={styles.departmentsContent}
                    childrenContainerClassName={styles.departmentsChildren}
                >
                    <Accordion
                        items={directive.departments}
                        allowMultipleExpansion
                    />
                </Section>
            )}
            {directive.works?.length > 0 && (
                <Section
                    heading="Our Works"
                    className={styles.ourWorks}
                    contentClassName={styles.worksContent}
                    childrenContainerClassName={styles.worksChildren}
                >
                    <div className={styles.workCards}>
                        {directive.works?.map((work) => (
                            <WorkCard
                                title={work.title}
                                date={work.startDate}
                                image={work.coverImage}
                                // FIXME: Fix this link
                                link="/news-and-events/"
                            />
                        ))}
                    </div>
                    <Link
                        // FIXME: Fix this link
                        href="/news-and-events/"
                        variant="button"
                        className={styles.viewMoreButton}
                    >
                        View More
                    </Link>
                </Section>
            )}
            { /* FIXME: Fix this to include resources */ }
            {directive.works?.length > 0 && (
                <Section
                    heading="Important Resources"
                    className={styles.resources}
                    contentClassName={styles.resourcesContent}
                    childrenContainerClassName={styles.resourcesChildren}
                >
                    {directive.works?.map((work) => (
                        <WorkCard
                            title={work.title}
                            date={work.startDate}
                            image={work.coverImage}
                            // FIXME: Fix this link
                            link="/news-and-events/"
                        />
                    ))}
                </Section>
            )}
            <Section
                className={styles.contact}
                contentClassName={styles.contactContent}
                childrenContainerClassName={styles.contactChildren}
            >
                <span>
                    For more information, please contact
                    &nbsp;
                    {directive.contactPersonName}
                    &nbsp;
                    at
                </span>
                <Link
                    variant="navigation"
                    className={styles.contactButton}
                    href={`mailto:${directive.contactPersonEmail}`}
                >
                    {directive.contactPersonEmail}
                </Link>
            </Section>
        </Page>
    );
}

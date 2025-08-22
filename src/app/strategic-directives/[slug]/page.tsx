import { isDefined } from '@togglecorp/fujs';
import { notFound } from 'next/navigation';

import Accordion from '#components/Accordion';
import ArticleBody from '#components/ArticleBody';
import Image from '#components/ImageWrapper';
import Link from '#components/Link';
import MajorResponsibilityCard from '#components/MajorResponsibilityCard';
import Page from '#components/Page';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import {
    type GetStrategicDirectivesSlugsQuery,
    type GetStrategicDirectivesSlugsQueryVariables,
    type StrategicDirectivesQuery,
    type StrategicDirectivesQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './page.module.css';

// eslint-disable-next-line import/order
import {
    GET_STRATEGIC_DIRECTIVES_SLUGS,
    STRATEGIC_DIRECTIVES,
} from '@/queries';

export async function generateStaticParams() {
    const result = await urqlClient.query<
        GetStrategicDirectivesSlugsQuery,
        GetStrategicDirectivesSlugsQueryVariables
    >(
        GET_STRATEGIC_DIRECTIVES_SLUGS,
        {},
    ).toPromise();
    const data = result?.data?.strategicDirectives;

    if (!data) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return notFound();
    }

    return data?.map((d: { slug: string }) => ({
        slug: d.slug,
    }));
}

export default async function DirectiveDetailPage(
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const result = await urqlClient.query<
        StrategicDirectivesQuery,
        StrategicDirectivesQueryVariables
    >(STRATEGIC_DIRECTIVES, {}).toPromise();
    if (!result.data?.strategicDirectives) {
        // eslint-disable-next-line no-console
        console.warn('No directives found in GraphQL response');
        return [];
    }
    const directivesFromQuery = result.data?.strategicDirectives;
    const directive = directivesFromQuery.find((d: { slug: string }) => d.slug === slug);

    const departmentsForDirective = result.data?.departments?.filter(
        (dept) => dept.strategicDirective.id === directive?.id,
    );

    const worksForDirective = result.data?.works?.filter(
        (work) => work.strategicDirective?.id === directive?.id,
    );

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
            {isDefined(directive.coverImage?.url) && (
                <Section
                    childrenContainerClassName={styles.coverImageContent}
                >
                    <Image
                        className={styles.coverImage}
                        imageClassName={styles.image}
                        src={directive.coverImage?.url}
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
            {departmentsForDirective?.length > 0 && (
                <Section
                    heading="Departments supporting the cause"
                    className={styles.departments}
                    contentClassName={styles.departmentsContent}
                    childrenContainerClassName={styles.departmentsChildren}
                >
                    <Accordion
                        items={departmentsForDirective}
                        allowMultipleExpansion
                    />
                </Section>
            )}
            {worksForDirective?.length > 0 && (
                <Section
                    heading="Our Works"
                    className={styles.ourWorks}
                    contentClassName={styles.worksContent}
                    childrenContainerClassName={styles.worksChildren}
                >
                    <div className={styles.workCards}>
                        {worksForDirective?.map((work) => (
                            <WorkCard
                                title={work.title}
                                date={work.startDate ?? ''}
                                image={work.coverImage?.url}
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
            {worksForDirective?.length > 0 && (
                <Section
                    heading="Important Resources"
                    className={styles.resources}
                    contentClassName={styles.resourcesContent}
                    childrenContainerClassName={styles.resourcesChildren}
                >
                    {worksForDirective?.map((work) => (
                        <WorkCard
                            title={work.title}
                            date={work.startDate ?? ''}
                            image={work.coverImage?.url}
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

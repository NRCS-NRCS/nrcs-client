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
import AllData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type DepartmentType = NonNullable<NonNullable<AllQueryQuery['departments']>>;
type ProjectType = NonNullable<NonNullable<AllQueryQuery['projects']>>;
type ResourceType = NonNullable<NonNullable<AllQueryQuery['resources']>>;
type StrategicDirectivesType =NonNullable<NonNullable<AllQueryQuery['strategicDirectives']>>;

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
    const data: StrategicDirectivesType = AllData.strategicDirectives;
    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No works found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { slug: string }) => ({
        slug: d.slug,
    }));
}

export default async function WorkDetailPage(
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const directivesFromQuery:StrategicDirectivesType = AllData.strategicDirectives;
    const directive = directivesFromQuery.find((d: { slug: string }) => d.slug === slug);

    const departmentProjectsData: ProjectType = AllData.projects.filter(
        (data) => data.department.strategicDirective.id === directive?.id,
    );

    const resourcesForDirective = AllData.resources.filter(
        (data) => data.directive.pk === directive?.id,
    ) as unknown as ResourceType;

    const projectsForDepartmentRenderer = (dept: DepartmentType[number]) => {
        if (!departmentProjectsData || !dept) {
            return undefined;
        }

        const projects = departmentProjectsData.filter(
            (item) => item.department?.id === dept.id,
        );

        return (
            <div className={styles.projectCards}>
                {projects.map((projectItem) => (
                    <WorkCard
                        key={projectItem.id}
                        title={projectItem.title}
                        image={projectItem.coverImage?.url}
                        link={`/projects/${projectItem.id}`}
                        imageClassName={styles.projectImage}
                    />
                ))}
            </div>
        );
    };

    const departmentsForDirective : DepartmentType = AllData.departments
        ?.filter((dept) => dept.strategicDirective.id === directive?.id)
        ?.map((dept) => ({
            ...dept,
            projects: projectsForDepartmentRenderer(dept),
        }));

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
            { /* FIXME: Fix this to include resources */ }
            {(resourcesForDirective?.length ?? 0) > 0 && (
                <Section
                    heading="Important Resources"
                    className={styles.resources}
                    contentClassName={styles.resourcesContent}
                    childrenContainerClassName={styles.resourcesChildren}
                >
                    {resourcesForDirective?.map((resource) => (
                        <WorkCard
                            title={resource.title}
                            date={resource.publishedDate ?? ''}
                            image={resource.coverImage?.url}
                            link={`resources/reports/${resource.id}/`}
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

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
import allData from '#data/staticData.json';
import {
    type DepartmentsQuery,
    type ProjectsQuery,
    type ResourcesQuery,
    type StrategicDirectiveQuery,
} from '#generated/types/graphql';

import styles from './page.module.css';

type DepartmentType = NonNullable<NonNullable<DepartmentsQuery['departments']>['results']>;
type ProjectType = NonNullable<NonNullable<ProjectsQuery['projects']>['results']>;
type ResourceType = NonNullable<NonNullable<ResourcesQuery['resources']>['results']>;
type StrategicDirectivesType = NonNullable<NonNullable<StrategicDirectiveQuery['strategicDirectives']>['results']>;

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
    const data: StrategicDirectivesType = allData.strategicDirectives.results;
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
    const directivesFromQuery: StrategicDirectivesType = allData.strategicDirectives.results;
    const directive = directivesFromQuery.find((d: { slug: string }) => d.slug === slug);
    const projectsData = allData.projects.results as unknown as ProjectType;
    const resourcesData = allData.resources.results as unknown as ResourceType;
    const departmentData = allData.departments.results as unknown as DepartmentType;
    const departmentProjectsData = projectsData.filter(
        (data) => data?.department?.strategicDirective?.id === directive?.id,
    );

    const resourcesForDirective = resourcesData.filter(
        (data) => data?.directiveId === directive?.id,
    );

    const projectsForDepartmentRenderer = (dept: DepartmentType[number]) => {
        if (!dept) {
            return undefined;
        }
        const projects = departmentProjectsData.filter(
            (item) => item.department?.id === dept.id,
        );
        return (
            <>
                {projects.length > 0
                    && (
                        <div className={styles.projectCards}>
                            {projects.map((projectItem) => (
                                <WorkCard
                                    className={projects.length === 1 ? styles.projectCard : ''}
                                    key={projectItem.id}
                                    title={projectItem.title}
                                    image={projectItem.coverImage?.url}
                                    link={`/projects/${projectItem.id}`}
                                    imageClassName={styles.projectImage}
                                />
                            ))}
                        </div>
                    )}
                <Section
                    className={styles.contact}
                    contentClassName={styles.contactContent}
                    childrenContainerClassName={styles.contactChildren}
                >
                    For more information, please contact
                    &nbsp;
                    {dept.contactPersonName}
                    &nbsp;
                    at
                    &nbsp;
                    <Link
                        variant="navigation"
                        className={styles.contactButton}
                        href={`mailto:${dept.contactPersonEmail}`}
                    >
                        {dept.contactPersonEmail}
                    </Link>

                </Section>
            </>
        );
    };

    const departmentsForDirective: DepartmentType = departmentData
        ?.filter((dept) => dept?.strategicDirective?.id === directive?.id)
        ?.map((dept) => ({
            ...dept,
            children: projectsForDepartmentRenderer(dept),
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
                    heading="Departments, Division and Service Areas"
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
            { /* FIXME: Fix this to include resources */}
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
                            link={`/resources/${resource.type === 'REPORT' ? 'reports' : 'policies-and-guidelines'}/${resource.slug}/`}
                        />
                    ))}
                </Section>
            )}
        </Page>
    );
}

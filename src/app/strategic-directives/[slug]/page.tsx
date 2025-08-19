import { notFound } from 'next/navigation';

import Accordion from '#components/Accordion';
import ArticleBody from '#components/ArticleBody';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import MajorResponsibilityCard from '#components/MajorResponsibilityCard';
import Page from '#components/Page';
import Section from '#components/Section';
import WorkCard from '#components/WorkCard';
import homeBanner from '#public/banner.png';
import cardImage from '#public/card.png';

import styles from './page.module.css';

const directives = [
    {
        id: '1',
        title: 'Governance and Organizational Development',
        slug: 'gov-org-dev',
        description: 'This directive focuses on strengthening governance structures and enhancing organizational capacities across communities and institutions. It aims to build resilient leadership, develop comprehensive policies, and ensure that systems are in place to manage resources efficiently and effectively. Emphasis is placed on training programs, knowledge transfer, and creating sustainable frameworks that support long-term development and disaster preparedness.',
        coverImage: homeBanner,
        majorResponsibilities: [
            { title: 'Training', description: 'Conducting community drills.' },
            { title: 'Awareness', description: 'Publishing preparedness materials.' },
        ],
        contactPersonName: 'Alice Johnson',
        contactPersonEmail: 'alice@example.com',
        works: [
            {
                id: '1',
                title: 'Flood Risk Mapping',
                description: 'Mapping areas prone to flood hazards.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-01-01',
                endDate: '2025-06-30',
            },
            {
                id: '2',
                title: 'Urban Resilience Initiative',
                description: 'Strengthening cities to face climate risks.',
                coverImage: cardImage,
                department: 2,
                strategicDirective: 2,
                startDate: '2025-03-01',
                endDate: '2025-12-31',
            },
            {
                id: '3',
                title: 'Early Warning Systems',
                description: 'Developing tech-driven alert systems.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-04-10',
                endDate: '2025-09-30',
            },
        ],
        departments: [
            {
                id: '1',
                title: 'Research & Policy',
                description: 'Generates evidence-based policies.',
                strategicDirective: 1,
                contactPersonName: 'Clara Evans',
                contactPersonEmail: 'clara@example.com',
            },
            {
                id: '2',
                title: 'Operations',
                description: 'Coordinates field response activities.',
                strategicDirective: 2,
                contactPersonName: 'David Kim',
                contactPersonEmail: 'david@example.com',
            },
            {
                id: '3',
                title: 'Communications',
                description: 'Handles press, media, and outreach.',
                strategicDirective: 1,
                contactPersonName: 'Emma Rossi',
                contactPersonEmail: 'emma@example.com',
            },
        ],
    },
    {
        id: '2',
        title: 'Disaster and Crisis Management',
        slug: 'disaster-crisis-management',
        description: 'This directive aims to provide comprehensive strategies for managing disasters and crises at local, regional, and national levels. It involves developing risk assessments, coordinating emergency response plans, enhancing infrastructure resilience, and promoting proactive measures to reduce the impact of natural and human-induced disasters. Collaboration with governmental agencies, NGOs, and community stakeholders is central to ensuring timely and effective responses.',
        coverImage: homeBanner,
        majorResponsibilities: [
            {
                title: 'Infrastructure Development',
                description: 'Designing and constructing resilient housing, schools, and healthcare facilities that can withstand climate-related hazards and ensure community safety.',
            },
            {
                title: 'Policy Advisory',
                description: 'Providing guidance to government agencies on disaster risk reduction policies, emergency preparedness plans, and climate adaptation strategies.',
            },
            {
                title: 'Community Engagement',
                description: 'Working directly with local communities to raise awareness about disaster risks, conducting workshops, and fostering community-led preparedness initiatives.',
            },
            {
                title: 'Capacity Building',
                description: 'Training local authorities, volunteers, and staff to effectively respond to emergencies, manage resources, and implement early warning systems.',
            },
            {
                title: 'Monitoring & Evaluation',
                description: 'Establishing systems to track project progress, assess effectiveness of interventions, and provide recommendations for continuous improvement in disaster management efforts.',
            },
        ],
        contactPersonName: 'Bob Lee',
        contactPersonEmail: 'bob@example.com',
        works: [
            {
                id: '1',
                title: 'Flood Risk Mapping',
                description: 'Mapping areas prone to flood hazards.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-01-01',
                endDate: '2025-06-30',
            },
            {
                id: '2',
                title: 'Urban Resilience Initiative',
                description: 'Strengthening cities to face climate risks.',
                coverImage: cardImage,
                department: 2,
                strategicDirective: 2,
                startDate: '2025-03-01',
                endDate: '2025-12-31',
            },
            {
                id: '3',
                title: 'Early Warning Systems',
                description: 'Developing tech-driven alert systems.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-04-10',
                endDate: '2025-09-30',
            },
        ],
        departments: [
            {
                id: '1',
                title: 'Research & Policy',
                description: 'Generates evidence-based policies.',
                strategicDirective: 1,
                contactPersonName: 'Clara Evans',
                contactPersonEmail: 'clara@example.com',
            },
            {
                id: '2',
                title: 'Operations',
                description: 'Coordinates field response activities.',
                strategicDirective: 2,
                contactPersonName: 'David Kim',
                contactPersonEmail: 'david@example.com',
            },
            {
                id: '3',
                title: 'Communications',
                description: 'Handles press, media, and outreach.',
                strategicDirective: 1,
                contactPersonName: 'Emma Rossi',
                contactPersonEmail: 'emma@example.com',
            },
        ],
    },
    {
        id: '3',
        title: 'Health and Community Care',
        slug: 'health-community-care',
        description: 'The Health and Community Care directive focuses on improving public health systems, ensuring access to essential medical services, and enhancing community-based healthcare programs. It seeks to build capacity in local health institutions, provide training for medical personnel, and promote preventive measures to reduce disease burdens. Special attention is given to vulnerable populations, ensuring equitable health services and community well-being.',
        coverImage: homeBanner,
        majorResponsibilities: [
            { title: 'Logistics', description: 'Managing relief distribution.' },
            { title: 'Coordination', description: 'Working with partners on the ground.' },
        ],
        contactPersonName: 'Chen Wei',
        contactPersonEmail: 'chen@example.com',
        works: [
            {
                id: '1',
                title: 'Flood Risk Mapping',
                description: 'Mapping areas prone to flood hazards.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-01-01',
                endDate: '2025-06-30',
            },
            {
                id: '2',
                title: 'Urban Resilience Initiative',
                description: 'Strengthening cities to face climate risks.',
                coverImage: cardImage,
                department: 2,
                strategicDirective: 2,
                startDate: '2025-03-01',
                endDate: '2025-12-31',
            },
            {
                id: '3',
                title: 'Early Warning Systems',
                description: 'Developing tech-driven alert systems.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-04-10',
                endDate: '2025-09-30',
            },
        ],
        departments: [
            {
                id: '1',
                title: 'Research & Policy',
                description: 'Generates evidence-based policies.',
                strategicDirective: 1,
                contactPersonName: 'Clara Evans',
                contactPersonEmail: 'clara@example.com',
            },
            {
                id: '2',
                title: 'Operations',
                description: 'Coordinates field response activities.',
                strategicDirective: 2,
                contactPersonName: 'David Kim',
                contactPersonEmail: 'david@example.com',
            },
            {
                id: '3',
                title: 'Communications',
                description: 'Handles press, media, and outreach.',
                strategicDirective: 1,
                contactPersonName: 'Emma Rossi',
                contactPersonEmail: 'emma@example.com',
            },
        ],
    },
    {
        id: '4',
        title: 'Humanitarian Principles, values, international law and Diplomacy',
        slug: 'hv-communication',
        description: 'This directive is dedicated to promoting humanitarian principles and values in all operations and interventions. It emphasizes impartiality, neutrality, humanity, and independence, ensuring that aid is delivered fairly and without bias. The directive provides guidance for ethical decision-making, accountability, and safeguarding standards, ensuring that all programs uphold the dignity and rights of affected populations while fostering trust with communities and partners.',
        coverImage: homeBanner,
        majorResponsibilities: [
            { title: 'Logistics', description: 'Managing relief distribution.' },
            { title: 'Coordination', description: 'Working with partners on the ground.' },
        ],
        contactPersonName: 'Chen Wei',
        contactPersonEmail: 'chen@example.com',
        works: [
            {
                id: '1',
                title: 'Flood Risk Mapping',
                description: 'Mapping areas prone to flood hazards.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-01-01',
                endDate: '2025-06-30',
            },
            {
                id: '2',
                title: 'Urban Resilience Initiative',
                description: 'Strengthening cities to face climate risks.',
                coverImage: cardImage,
                department: 2,
                strategicDirective: 2,
                startDate: '2025-03-01',
                endDate: '2025-12-31',
            },
            {
                id: '3',
                title: 'Early Warning Systems',
                description: 'Developing tech-driven alert systems.',
                coverImage: cardImage,
                department: 1,
                strategicDirective: 1,
                startDate: '2025-04-10',
                endDate: '2025-09-30',
            },
        ],
        departments: [
            {
                id: '1',
                title: 'Research & Policy',
                description: 'Generates evidence-based policies.',
                strategicDirective: 1,
                contactPersonName: 'Clara Evans',
                contactPersonEmail: 'clara@example.com',
            },
            {
                id: '2',
                title: 'Operations',
                description: 'Coordinates field response activities.',
                strategicDirective: 2,
                contactPersonName: 'David Kim',
                contactPersonEmail: 'david@example.com',
            },
            {
                id: '3',
                title: 'Communications',
                description: 'Handles press, media, and outreach.',
                strategicDirective: 1,
                contactPersonName: 'Emma Rossi',
                contactPersonEmail: 'emma@example.com',
            },
        ],
    },
];

export async function generateStaticParams() {
    return directives.map((d) => ({ slug: d.slug }));
}

export default function DirectiveDetailPage({ params }: { params: { slug: string } }) {
    const directive = directives.find((d) => d.slug === params.slug);

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
            {directive.majorResponsibilities.length > 0 && (
                <Section
                    heading="Major Responsibilities"
                    className={styles.responsibilities}
                    contentClassName={styles.responsibilitiesContent}
                    childrenContainerClassName={styles.responsibilitiesChildren}
                >
                    {directive.majorResponsibilities.map((mr) => (
                        <MajorResponsibilityCard
                            className={styles.responsibilityItem}
                            title={mr.title}
                            description={mr.description}
                        />
                    ))}
                </Section>
            )}
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
            <Section
                heading="Our Works"
                className={styles.ourWorks}
                contentClassName={styles.worksContent}
                childrenContainerClassName={styles.worksChildren}
            >
                <div className={styles.workCards}>
                    {directive.works.map((work) => (
                        <WorkCard
                            title={work.title}
                            date={work.startDate}
                            image={cardImage}
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
            <Section
                heading="Important Resources"
                className={styles.resources}
                contentClassName={styles.resourcesContent}
                childrenContainerClassName={styles.resourcesChildren}
            >
                {directive.works.map((work) => (
                    <WorkCard
                        title={work.title}
                        date={work.startDate}
                        image={cardImage}
                        // FIXME: Fix this link
                        link="/news-and-events/"
                    />
                ))}
            </Section>
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

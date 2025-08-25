import React from 'react';
import { type StaticImageData } from 'next/image';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import cardImage from '#public/card.png';

interface WorksItem {
    id: number;
    title: string;
    description: string;
    slug: string;
    cover_image: StaticImageData;
    department: number;
    strategic_directive: number;
    start_date: string;
    end_date: string;
}

interface Works {
    results: WorksItem[];
}

/* eslint-disable react-refresh/only-export-components */
export const works: Works = {
    results: [
        {
            id: 1,
            title: 'Flood Risk Mapping',
            slug: 'flood-risk-mapping',
            description: 'Mapping areas prone to flood hazards.',
            cover_image: cardImage,
            department: 1,
            strategic_directive: 1,
            start_date: '2025-01-01',
            end_date: '2025-06-30',
        },
        {
            id: 2,
            title: 'Urban Resilience Initiative',
            slug: 'urban-resilience-initiative',
            description: 'Strengthening cities to face climate risks.',
            cover_image: cardImage,
            department: 2,
            strategic_directive: 2,
            start_date: '2025-03-01',
            end_date: '2025-12-31',
        },
        {
            id: 3,
            title: 'Early Warning Systems',
            slug: 'early-warning-systems',
            description: 'Developing tech-driven alert systems.',
            cover_image: cardImage,
            department: 1,
            strategic_directive: 1,
            start_date: '2025-04-10',
            end_date: '2025-09-30',
        },
        {
            id: 4,
            title: 'Sustainable Housing Project',
            slug: 'sustainable-housing-project',
            description: 'Building eco-friendly disaster-resilient homes.',
            cover_image: cardImage,
            department: 2,
            strategic_directive: 2,
            start_date: '2025-02-15',
            end_date: '2025-11-15',
        },
        {
            id: 5,
            title: 'Water Security Program',
            slug: 'water-security-program',
            description: 'Ensuring clean water during climate emergencies.',
            cover_image: cardImage,
            department: 1,
            strategic_directive: 2,
            start_date: '2025-05-01',
            end_date: '2025-12-01',
        },
    ],
};

export default function Works() {
    return (
        <Page>
            <Section
                heading="Our Works"
                headingWithBackground
            >
                {works.results.map((work) => (
                    <ArticleCard
                        key={work.id}
                        isHorizontal
                        imageSrc={work.cover_image}
                        imageAlt={work.title}
                        heading={work.title}
                        author={work.title}
                        description={work.description}
                        date={work.start_date}
                        link={work.slug}
                    />
                ))}
            </Section>
        </Page>
    );
}

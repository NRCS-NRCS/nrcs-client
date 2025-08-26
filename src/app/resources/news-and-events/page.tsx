import React from 'react';
import { type StaticImageData } from 'next/image';

import ArticleCard from '#components/ArticleCard';
import Page from '#components/Page';
import Section from '#components/Section';
import cardImage from '#public/card.png';

interface BlogsItem {
    id: number;
    title: string;
    content: string;
    slug: string;
    featured: boolean;
    status: string;
    work: number;
    cover_image: StaticImageData;
    department: number;
    strategic_directive: number;
    published_date: string;
    author: string;
}

interface Blogs {
    results: BlogsItem[];
}

/* eslint-disable react-refresh/only-export-components */
export const blogs: Blogs = {
    results: [
        {
            id: 1,
            title: 'Shaping the Future of Disaster Response',
            slug: 'shaping-the-future-of-disaster-response',
            published_date: '2025-08-01',
            author: 'Jane Doe',
            content: 'Exploring modern approaches to crisis management.\n\n![response](cardImage)',
            cover_image: cardImage,
            featured: true,
            department: 1,
            strategic_directive: 1,
            status: 'published',
            work: 1,
        },
        {
            id: 2,
            title: 'Community Voices in Action',
            slug: 'community-voices-in-action',
            published_date: '2025-07-15',
            author: 'John Smith',
            content: 'Community-led responses that matter.\n\n![community](cardImage)',
            cover_image: cardImage,
            featured: false,
            department: 2,
            strategic_directive: 2,
            status: 'draft',
            work: 2,
        },
        {
            id: 3,
            title: 'Technology for Humanitarian Impact',
            slug: 'technology-for-humanitarian-impact',
            published_date: '2025-06-20',
            author: 'Priya Sharma',
            content: 'How AI and data science are changing humanitarian aid.\n\n![ai](cardImage)',
            cover_image: cardImage,
            featured: false,
            department: 1,
            strategic_directive: 1,
            status: 'published',
            work: 2,
        },
        {
            id: 4,
            title: 'Rebuilding After the Storm',
            slug: 'rebuilding-after-the-storm',
            published_date: '2025-05-10',
            author: 'Carlos Rivera',
            content: 'Stories of resilience from communities hit hardest by disasters.\n\n![storm](cardImage)',
            cover_image: cardImage,
            featured: true,
            department: 2,
            strategic_directive: 2,
            status: 'published',
            work: 1,
        },
        {
            id: 5,
            title: 'Youth Leading Climate Action',
            slug: 'youth-leading-climate-action',
            published_date: '2025-04-02',
            author: 'Fatima Ali',
            content: 'Empowering youth voices in climate adaptation strategies.\n\n![youth](cardImage)',
            cover_image: cardImage,
            featured: false,
            department: 1,
            strategic_directive: 2,
            status: 'draft',
            work: 1,
        },
    ],
};

export default function NewsAndEvents() {
    return (
        <Page>
            <Section
                heading="News and Events"
                headingWithBackground
            >
                {blogs.results.map((news) => (
                    <ArticleCard
                        key={news.id}
                        imageSrc={news.cover_image}
                        imageAlt={news.title}
                        heading={news.title}
                        author={news.title}
                        description={news.content}
                        date={news.published_date}
                        link={news.slug}
                    />
                ))}
            </Section>
        </Page>
    );
}

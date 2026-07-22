import {
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './page.module.css';

type HighlightType = NonNullable<NonNullable<AllQueryQuery['highlights']>>;

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data: HighlightType = allData.highlights;
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

export default async function HighlightDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;

    const allHighlights: HighlightType = allData.highlights;

    const highlightDetails = allHighlights.find(
        (data) => data.id === slug,
    ) as unknown as HighlightType[number];

    if (isNotDefined(highlightDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    return (
        <Page contentClassName={styles.highlightPage}>
            <Section>
                {isDefined(highlightDetails.image) && (
                    <ResourcesBanner
                        imageSrc={highlightDetails.image?.url}
                        imageAlt={highlightDetails.image?.name}
                        heading={highlightDetails.heading}
                    />
                )}
            </Section>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.highlightChildren}
            >
                <ArticleBody
                    content={highlightDetails.description}
                />
                {highlightDetails?.actionLinks?.length > 0 && (
                    <div>
                        <Heading size="small">Related Links</Heading>
                        {highlightDetails.actionLinks.map((link) => (
                            <Link
                                key={link?.url}
                                href={link?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="underline"
                                className={styles.actions}
                            >
                                {link?.url}
                            </Link>
                        ))}
                    </div>
                )}
            </Section>

        </Page>
    );
}

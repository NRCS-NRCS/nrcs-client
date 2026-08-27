import { IoOpenOutline } from 'react-icons/io5';
import {
    isDefined,
    isNotDefined,
    isTruthyString,
} from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import AuthorSection from '#components/AuthorSection';
import BackLink from '#components/BackLink';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import KeyStat from '#components/KeyStat';
import Link from '#components/Link';
import Page from '#components/Page';
import ResourcesBanner from '#components/ResourcesBanner';
import Section from '#components/Section';
import ShareButtons from '#components/ShareButtons';
import allData from '#lib/staticData';

import styles from './page.module.css';

/* eslint-disable react-refresh/only-export-components */
export async function generateStaticParams() {
    const data = allData.news.results ?? [];

    if (!data || data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No news found in GraphQL response');
        return [{ slug: 'dummy' }];
    }

    return data?.map((d: { slug: string }) => ({
        slug: d.slug,
    }));
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function NewsDetailsPage({ params }: PageProps) {
    const {
        slug,
    } = await params;
    const allNews = allData.news.results ?? [];
    const newsDetails = allNews.find(
        (data) => data.slug === slug,
    );

    if (isNotDefined(newsDetails)) {
        return (
            <Page>
                Nothing to show
            </Page>
        );
    }

    const actionLinks = (newsDetails.actionLinks ?? []).filter(isDefined);
    const attachments = newsDetails.attachments ?? [];
    const keyStats = newsDetails.keyStats ?? [];
    const featuredKeyStats = keyStats.filter((keyStat) => keyStat.featured);

    return (
        <Page contentClassName={styles.resourcesPage}>
            <Section
                className={styles.section}
                contentClassName={styles.content}
                childrenContainerClassName={styles.resourcesChildren}
            >
                <div className={styles.articleHeader}>
                    <BackLink
                        href="/resources/news-and-events"
                        label="Back to News and Events"
                    />
                    <Heading
                        className={styles.title}
                        size="superLarge"
                    >
                        {newsDetails.title}
                    </Heading>
                    <AuthorSection
                        className={styles.meta}
                        date={newsDetails.publishedDate}
                        articleLength={newsDetails.content.length}
                    />
                    <ShareButtons
                        className={styles.share}
                        title={newsDetails.title}
                    />
                </div>
                <ResourcesBanner
                    imageSrc={newsDetails.coverImage?.url ?? ''}
                    imageAlt={newsDetails.coverImage?.name ?? newsDetails.title}
                    fit="contain"
                />
                {featuredKeyStats.length > 0 && (
                    <div className={styles.keyFigures}>
                        {featuredKeyStats.map((keyStat) => (
                            <KeyStat
                                key={keyStat.id}
                                className={styles.keyStat}
                                valueClassName={styles.keyStatValue}
                                labelClassName={styles.keyStatLabel}
                                label={keyStat.title}
                                value={keyStat.stat}
                                size="large"
                            />
                        ))}
                    </div>
                )}
                <ArticleBody
                    content={newsDetails.content}
                />
                {actionLinks.length > 0 && (
                    <div className={styles.block}>
                        <Heading
                            className={styles.blockHeading}
                            size="small"
                        >
                            Related Links
                        </Heading>
                        <div className={styles.actionLinks}>
                            {actionLinks.map((link) => (
                                <Link
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="underline"
                                    className={styles.actions}
                                >
                                    <IoOpenOutline className={styles.actionIcon} />
                                    {isTruthyString(link.label) ? link.label : link.url}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                {attachments.length > 0 && (
                    <div className={styles.block}>
                        <Heading
                            className={styles.blockHeading}
                            size="small"
                        >
                            {attachments.length > 1 ? 'Attachments' : 'Attachment'}
                        </Heading>
                        <div className={styles.attachments}>
                            {attachments.map((attachment) => (
                                <DownloadTemplate
                                    key={attachment.id}
                                    title={isTruthyString(attachment.label)
                                        ? attachment.label
                                        : attachment.file.name}
                                    file={attachment.file.url}
                                    fileSize={attachment.file.size}
                                    isExternalLink
                                />
                            ))}
                        </div>
                    </div>
                )}
                <ShareButtons
                    className={styles.articleFooterShare}
                    title={newsDetails.title}
                    align="center"
                />
            </Section>
        </Page>
    );
}

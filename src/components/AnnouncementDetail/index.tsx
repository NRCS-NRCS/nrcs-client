import React from 'react';
import { isDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import BackLink from '#components/BackLink';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Section from '#components/Section';

import styles from './styles.module.css';

export interface MetaItem {
    label: string;
    value: React.ReactNode;
    link?: string;
}

export interface Attachment {
    name: string;
    url: string;
    size: number;
}

interface Props {
    className?: string;
    backLink: string;
    backLabel: string;
    title: string;
    metaItems: MetaItem[];
    description?: string | null;
    attachmentHeading?: string;
    attachment?: Attachment | null;
}

export default async function AnnouncementDetail(props: Props) {
    const {
        className,
        backLink,
        backLabel,
        title,
        metaItems,
        description,
        attachmentHeading,
        attachment,
    } = props;

    return (
        <Section
            className={className}
            contentClassName={styles.content}
            childrenContainerClassName={styles.children}
        >
            <div className={styles.header}>
                <BackLink
                    href={backLink}
                    label={backLabel}
                />
                <Heading
                    className={styles.title}
                    size="extraLarge"
                >
                    {title}
                </Heading>
            </div>
            {metaItems.length > 0 && (
                <dl className={styles.meta}>
                    {metaItems.map((item) => (
                        <div
                            key={item.label}
                            className={styles.metaItem}
                        >
                            <dt className={styles.metaLabel}>
                                {item.label}
                            </dt>
                            <dd className={styles.metaValue}>
                                {isDefined(item.link) ? (
                                    <Link
                                        className={styles.metaLink}
                                        href={item.link}
                                        variant="transparent"
                                    >
                                        {item.value}
                                    </Link>
                                ) : item.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
            {description && (
                <ArticleBody content={description} />
            )}
            {isDefined(attachment) && (
                <div className={styles.block}>
                    {attachmentHeading && (
                        <Heading
                            className={styles.blockHeading}
                            size="extraSmall"
                        >
                            {attachmentHeading}
                        </Heading>
                    )}
                    <DownloadTemplate
                        title={attachment.name}
                        file={attachment.url}
                        fileSize={attachment.size}
                        isExternalLink
                    />
                </div>
            )}
        </Section>
    );
}

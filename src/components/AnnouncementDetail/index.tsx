import React from 'react';
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import { isDefined } from '@togglecorp/fujs';

import ArticleBody from '#components/ArticleBody';
import BackLink from '#components/BackLink';
import DownloadTemplate from '#components/DownloadTemplate';
import Heading from '#components/Heading';
import Link from '#components/Link';
import Section from '#components/Section';
import { iconSize } from '#lib/common';

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
    formUrl?: string | null;
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
        formUrl,
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
            {formUrl && (
                <div className={styles.block}>
                    <Heading
                        className={styles.blockHeading}
                        size="extraSmall"
                    >
                        How to apply
                    </Heading>
                    <p className={styles.formDescription}>
                        Submit your application through the online form.
                    </p>
                    <Link
                        className={styles.formLink}
                        href={formUrl}
                        variant="button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fill up the form
                        <HiOutlineArrowTopRightOnSquare size={iconSize.medium} />
                    </Link>
                </div>
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

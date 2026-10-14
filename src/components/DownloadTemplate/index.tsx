'use client';

import React, {
    useCallback,
    useMemo,
} from 'react';
import { MdPictureAsPdf } from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';
import { iconSize } from '#lib/common';

import linkStyles from '../Link/styles.module.css';
import styles from './styles.module.css';

interface Props {
    className?: string;
    title: string;
    file: string;
    fileSize: number;
    transparent?: boolean;
    isExternalLink?: boolean;
}

export default function DownloadTemplate(props: Props) {
    const {
        className,
        title,
        file,
        fileSize: sizeInBytes,
        transparent = false,
        isExternalLink = false,
    } = props;

    const fileSizeWithSuffix = useMemo(() => {
        if (sizeInBytes === 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
        const size = sizeInBytes / (1024 ** i);
        return `${size.toFixed(2)} ${units[i]}`;
    }, [sizeInBytes]);

    const handleDownloadClick = useCallback(async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        try {
            const blob = await (await fetch(file)).blob();
            const anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = title.split('/').pop() ?? 'download';
            anchor.click();
            setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
        } catch {
            window.open(file, '_blank', 'noopener,noreferrer');
        }
    }, [file, title]);

    return (
        <div
            className={_cs(
                styles.downloadTemplate,
                transparent && styles.transparent,
                className,
            )}
        >
            <div className={styles.icon}>
                <MdPictureAsPdf size={iconSize.extraLarge} />
            </div>
            <div className={styles.content}>
                <Heading
                    className={styles.title}
                    size="extraSmall"
                    font="heading"
                    title={title}
                >
                    {title}
                </Heading>
                <div className={styles.fileSize}>
                    {fileSizeWithSuffix}
                </div>
                <a
                    className={_cs(linkStyles.link, linkStyles.button, styles.link)}
                    href={file}
                    rel="noopener noreferrer"
                    target={isExternalLink ? '_blank' : undefined}
                    onClick={handleDownloadClick}
                >
                    Download
                </a>
            </div>
        </div>
    );
}

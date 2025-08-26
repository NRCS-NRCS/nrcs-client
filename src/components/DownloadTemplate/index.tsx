import React, { useMemo } from 'react';
import { MdPictureAsPdf } from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';

import Link from '../Link';

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

    return (
        <div
            className={_cs(
                styles.downloadTemplate,
                transparent && styles.transparent,
                className,
            )}
        >
            <div className={styles.icon}>
                <MdPictureAsPdf size={40} />
            </div>
            <div className={styles.content}>
                <Heading
                    className={styles.title}
                    size="extraSmall"
                    font="heading"
                >
                    {title}
                </Heading>
                {fileSizeWithSuffix}
                <Link
                    className={styles.link}
                    href={file}
                    rel="noopener noreferrer"
                    target={isExternalLink ? '_blank' : ''}
                    variant="button"
                >
                    Download
                </Link>
            </div>
        </div>
    );
}

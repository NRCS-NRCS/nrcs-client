import React from 'react';
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
        fileSize,
        transparent = false,
        isExternalLink = false,
    } = props;

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
                {fileSize}
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

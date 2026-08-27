import React from 'react';
import { IoFileTrayOutline } from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';

import styles from './styles.module.css';

interface Props {
    className?: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function EmptyMessage(props: Props) {
    const {
        className,
        title,
        description,
        icon,
    } = props;

    return (
        <div className={_cs(className, styles.empty)}>
            <div className={styles.icon}>
                {icon ?? <IoFileTrayOutline />}
            </div>
            <Heading
                className={styles.title}
                size="small"
            >
                {title}
            </Heading>
            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}
        </div>
    );
}

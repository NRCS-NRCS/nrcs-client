import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props {
    title: string;
    description: string;
    className?: string;
}

export default async function MajorResponsibilityCard(props: Props) {
    const {
        title,
        description,
        className,
    } = props;

    return (
        <div className={_cs(styles.majorResponsibility, className)}>
            <h3>
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    );
}

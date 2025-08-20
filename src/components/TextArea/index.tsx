import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Heading from '../Heading';

import styles from './styles.module.css';

type Props = {
    className?: string;
    name: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea(props: Props) {
    const {
        className,
        name,
        label,
        value,
        onChange,
        placeholder,
    } = props;

    return (
        <div className={_cs(styles.textArea, className)}>
            <Heading
                size="extraSmall"
                font="normal"
            >
                {label}
            </Heading>
            <textarea
                className={styles.input}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

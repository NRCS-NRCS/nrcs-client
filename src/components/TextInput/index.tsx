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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
};

export default function TextInput(props: Props) {
    const {
        className,
        name,
        label,
        value,
        onChange,
        placeholder,
        type = 'text',
    } = props;

    return (
        <div className={_cs(styles.textInput, className)}>
            <Heading
                size="extraSmall"
                font="normal"
            >
                {label}
            </Heading>
            <input
                className={styles.input}
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

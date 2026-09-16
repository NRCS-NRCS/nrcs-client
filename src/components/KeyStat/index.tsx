'use client';

import {
    _cs,
    isNotDefined,
} from '@togglecorp/fujs';

import { type SizeTypes } from '#components/Heading';
import Numeral from '#components/Numeral';
import useCounter from '#hooks/useCounter';

import styles from './styles.module.css';

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
    superLarge: styles.superLarge,
};

interface Props {
    className?: string;
    label: string;
    subLabel?: string;
    value: number | undefined | null;
    variant?: 'default' | 'primary' | 'onDark';
    size?: SizeTypes;
    hiddenIfNoValue?: boolean;
    abbreviated?: boolean;
    prefix?: string;
    suffix?: string;
}

function KeyStat(props: Props) {
    const {
        className,
        label,
        subLabel,
        value,
        variant = 'default',
        size = 'large',
        hiddenIfNoValue = false,
        abbreviated = true,
        prefix,
        suffix,
    } = props;

    const counterValue = useCounter(value, 600, 'exp');

    if (isNotDefined(value) && hiddenIfNoValue) {
        return null;
    }

    return (
        <div
            className={_cs(
                styles.keyStat,
                styles[variant],
                sizeToStyleMap[size],
                className,
            )}
        >
            <Numeral
                className={styles.value}
                value={counterValue}
                placeholder="N/A"
                abbreviate={abbreviated}
                prefix={prefix}
                suffix={suffix}
            />
            <div className={styles.label}>
                {label}
            </div>
            {subLabel && (
                <div className={styles.subLabel}>
                    {subLabel}
                </div>
            )}
        </div>
    );
}

export default KeyStat;

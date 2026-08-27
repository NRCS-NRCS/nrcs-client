import {
    _cs,
    addSeparator,
    isNotDefined,
    isTruthyString,
} from '@togglecorp/fujs';

import styles from './styles.module.css';

export function formattedNormalize(
    num: number,
    largeNumberForAbbreviation = 0,
) {
    const mapping = [
        { suffix: 'b', value: 1000000000 },
        { suffix: 'm', value: 1000000 },
        { suffix: 'k', value: 1000 },
    ];

    const rule = mapping.find((n) => (num >= n.value && num >= largeNumberForAbbreviation));

    if (isNotDefined(rule)) {
        return { number: num };
    }
    const { suffix, value } = rule;
    return {
        number: num / value,
        normalizeSuffix: suffix,
    };
}

export function getAutoPrecision(
    value: number | undefined | null,
    largeNumber: number,
    defaultPrecision: number,
) {
    if (isNotDefined(value) || value === 0) {
        return 0;
    }

    const absoluteValue = Math.abs(value);
    if (absoluteValue < 1) {
        return Math.ceil(-Math.log10(absoluteValue)) + 1;
    }

    if (absoluteValue > largeNumber) {
        return 0;
    }
    return defaultPrecision;
}

export function formatNumberRaw(
    value: number | undefined | null,
    separator: string,
    abbreviate?: boolean,
    precision?: number,
    largeNumberForAbbreviation?: number,
) {
    if (isNotDefined(value)) {
        return undefined;
    }

    const sanitizedValue = Number.parseFloat(String(value));
    if (Number.isNaN(sanitizedValue)) {
        return undefined;
    }

    let output = '';
    let suffix: string | undefined;

    if (abbreviate) {
        const { number, normalizeSuffix } = formattedNormalize(
            sanitizedValue,
            largeNumberForAbbreviation,
        );
        suffix = normalizeSuffix;
        output = isTruthyString(suffix)
            ? number.toFixed(1)
            : number.toFixed(precision);
    } else {
        output = sanitizedValue.toFixed(precision);
    }

    const indexOfDecimal = output.indexOf('.');
    if (indexOfDecimal !== -1) {
        if (/\.0+$/.test(output)) {
            output = output.substr(0, indexOfDecimal);
        } else {
            output = output.replace(/(\.\d*[1-9]+)0+/, '$1');
        }
    }

    if (isTruthyString(separator)) {
        output = addSeparator(output, separator);
    }

    return {
        value: output,
        valueSuffix: suffix,
    };
}

export interface Props {
    value: number | undefined | null;
    // A value of -1 will automatically calculate precision based on value
    precision?: number;
    className?: string;
    prefixClassName?: string;
    valueClassName?: string;
    suffixClassName?: string;
    abbrClassName?: string;
    abbreviate?: boolean;
    // Abbreviate the number only after it reaches this value
    largeNumberForAbbreviation?: number;
    separator?: string;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    // Digits after decimal are hidden once the value exceeds this
    largeNumber?: number;
    defaultPrecision?: number;
}

function Numeral(props: Props) {
    const {
        value,
        precision = -1,
        className,
        abbreviate,
        separator = ',',
        prefix = '',
        suffix = '',
        placeholder = '',
        prefixClassName,
        valueClassName,
        suffixClassName,
        abbrClassName,
        largeNumber = 100,
        defaultPrecision = 2,
        largeNumberForAbbreviation,
    } = props;

    const fallback = isTruthyString(placeholder)
        ? (
            <span className={_cs(className, styles.placeholder)}>
                {placeholder}
            </span>
        )
        : null;

    if (isNotDefined(value)) {
        return fallback;
    }

    const precise = precision < 0
        ? getAutoPrecision(value, largeNumber, defaultPrecision)
        : precision;
    const output = formatNumberRaw(
        value,
        separator,
        abbreviate,
        precise,
        largeNumberForAbbreviation,
    );

    if (isNotDefined(output)) {
        return fallback;
    }

    return (
        <span className={className}>
            {prefix && (
                <span className={prefixClassName}>
                    {prefix}
                </span>
            )}
            <span className={valueClassName}>
                {output.value}
            </span>
            {isTruthyString(output.valueSuffix) && (
                <span className={abbrClassName}>
                    {output.valueSuffix}
                </span>
            )}
            {suffix && (
                <span className={suffixClassName}>
                    {suffix}
                </span>
            )}
        </span>
    );
}

export default Numeral;

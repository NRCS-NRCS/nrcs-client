import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

type Variant = 'transparent' | 'primary' | 'border' | 'icon';
const variantToStyleMap: {
    [key in Variant]: string | undefined;
} = {
    transparent: undefined,
    primary: styles.primary,
    border: styles.border,
    icon: styles.icon,
};
export interface Props<T extends string | undefined> extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'onClick' | 'name' >{
    className?: string;
    variant?: Variant;
    elementRef?: React.Ref<HTMLButtonElement>;
    name: T;
    onClick?: (name: T, e: React.MouseEvent<HTMLButtonElement>) => void;
}

// NOTE: this does not support relative buttons

function Button<T extends string | undefined>(props: Props<T>) {
    const {
        children,
        variant = 'primary',
        className,
        elementRef,
        name,
        onClick,
        ...rest
    } = props;

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(name, e);
            }
        },
        [onClick, name],
    );

    return (
        <button
            name={name}
            ref={elementRef}
            onClick={onClick ? handleClick : undefined}
            className={_cs(
                className,
                styles.button,
                variantToStyleMap[variant],
            )}
            // eslint-disable-next-line
            {...rest}
            type="button"
        >
            {children}
        </button>
    );
}

export default Button;

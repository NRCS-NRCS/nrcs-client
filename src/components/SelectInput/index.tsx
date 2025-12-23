import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';

import styles from './styles.module.css';

interface Option {
    id: string | number;
    name: string;
}

interface Props {
    className?: string;
    name: string;
    value: string;
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    disabled?: boolean;
    required?: boolean;
}

export default function SelectInput(props: Props) {
    const {
        className,
        name,
        value,
        label,
        placeholder,
        onChange,
        options,
        disabled,
        required,
    } = props;

    return (
        <div className={_cs(
            className,
            styles.inputContainer,
            disabled && styles.disabled,
        )}
        >
            <Heading
                className={styles.label}
                size="extraSmall"
                font="normal"
            >
                {label}
            </Heading>
            <select
                className={styles.input}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            >
                <option value="">
                    {placeholder}
                </option>
                {options?.map((option) => (
                    <option
                        key={option.id}
                        value={option.id}
                        className={styles.optionCustom}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

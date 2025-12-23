import Heading from '#components/Heading';

import styles from './styles.module.css';

interface Props {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    required?: boolean;
}

export default function RadioInput(props: Props) {
    const {
        name,
        label,
        onChange,
        value,
        required,
    } = props;

    return (
        <div className={styles.inputContent}>
            <Heading
                size="extraSmall"
                font="normal"
            >
                {label}
            </Heading>
            <input
                className={styles.input}
                name={name}
                type="date"
                value={value}
                required={required}
                onChange={onChange}
            />
        </div>
    );
}

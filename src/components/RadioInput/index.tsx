import Heading from '#components/Heading';

import styles from './styles.module.css';

interface Props {
    options: string[];
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export default function RadioInput(props: Props) {
    const {
        options,
        name,
        label,
        onChange,
        value,
    } = props;

    return (
        <div className={styles.container}>
            <Heading
                size="extraSmall"
                font="normal"
            >
                {label}
            </Heading>
            <div className={styles.content}>
                {options?.map((option) => (
                    <label
                        htmlFor={option}
                        key={option}
                        className={styles.radioButton}
                    >
                        <input
                            id={option}
                            type="radio"
                            name={name}
                            value={option}
                            checked={option === value}
                            onChange={onChange}
                            className={styles.input}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}

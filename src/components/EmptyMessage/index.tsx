import styles from './styles.module.css';

interface Props {
    message: string;
}

export default function EmptyMessage(props: Props) {
    const {
        message,
    } = props;

    return (
        <div className={styles.empty}>
            {message}
        </div>
    );
}

'use client';

import styles from './styles.module.css';

interface Props {
    author: string;
    date: string;
}

export default function AuthorSection(props: Props) {
    const {
        author,
        date,
    } = props;

    return (
        <div className={styles.authorSection}>
            <p className={styles.author}>
                {author}
            </p>
            <p className={styles.date}>
                {date}
            </p>
        </div>
    );
}

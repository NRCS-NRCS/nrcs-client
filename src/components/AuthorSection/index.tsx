import {
    _cs,
    formatDateToString,
    isDefined,
} from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props {
    className?: string;
    author: string;
    date?: string | null;
    articleLength: number | undefined;
}

export default function AuthorSection(props: Props) {
    const {
        className,
        author,
        date,
        articleLength = 0,
    } = props;

    const minuteRead = Math.max(1, Math.ceil(articleLength / 5 / 200));
    const formattedDate = isDefined(date)
        ? formatDateToString(new Date(date), 'MMM dd, yyyy')
        : '-';

    return (
        <div className={_cs(className, styles.authorSection)}>
            <p className={styles.author}>
                {author}
            </p>
            <div className={styles.rightContainer}>
                <p className={styles.date}>
                    {formattedDate}
                </p>
                <p>•</p>
                <p className={styles.date}>
                    {`${minuteRead} min read`}
                </p>
            </div>
        </div>
    );
}

import { IoCalendarOutline } from 'react-icons/io5';
import {
    _cs,
    formatDateToString,
    isDefined,
} from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props {
    className?: string;
    author?: string;
    date?: string | null;
    articleLength: number | undefined;
    authorClassName?: string;
    withDateIcon?: boolean;
}

export default function AuthorSection(props: Props) {
    const {
        className,
        author,
        date,
        articleLength = 0, authorClassName,
        withDateIcon,
    } = props;

    const minuteRead = Math.max(1, Math.ceil(articleLength / 5 / 200));
    const formattedDate = isDefined(date)
        ? formatDateToString(new Date(date), 'MMM dd, yyyy')
        : '-';

    return (
        <div className={_cs(className, styles.authorSection)}>
            {author && (
                <>
                    <p className={_cs(authorClassName, styles.author)}>
                        {author}
                    </p>
                    <p className={styles.separator}>•</p>
                </>
            )}
            {withDateIcon && (
                <IoCalendarOutline className={styles.dateIcon} />
            )}
            <p className={styles.date}>
                {formattedDate}
            </p>
            <p className={styles.separator}>•</p>
            <p className={styles.date}>
                {`${minuteRead} min read`}
            </p>
        </div>
    );
}

import { IoArrowBack } from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import Link from '#components/Link';

import styles from './styles.module.css';

interface Props {
    className?: string;
    href: string;
    label: string;
}

export default function BackLink(props: Props) {
    const {
        className,
        href,
        label,
    } = props;

    return (
        <Link
            className={_cs(className, styles.backLink)}
            href={href}
            variant="transparent"
        >
            <IoArrowBack className={styles.backIcon} />
            {label}
        </Link>
    );
}

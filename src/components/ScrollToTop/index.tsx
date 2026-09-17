'use client';

import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { IoArrowUp } from 'react-icons/io5';

import Button from '#components/Button';

import styles from './styles.module.css';

const VISIBILITY_THRESHOLD = 400;

function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > VISIBILITY_THRESHOLD);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = useCallback(
        () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [],
    );

    if (!visible) {
        return null;
    }

    return (
        <div className={styles.scrollToTop}>
            <Button
                name={undefined}
                variant="primary"
                className={styles.scrollToTopButton}
                onClick={handleClick}
                title="Back to top"
                aria-label="Back to top"
            >
                <IoArrowUp />
            </Button>
        </div>
    );
}

export default ScrollToTop;

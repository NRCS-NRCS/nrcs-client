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
        let frame: number | undefined;

        const handleScroll = () => {
            if (frame !== undefined) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                setVisible(window.scrollY > VISIBILITY_THRESHOLD);
                frame = undefined;
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);

            if (frame !== undefined) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, []);

    const handleClick = useCallback(
        () => {
            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });
        },
        [],
    );

    if (!visible) {
        return null;
    }

    return (
        <Button
            name={undefined}
            variant="transparent"
            className={styles.scrollToTop}
            onClick={handleClick}
            title="Back to top"
            aria-label="Back to top"
        >
            <IoArrowUp />
        </Button>
    );
}

export default ScrollToTop;

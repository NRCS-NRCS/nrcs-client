'use client';

import React, {
    useEffect,
    useRef,
} from 'react';
import { _cs } from '@togglecorp/fujs';

import Heading, { type SizeTypes } from '#components/Heading';

import styles from './styles.module.css';

interface Props {
    heading?: string;
    headingClassName?: string;
    headingSize?: SizeTypes;
    headingWithBackground?: boolean;
    skipAnimation?: boolean;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    childrenContainerClassName?: string;
}

export default function Section(props: Props) {
    const {
        className,
        heading,
        headingClassName,
        headingWithBackground,
        headingSize = 'extraLarge',
        children,
        contentClassName,
        childrenContainerClassName,
        skipAnimation,
    } = props;

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || skipAnimation) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add(styles.visible);
                } else {
                    element.classList.remove(styles.visible);
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [skipAnimation]);

    return (
        <div
            ref={ref}
            className={_cs(
                className,
                styles.section,
                skipAnimation && styles.visible,
            )}
        >
            <div
                className={_cs(contentClassName, styles.content)}
            >
                {heading && (
                    <Heading
                        className={_cs(headingClassName, styles.heading)}
                        size={headingSize}
                        withBackground={headingWithBackground}
                    >
                        {heading}
                    </Heading>
                )}
                <div
                    className={_cs(childrenContainerClassName, styles.childrenContainer)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

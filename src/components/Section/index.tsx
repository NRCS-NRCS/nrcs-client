'use client';

import React, {
    useEffect,
    useRef,
} from 'react';
import { _cs } from '@togglecorp/fujs';

import Heading, { type SizeTypes } from '#components/Heading';

import TextInput from '../TextInput';

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
    searchValue?: string;
    searchField?: string
    handleSearchChange?: (search: string) => void
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
        searchValue,
        searchField,
        handleSearchChange,
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
            { threshold: 0.01 },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [skipAnimation]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleSearchChange) {
            handleSearchChange(e.target.value ?? '');
        }
    };
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
                <div className={styles.headingSection}>
                    {heading && (
                        <Heading
                            className={_cs(headingClassName, styles.heading)}
                            size={headingSize}
                            withBackground={headingWithBackground}
                        >
                            {heading}
                        </Heading>
                    )}
                    {searchField && (
                        <TextInput
                            name={String(searchField)}
                            className={styles.searchInput}
                            type="text"
                            value={searchValue ?? ''}
                            onChange={handleSearch}
                            placeholder={`Search by ${String(searchField)}...`}
                        />
                    )}
                </div>
                <div
                    className={_cs(childrenContainerClassName, styles.childrenContainer)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

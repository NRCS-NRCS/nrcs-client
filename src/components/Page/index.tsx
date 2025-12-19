import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Footer from '#components/Footer';
import Navbar from '#components/Navbar';
import allData from '#data/staticData.json';
import { type AllQueryQuery } from '#generated/types/graphql';

import styles from './styles.module.css';

interface Props {
    elementId?: string;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    hideNavbar?: boolean;
}

type StrategicDirectives = NonNullable<NonNullable<AllQueryQuery['strategicDirectives']>>;

export default function Page(props: Props) {
    const strategicDirectivesData = allData.strategicDirectives as unknown as StrategicDirectives;

    const pathsForWorks = strategicDirectivesData?.map(
        (dir) => ({
            label: dir.title,
            link: `/${dir.slug}/`,
        }),
    );

    const {
        elementId,
        className,
        children,
        hideNavbar,
        contentClassName,
    } = props;

    return (
        <div id={elementId} className={_cs(className, styles.page)}>
            {!hideNavbar && (
                <Navbar
                    className={styles.navbar}
                    works={pathsForWorks ?? []}
                />
            )}
            <main
                className={_cs(styles.mainContent, contentClassName)}
            >
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    );
}

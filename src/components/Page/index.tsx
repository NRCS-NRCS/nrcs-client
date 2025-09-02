import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Footer from '#components/Footer';
import Navbar from '#components/Navbar';
import {
    type GetWorkSlugsQuery,
    type GetWorkSlugsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './styles.module.css';

// eslint-disable-next-line import/order
import { GET_WORK_SLUGS } from '@/queries';

interface Props {
    elementId?: string;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    hideNavbar?: boolean;
}

export default async function Page(props: Props) {
    const result = await urqlClient.query<
        GetWorkSlugsQuery,
        GetWorkSlugsQueryVariables
    >(GET_WORK_SLUGS, {}).toPromise();

    const pathsForWorks = result.data?.strategicDirectives?.map(
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

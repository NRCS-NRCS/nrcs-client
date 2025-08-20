import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Footer from '#components/Footer';
import Navbar from '#components/Navbar';
import {
    type GetSlugsQuery,
    type GetSlugsQueryVariables,
} from '#generated/types/graphql';
import { urqlClient } from '#lib/urqlClient';

import styles from './styles.module.css';

// eslint-disable-next-line import/order
import { GET_SLUGS } from '@/queries';

interface Props {
    elementId?: string;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    hideNavbar?: boolean;
}

export default async function Page(props: Props) {
    const result = await urqlClient.query<
        GetSlugsQuery,
        GetSlugsQueryVariables
    >(GET_SLUGS, {}).toPromise();

    const pathsForStrategicDirectives = result.data?.strategicDirectives?.results?.map(
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
                    strategicDirectives={pathsForStrategicDirectives ?? []}
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

import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Footer from '#components/Footer';
import Navbar from '#components/Navbar';

import styles from './styles.module.css';

interface Props {
    elementId?: string;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    hideNavbar?: boolean;
}

export default function Page(props: Props) {
    const {
        elementId,
        className,
        children,
        hideNavbar,
        contentClassName,
    } = props;

    return (
        <div id={elementId} className={_cs(className, styles.page)}>
            {!hideNavbar && (<Navbar className={styles.navbar} />)}
            <main
                className={_cs(styles.mainContent, contentClassName)}
            >
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    );
}

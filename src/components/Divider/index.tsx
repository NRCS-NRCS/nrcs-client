import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props {
    className?: string;
}

export default function Divider(props: Props) {
    const { className } = props;

    return (
        <div className={_cs(className, styles.divider)}>
            <div className={styles.waveWrapper}>
                <svg
                    viewBox="0 0 1920 120"
                    width="1920"
                    height="120"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.waveSvg}
                    fill="none"
                >
                    <path
                        d="M-367 60C-58.375 -18.6667 558.875 -18.6667 867.5 60C1176.13 138.667 1793.38 138.667 2102 60"
                        stroke="#76CACC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.3"
                        className={styles.wave1}
                    />
                    <path
                        d="M-367 60C-58.375 -18.6667 558.875 -18.6667 867.5 60C1176.13 138.667 1793.38 138.667 2102 60"
                        stroke="#76CACC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                        className={styles.wave2}
                    />
                </svg>
            </div>
        </div>
    );
}

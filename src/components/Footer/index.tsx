import React from 'react';
import {
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoYoutube,
} from 'react-icons/io5';
import { RiTwitterXFill } from 'react-icons/ri';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';
import Image from '#components/ImageWrapper';
import Link from '#components/Link';
import logo from '#public/logo.png';

import styles from './styles.module.css';

const currentYear = new Date().getFullYear();
const nrcsDescription = 'Nepal Red Cross';

interface Props {
    className?: string;
}

export default function Footer(props: Props) {
    const {
        className,
    } = props;

    return (
        <div className={_cs(className, styles.footer)}>
            <div className={styles.topContainer}>
                <div className={styles.leftContainer}>
                    <Image
                        className={styles.image}
                        src={logo}
                        alt="logo"
                    />
                    <div className={styles.content}>
                        <Heading
                            size="extraSmall"
                            className={styles.heading}
                        >
                            nrcs
                        </Heading>
                        <p className={styles.description}>
                            {nrcsDescription}
                        </p>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <Heading
                        className={styles.heading}
                        size="superLarge"
                    >
                        Get Connected!
                    </Heading>
                    <div className={styles.linkGroups}>
                        <div className={styles.linkGroup}>
                            <Heading
                                className={styles.heading}
                                size="extraSmall"
                            >
                                Links
                            </Heading>
                            <div className={styles.links}>
                                <Link
                                    className={styles.link}
                                    href="/about"
                                >
                                    About
                                </Link>
                                <Link
                                    className={styles.link}
                                    href="/work"
                                >
                                    Work
                                </Link>
                                <Link
                                    className={styles.link}
                                    href="/resources"
                                >
                                    Resources
                                </Link>
                                <Link
                                    className={styles.link}
                                    href="/updates/"
                                >
                                    Updates
                                </Link>
                                <Link
                                    className={styles.link}
                                    href="/contact/"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className={styles.linkGroup}>
                            <Heading
                                className={styles.heading}
                                size="extraSmall"
                            >
                                Contact Us
                            </Heading>
                            <div className={styles.icons}>
                                <a
                                    href="https://www.instagram.com/nrcsnepal2020"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                >
                                    <IoLogoInstagram />
                                </a>
                                <a
                                    href="https://www.facebook.com/nrcsnepal2020"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                >
                                    <IoLogoFacebook />
                                </a>
                                <a
                                    href="https://www.youtube.com/@nrcs.nepal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                >
                                    <IoLogoYoutube />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/citizenship-affected-people-s-network-nepal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                >
                                    <IoLogoLinkedin />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                >
                                    <RiTwitterXFill />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.mid} />
            <div className={styles.bottomContainer}>
                {`@Copyright ${currentYear}. NRCS Nepal. All rights reserved.`}
            </div>
        </div>
    );
}

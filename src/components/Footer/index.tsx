import React from 'react';
import { FaPhone } from 'react-icons/fa';
import {
    IoLocationSharp,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoYoutube,
    IoMail,
} from 'react-icons/io5';
import { PiMailboxFill } from 'react-icons/pi';
import {
    RiPrinterFill,
    RiTwitterXFill,
} from 'react-icons/ri';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';
import Image from '#components/ImageWrapper';
import Link from '#components/Link';
import logo from '#public/logo.png';

import styles from './styles.module.css';

const currentYear = new Date().getFullYear();
const nrcsDescription = 'The Nepal Red Cross Society is the largest humanitarian organization in Nepal, providing life-saving aid, health services, disaster response, and community support through a vast network of volunteers and local branches as part of the global Red Cross and Red Crescent Movement.';

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
                        <p className={styles.description}>
                            {nrcsDescription}
                        </p>
                    </div>
                    <div className={styles.icons}>
                        <Link
                            // TODO: Fix this link
                            href="https://www.instagram.com/nrcsnepal2020"
                            className={styles.icon}
                        >
                            <IoLogoInstagram />
                        </Link>
                        <Link
                            // TODO: Fix this link
                            href="https://www.facebook.com/nrcsnepal2020"
                            className={styles.icon}
                        >
                            <IoLogoFacebook />
                        </Link>
                        <Link
                            // TODO: Fix this link
                            href="https://www.youtube.com/@nrcs.nepal"
                            className={styles.icon}
                        >
                            <IoLogoYoutube />
                        </Link>
                        <Link
                            // TODO: Fix this link
                            href="https://www.linkedin.com/company/citizenship-affected-people-s-network-nepal"
                            className={styles.icon}
                        >
                            <IoLogoLinkedin />
                        </Link>
                        <Link
                            // TODO: Fix this link
                            href="https://twitter.com"
                            className={styles.icon}
                        >
                            <RiTwitterXFill />
                        </Link>
                    </div>
                    <Link
                        className={styles.donateButton}
                        href="/donate"
                        variant="button"
                    >
                        Donate
                    </Link>
                </div>
                <div className={styles.linkGroup}>
                    <Heading
                        size="extraSmall"
                    >
                        Pages
                    </Heading>
                    <div className={styles.links}>
                        <Link
                            className={styles.link}
                            href="/works"
                        >
                            Our Works
                        </Link>
                        <Link
                            className={styles.link}
                            href="/about"
                        >
                            About Us
                        </Link>
                        <Link
                            className={styles.link}
                            href="/resources"
                        >
                            Resources
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
                    <div className={styles.links}>
                        <Link
                            className={styles.link}
                            href="tel:+977-1-5370650"
                        >
                            <FaPhone />
                            <span>
                                +977-1-5370650
                            </span>
                        </Link>
                        <Link
                            href="mailto:info@nrcs.org"
                            className={styles.link}
                        >
                            <IoMail />
                            <span>
                                info@nrcs.org
                            </span>
                        </Link>
                        <div
                            className={styles.link}
                        >
                            <IoLocationSharp />
                            <span>
                                Redcross Marg, Kalimati
                            </span>
                        </div>
                        <div
                            className={styles.link}
                        >
                            <RiPrinterFill />
                            <span>
                                Post Box No: 217
                            </span>
                        </div>
                        <div
                            className={styles.link}
                        >
                            <PiMailboxFill />
                            <span>
                                Fax: +977-4271915
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.mid} />
            <div className={styles.bottomContainer}>
                {`@Copyright ${currentYear}. Nepal Red Cross Society. All rights reserved.`}
            </div>
        </div>
    );
}

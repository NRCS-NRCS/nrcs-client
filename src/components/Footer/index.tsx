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
import logo from '#public/wide-logo.jpg';

import styles from './styles.module.css';

const currentYear = new Date().getFullYear();
const nrcsDescription = 'The Nepal Red Cross Society (NRCS), founded in 1963, is the largest humanitarian organization in Nepal and a member of the International Red Cross and Red Crescent Movement. It is guided by the seven Fundamental Principles: humanity, impartiality, neutrality, independence, voluntary service, unity, and universality. NRCS works across the country to provide disaster response, health services, blood transfusion, and community development, with the mission to prevent suffering, protect life, and uphold human dignity.';

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
                        className={styles.imageWrapper}
                        imageClassName={styles.image}
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
                            href="https://www.facebook.com/nepalredcross"
                            className={styles.icon}
                        >
                            <IoLogoFacebook />
                        </Link>
                        <Link
                            href="https://www.youtube.com/channel/UCwA1CYDYvIH7KaRBpYy50ow"
                            className={styles.icon}
                        >
                            <IoLogoYoutube />
                        </Link>
                        <Link
                            href="https://x.com/NepalRedCross"
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
                        <div className={styles.phoneNumbers}>
                            <FaPhone />
                            <Link
                                className={styles.link}
                                href="tel:+977-1-5370650"
                            >
                                +977-1-5370650
                            </Link>
                            <Link
                                className={styles.link}
                                href="tel:+977-1-537 2761"
                            >
                                +977-1-537 2761
                            </Link>
                        </div>
                        <div className={styles.link}>
                            <IoMail />
                            <div className={styles.inline}>
                                <Link
                                    href="mailto:info@nrcs.org"
                                    className={styles.link}
                                >
                                    info@nrcs.org
                                </Link>
                                ,
                                <Link
                                    className={styles.link}
                                    href="mailto:nrcs@nrcs.org"
                                >
                                    nrcs@nrcs.org
                                </Link>
                            </div>
                        </div>
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
                                Fax: +977-4271915, 4273285
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

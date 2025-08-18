'use client';

import React, {
    useCallback,
    useState,
} from 'react';
import { MdMenu } from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';
import { usePathname } from 'next/navigation';

import Button from '#components/Button';
import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import logo from '#public/wide-logo.jpg';

import PopupButton from '../PopupButton';

import styles from './styles.module.css';

const links = [
    {
        label: 'About Us',
        link: '/about',
        children: [
            {
                label: 'Who we are',
                link: '/who-we-are/',
            },
            {
                label: 'Organization Structure',
                link: '/organization-structure/',
            },
        ],
    },
    {
        label: 'Strategic Directions',
        link: '/strategic-directions',
        children: [
            {
                label: 'Governance and Organizational Development',
                link: '/gov-org-dev/',
            },
            {
                label: 'Disaster and Crisis Management',
                link: '/disaster-crisis-management/',
            },
            {
                label: 'Health and Community Care',
                link: '/health-community-care/',
            },
            {
                label: 'Humanity Principles, values, international law and Diplomacy',
                link: '/humanity-principles/',
            },
        ],
    },
    {
        label: 'Get Involved',
        link: '/get-involved',
        children: [
            {
                label: 'Donate Blood',
                link: '/donate-blood/',
            },
            {
                label: 'Become a member',
                link: '/member/',
            },
            {
                label: 'Volunteer with us',
                link: '/volunteer/',
            },
            {
                label: 'Vacancies',
                link: '/vacancies/',
            },
            {
                label: 'Procurements',
                link: '/procurements/',
            },
            {
                label: 'Financial Donations',
                link: '/financial-donations/',
            },
            {
                label: 'Policies and Guidelines',
                link: '/policies-guidelines/',
            },
        ],
    },
    {
        label: 'Resources',
        link: '/resources/',
        children: [
            {
                label: 'News and Events',
                link: '/news-and-events/',
            },
            {
                label: 'Our Works',
                link: '/works/',
            },
            {
                label: 'Blogs',
                link: '/blogs/',
            },
            {
                label: 'Reports and Publications',
                link: '/reports/',
            },
        ],
    },
    {
        label: 'District Chapters',
        link: '/district-chapters/',
    },
    {
        label: 'Contact',
        link: '/contact/',
    },
];

interface Props {
    className?: string;
}

export default function Navbar(props: Props) {
    const {
        className,
    } = props;

    const pathname = usePathname();

    const [isNavShown, setNavShown] = useState(false);

    const handleNavToggle = useCallback(() => {
        setNavShown((oldVal) => !oldVal);
    }, []);

    return (
        <div className={_cs(className, styles.navbar)}>
            <div className={styles.upperContent}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <Link
                            href="/"
                        >
                            <ImageWrapper
                                className={styles.image}
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.rightContainer}>
                        <Link
                            className={styles.expandedButton}
                            href="/volunteer/"
                        >
                            Volunteer
                        </Link>
                        <Link
                            className={styles.expandedButton}
                            variant="button"
                            href="/donate/"
                        >
                            Donate
                        </Link>
                        <Link
                            className={styles.expandedButton}
                            href="tel:1130"
                        >
                            1130
                        </Link>
                        <Button
                            className={_cs(styles.menu)}
                            name="toggle"
                            variant="transparent"
                            onClick={handleNavToggle}
                        >
                            <MdMenu />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.lowerContent}>
                <div className={_cs(isNavShown && styles.navShown, styles.links)}>
                    {links?.map((item) => (item.children ? (
                        <PopupButton
                            key={item.link}
                            persistent={false}
                            label={item.label}
                        >
                            {item.children.map((child) => (
                                <Link
                                    key={child.link}
                                    className={styles.popupLink}
                                    href={`${item.link}${child.link}`}
                                    variant="navigation"
                                    active={pathname === `${item.link}${child.link}`}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </PopupButton>
                    ) : (
                        <Link
                            className={styles.link}
                            key={item.link}
                            href={item.link}
                            variant="navigation"
                            active={pathname === item.link}
                        >
                            {item.label}
                        </Link>
                    )))}
                </div>
            </div>
            <div className={_cs(isNavShown && styles.navShown, styles.drawer)}>
                {links?.map((item) => (item.children ? (
                    <div key={item.link}>
                        <Heading size="small">{item.label}</Heading>
                        {item.children.map((child) => (
                            <Link
                                key={child.link}
                                className={styles.link}
                                href={`${item.link}${child.link}`}
                                variant="navigation"
                                active={pathname === `${item.link}${child.link}`}
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Link
                        key={item.link}
                        href={item.link}
                        className={styles.link}
                        variant="navigation"
                        active={pathname === item.link}
                    >
                        {item.label}
                    </Link>
                )))}
            </div>
        </div>
    );
}

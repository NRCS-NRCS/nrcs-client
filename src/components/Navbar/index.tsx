'use client';

import React, {
    useCallback,
    useMemo,
    useState,
} from 'react';
import {
    IoChevronDownOutline,
    IoChevronUpOutline,
} from 'react-icons/io5';
import {
    MdLocalPhone,
    MdMenu,
} from 'react-icons/md';
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
        order: 1,
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
        label: 'Get Involved',
        link: '/get-involved',
        order: 3,
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
        link: '/resources',
        order: 4,
        children: [
            {
                label: 'News and Events',
                link: '/news-and-events/',
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
        label: 'Our Presence',
        link: '/our-presence/',
        order: 5,
    },
    {
        label: 'Contact',
        link: '/contact/',
        order: 6,
    },
];

interface Props {
    className?: string;
    works: {label: string; link: string;}[];
}

export default function Navbar(props: Props) {
    const {
        className,
        works,
    } = props;

    const finalPaths = useMemo(() => {
        const newVal = [
            ...links,
            {
                label: 'Our Works',
                link: '/works',
                order: 2,
                children: works,
            },
        ];
        return newVal.sort((a, b) => a.order - b.order);
    }, [works]);

    const pathname = usePathname();

    const [isNavShown, setNavShown] = useState(false);

    const handleNavToggle = useCallback(() => {
        setNavShown((oldVal) => !oldVal);
    }, []);

    const [openItems, setOpenItems] = useState<string[]>([]);
    const toggleItem = useCallback((id: string) => {
        setOpenItems((prev) => (
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        ));
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
                            className={_cs(styles.hideableIcon, styles.expandedButton)}
                            href="/volunteer/"
                        >
                            Volunteer
                        </Link>
                        <Link
                            className={_cs(styles.hideableIcon, styles.expandedButton)}
                            variant="button"
                            href="/donate/"
                        >
                            Donate
                        </Link>
                        <Link
                            className={_cs(
                                styles.hideableIcon,
                                styles.expandedButton,
                                styles.hotlineContainer,
                            )}
                            href="tel:1130"
                        >
                            <span className={styles.linkDescription}>
                                NRCS Hotline
                            </span>
                            <span className={styles.hotline}>
                                <MdLocalPhone />
                                &nbsp;
                                1130
                            </span>
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
                    {finalPaths?.map((item) => (item.children ? (
                        <PopupButton
                            name={undefined}
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
                {finalPaths?.map((item) => (item.children ? (
                    <div key={item.link}>
                        <Button
                            className={styles.drawerLinkHeader}
                            name={item.link}
                            variant="transparent"
                            onClick={toggleItem}
                        >
                            <Heading
                                className={styles.drawerLinkHeaderLabel}
                                size="small"
                            >
                                {item.label}
                            </Heading>
                            {openItems.includes(item.link) ? (
                                <IoChevronUpOutline className={styles.drawerLinkHeaderButton} />
                            ) : (
                                <IoChevronDownOutline className={styles.drawerLinkHeaderButton} />
                            )}
                        </Button>
                        {openItems.includes(item.link) && item.children.map((child) => (
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

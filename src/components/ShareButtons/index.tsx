'use client';

import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    IoCheckmarkOutline,
    IoLinkOutline,
    IoLogoFacebook,
    IoLogoWhatsapp,
    IoMailOutline,
} from 'react-icons/io5';
import { RiTwitterXFill } from 'react-icons/ri';
import {
    SiMessenger,
    SiThreads,
} from 'react-icons/si';
import {
    _cs,
    isTruthyString,
} from '@togglecorp/fujs';
import { usePathname } from 'next/navigation';

import Button from '#components/Button';

import styles from './styles.module.css';

const COPIED_RESET_TIMEOUT = 2000;
const SHARE_PREFIX = 'Check out this article:';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface Props {
    className?: string;
    title: string;
    align?: 'start' | 'center';
}

function ShareButtons(props: Props) {
    const {
        className,
        title,
        align = 'start',
    } = props;

    const pathname = usePathname();
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const origin = isTruthyString(siteUrl)
            ? siteUrl.replace(/\/$/, '')
            : window.location.origin;

        setShareUrl(`${origin}${pathname}`);
    }, [pathname]);

    useEffect(() => {
        if (!copied) {
            return undefined;
        }

        const timeout = window.setTimeout(() => setCopied(false), COPIED_RESET_TIMEOUT);

        return () => window.clearTimeout(timeout);
    }, [copied]);

    const handleCopyClick = useCallback(
        () => {
            navigator.clipboard.writeText(shareUrl).then(
                () => setCopied(true),
                () => setCopied(false),
            );
        },
        [shareUrl],
    );

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedShareText = encodeURIComponent(`${SHARE_PREFIX}\n${title}\n${shareUrl}`);

    const socialLinks = [
        {
            key: 'twitter',
            label: 'Share on X',
            href: `https://twitter.com/intent/tweet?text=${encodedShareText}`,
            icon: <RiTwitterXFill />,
            openInNewTab: true,
        },
        {
            key: 'facebook',
            label: 'Share on Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <IoLogoFacebook />,
            openInNewTab: true,
        },
        {
            key: 'messenger',
            label: 'Share on Messenger',
            href: `fb-messenger://share?link=${encodedUrl}`,
            icon: <SiMessenger />,
            openInNewTab: false,
            mobileOnly: true,
        },
        {
            key: 'whatsapp',
            label: 'Share on WhatsApp',
            href: `https://wa.me/?text=${encodedShareText}`,
            icon: <IoLogoWhatsapp />,
            openInNewTab: true,
        },
        {
            key: 'threads',
            label: 'Share on Threads',
            href: `https://www.threads.net/intent/post?text=${encodedShareText}`,
            icon: <SiThreads />,
            openInNewTab: true,
        },
    ];

    const copyLabel = copied ? 'Link copied' : 'Copy link';

    return (
        <div
            className={_cs(
                className,
                styles.shareButtons,
                align === 'center' && styles.center,
            )}
        >
            <a
                className={styles.shareItem}
                href={`mailto:?subject=${encodedTitle}&body=${encodedShareText}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share via email"
                title="Share via email"
            >
                <IoMailOutline />
            </a>
            <Button
                name={undefined}
                variant="transparent"
                className={_cs(styles.shareItem, copied && styles.copied)}
                onClick={handleCopyClick}
                aria-label={copyLabel}
                title={copyLabel}
            >
                {copied ? <IoCheckmarkOutline /> : <IoLinkOutline />}
            </Button>
            {socialLinks.map((link) => (
                <a
                    key={link.key}
                    className={_cs(styles.shareItem, link.mobileOnly && styles.mobileOnly)}
                    href={link.href}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}

export default ShareButtons;

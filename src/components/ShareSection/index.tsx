'use client';

import {
    useEffect,
    useState,
} from 'react';
import {
    IoLogoFacebook,
    IoLogoLinkedin,
} from 'react-icons/io5';
import { RiTwitterXFill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

import styles from './styles.module.css';

export default function ShareSection({ title }: { title: string }) {
    const pathname = usePathname();

    const [shareLinks, setShareLinks] = useState({
        linkedin: '',
        facebook: '',
        twitter: '',
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const encodedUrl = encodeURIComponent(`${window.location.origin}${pathname}`);
            const encodedTitle = encodeURIComponent(title);

            setShareLinks({
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            });
        }
    }, [pathname, title]);

    return (
        <div className={styles.shareContainer}>
            <p className={styles.shareTitle}>Share this vacancy</p>
            <div className={styles.shareIcons}>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <IoLogoLinkedin />
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <IoLogoFacebook />
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <RiTwitterXFill />
                </a>
            </div>
        </div>
    );
}

'use client';

import {
    useEffect,
    useRef,
} from 'react';
import { _cs } from '@togglecorp/fujs';

import { type RadioProgramsQuery } from '#generated/types/graphql';

import Heading from '../Heading';

import styles from './styles.module.css';

type RadioProgram = NonNullable<
    NonNullable<RadioProgramsQuery['radioProgram']>[number]
>;

interface Props {
    radioProgram: RadioProgram;
    className?: string;
    showDate?: boolean;
    withBackground?: boolean;
}
const GLOBAL_AUDIO_EVENT = 'GLOBAL_AUDIO_PLAY';

export default function AudioPlayer(props: Props) {
    const {
        radioProgram, className: classNameFromProps, showDate = true, withBackground = false,
    } = props;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handlePlay = () => {
            window.dispatchEvent(
                new CustomEvent(GLOBAL_AUDIO_EVENT, { detail: audio }),
            );
        };
        audio.addEventListener('play', handlePlay);
        // eslint-disable-next-line consistent-return
        return () => {
            audio.removeEventListener('play', handlePlay);
        };
    }, []);

    useEffect(() => {
        const handleGlobalPlay = (e: Event) => {
            const other = (e as CustomEvent).detail;
            if (audioRef.current && other !== audioRef.current) {
                audioRef.current.pause();
            }
        };
        window.addEventListener(GLOBAL_AUDIO_EVENT, handleGlobalPlay);
        return () => window.removeEventListener(GLOBAL_AUDIO_EVENT, handleGlobalPlay);
    }, []);

    const className = _cs(
        styles.audioPlayer,
        classNameFromProps,
        withBackground && styles.withBackground,
    );

    const publishedDate = new Date(radioProgram.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const isExternal = String(radioProgram.audioFile.url)?.startsWith('http');
    const safeSrc = isExternal ? String(radioProgram.audioFile.url).replace(/^http:\/\/web:8000/, 'http://localhost:8000') : radioProgram.audioFile.url;

    return (
        <div className={className}>
            {/* eslint-disable jsx-a11y/media-has-caption */}
            {showDate
            && (
                <Heading size="extraSmall" font="normal" className={styles.publishedDate}>
                    {publishedDate}
                </Heading>
            )}
            <Heading size="small">{radioProgram.title}</Heading>
            <audio ref={audioRef} src={safeSrc} controls />

        </div>
    );
}

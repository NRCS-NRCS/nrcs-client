'use client';

import {
    useEffect,
    useRef,
    useState,
} from 'react';

import Button from '#components/Button';
import { type RadioProgramsQuery } from '#generated/types/graphql';

type RadioProgram = NonNullable<NonNullable<RadioProgramsQuery['radioProgram']>[number]>;

interface Props {
    radioProgram: RadioProgram;

}

export default function AudioPlayer(props: Props) {
    const {
        radioProgram,
    } = props;

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.currentTime = 0;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [isPlaying]);

    return (
        <div>
            {/* eslint-disable jsx-a11y/media-has-caption */}
            <audio ref={audioRef} src={radioProgram.audioFile.url} />
            <Button
                name="play-pause"
                onClick={handlePlayPause}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </Button>
        </div>
    );
}

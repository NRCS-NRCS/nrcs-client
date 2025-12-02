import React from 'react';

import Heading from '#components//Heading';
import Link from '#components//Link';

import styles from './styles.module.css';

type WhereToDonateAddress = {
    id:string
    title: string;
    time: string;
    organizer: string;
    location?: string;
};

interface Props {
    whereToDonateItems: WhereToDonateAddress[];
}

export default function WhereToDonateCard({ whereToDonateItems }: Props) {
    return (
        <div className={styles.whereToDonateDescription}>
            {whereToDonateItems?.map((item, index) => {
                const {
                    title,
                    time,
                    organizer,
                    location,
                } = item;
                return (
                    <div key={item.id} className={styles.whereToDonateItems}>
                        <Heading
                            font="normal"
                            size="extraSmall"
                        >
                            {index + 1}
                            .
                            {' '}
                            {title}
                        </Heading>
                        <ul>
                            <li>
                                Time:
                                {' '}
                                {time}
                            </li>
                            <li>
                                Organizer:
                                {' '}
                                {organizer}
                            </li>
                            {location && (
                                <li>
                                    <Link
                                        href={location}
                                        target="_blank"
                                        variant="navigation"
                                        className={styles.link}
                                    >
                                        Location
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

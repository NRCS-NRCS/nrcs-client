'use client';

import { _cs } from '@togglecorp/fujs';

import ImageWrapper from '#components/ImageWrapper';
import allData from '#data/staticData.json';
import { type PartnersQuery } from '#generated/types/graphql';

import Section from '../Section';

import styles from './styles.module.css';

interface Props {
    className?: string;
}
function Partners({ className }: Props) {
    const partnersData = allData.partners.results as unknown as PartnersQuery['partners']['results'];

    return (
        <Section headingWithBackground heading="Partners" childrenContainerClassName={styles.child}>
            <div className={_cs(className, styles.partners)}>
                {[...partnersData, ...partnersData].map((logo, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={`${logo.id}-${index}`} className={styles.item}>
                        <ImageWrapper
                            className={styles.imageWrapper}
                            imageClassName={styles.image}
                            src={logo.image?.url || ''}
                            alt={`partner-logo-${index}`}
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
}

export default Partners;

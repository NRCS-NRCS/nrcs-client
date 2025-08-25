import { type StaticImageData } from 'next/image';

import Heading from '../Heading';
import ImageWrapper from '../ImageWrapper';

import styles from './styles.module.css';

interface Props {
    imageSrc: StaticImageData | string;
    imageAlt: string;
    heading: string;
}
export default function ResourcesBanner(props: Props) {
    const {
        imageSrc,
        imageAlt,
        heading,

    } = props;
    return (
        <div className={styles.resourcesBanner}>
            <ImageWrapper
                src={imageSrc}
                alt={imageAlt}
            />
            <Heading withBackground className={styles.heading}>
                {heading}
            </Heading>
        </div>
    );
}

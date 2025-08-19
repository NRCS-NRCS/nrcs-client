import ImageWrapper from '#components/ImageWrapper';
import banner from '#public/banner.png';

import styles from './styles.module.css';

const images = [
    banner,
    banner,
    banner,
    banner,
    banner,
    banner,
    banner,
    banner,
    banner,
    banner,
];

export default function ImageSlider() {
    return (
        <div className={styles.croppedGallery}>
            <div className={styles.joinImagesWrapper}>
                {[...images, ...images].map((image, index) => (
                    <ImageWrapper
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={styles.image}
                        imageClassName={styles.joinImages}
                        src={image}
                        alt={`images-${index}`}
                    />
                ))}
            </div>
        </div>
    );
}

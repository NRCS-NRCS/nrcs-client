import ImageWrapper from '#components/ImageWrapper';
import carouselImage1 from '#public/carousel/carouselImage1.jpg';
import carouselImage2 from '#public/carousel/carouselImage2.jpg';
import carouselImage3 from '#public/carousel/carouselImage3.jpg';
import carouselImage4 from '#public/carousel/carouselImage4.jpg';
import carouselImage5 from '#public/carousel/carouselImage5.jpg';
import carouselImage6 from '#public/carousel/carouselImage6.jpg';
import carouselImage7 from '#public/carousel/carouselImage7.jpg';
import carouselImage8 from '#public/carousel/carouselImage8.jpg';
import carouselImage9 from '#public/carousel/carouselImage9.jpg';
import carouselImage10 from '#public/carousel/carouselImage10.jpg';
import carouselImage11 from '#public/carousel/carouselImage11.jpg';
import carouselImage12 from '#public/carousel/carouselImage12.jpg';

import styles from './styles.module.css';

const images = [
    carouselImage1,
    carouselImage2,
    carouselImage3,
    carouselImage4,
    carouselImage5,
    carouselImage6,
    carouselImage7,
    carouselImage8,
    carouselImage9,
    carouselImage10,
    carouselImage11,
    carouselImage12,
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

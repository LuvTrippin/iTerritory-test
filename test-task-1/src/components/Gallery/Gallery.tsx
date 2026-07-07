import * as React from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import type { GalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import styles from "./Gallery.module.css";

interface Photo {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

const PHOTOS_URL = "https://picsum.photos/v2/list?page=2&limit=30";
const MAX_IMAGE_WIDTH = 1280;

const getPhotoUrl = (photo: Photo, maxWidth: number) => {
    const width = Math.min(photo.width, maxWidth);
    const height = Math.round(photo.height * (width / photo.width));

    return {
        url: `https://picsum.photos/id/${photo.id}/${width}/${height}`,
        width: String(width),
        height: String(height),
    };
};

const Gallery: React.FunctionComponent = () => {
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setLoading(true);
        const fetchPhotos = async () => {
            try {
                const { data } = await axios.get<Photo[]>(PHOTOS_URL);
                setPhotos(data);
            } catch {
                setError("Не удалось загрузить фотографии");
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    const items = React.useMemo<GalleryItem[]>(
        () =>
            photos.map((photo) => {
                const image = getPhotoUrl(photo, MAX_IMAGE_WIDTH);

                return {
                    original: image.url,
                    thumbnail: `https://picsum.photos/id/${photo.id}/150/100`,
                    originalWidth: image.width,
                    originalHeight: image.height,
                    originalAlt: photo.author,
                    description: photo.author,
                    loading: "eager",
                };
            }),
        [photos],
    );

    if (loading) {
        return <p>Загрузка галереи...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.gallery}>
            <ImageGallery items={items} lazyLoad={false} />
        </div>
    );
};

export default Gallery;

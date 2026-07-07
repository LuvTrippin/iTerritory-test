import * as React from "react";
import {useEffect} from "react";
import styles from "./ImageWithFallback.module.css"

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    fallback?: string;
    alt?: string;
}

const ImageWithFallback: React.FunctionComponent<ImageWithFallbackProps> = ({
    src,
    fallback,
    alt,
    ...props
}) => {
    const [currentSrc, setCurrentSrc] = React.useState(src);
    const [currentAlt, setCurrentAlt] = React.useState(alt);

    const handleError = () => {
        setCurrentSrc(fallback);
        setCurrentAlt('Плейсхолдер изображения');
    };

    useEffect(() => {
        if (!src) {
            setCurrentSrc(fallback);
            setCurrentAlt('Плейсхолдер изображения');
        }
    }, []);

    return <img className={styles.img} src={currentSrc} alt={currentAlt} onError={handleError} {...props} />;
}

export default ImageWithFallback;

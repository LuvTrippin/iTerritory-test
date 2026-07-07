import * as React from "react";
import {useEffect} from "react";

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

    const handleError = () => {
        setCurrentSrc(fallback);
    };

    useEffect(() => {
        if (!src) {
            setCurrentSrc(fallback);
        }
    }, []);

    return <img src={currentSrc} alt={alt} onError={handleError} {...props} />;
}

export default ImageWithFallback;

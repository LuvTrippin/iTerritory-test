import * as React from "react";

export interface Photo {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    fallback?: string;
    alt?: string;
}

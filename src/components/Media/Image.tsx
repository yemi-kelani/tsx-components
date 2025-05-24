import "./Image.scss";

import React from "react";

export type ImageProps = {
    src: string;
    caption?: string;
    className?: string;
    style?: React.CSSProperties;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    [key: string]: unknown;
};


/**
 * Renders a responsive image with an optional caption.
 *
 * @param props - The properties for the Image component.
 * @param props.src - The source URL of the image to be displayed.
 * @param props.caption - Optional text to be displayed below the image.
 * @param props.className - Additional className(s) applied to the outer container.
 * @param props.style - Inline styles applied to the outer container.
 * @param props.imgProps... (key: string) attributes associated with the <img> element.
 * @param props... (key: string) attributes associated with the figure container element.
 *
 * @returns An HTML <figure> element containing the image and optional caption.
 */
export const Image = ({
    src,
    caption,
    className = "",
    style,
    imgProps = {},
    ...containerProps
}: ImageProps) => {
    return (
        <figure className={`tsx-cmpnt-image-container ${className}`} style={style} {...containerProps}>
            <img src={src} alt={caption || "Image"} id={`tsx-cmpnt-image-${encodeURIComponent(src)}`} {...imgProps} />
            {caption && (
                <figcaption style={{ fontSize: "smaller" }}>{caption}</figcaption>
            )}
        </figure>
    );
};

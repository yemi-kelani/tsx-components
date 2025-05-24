import "./Video.scss";

import React from "react";

export type VideoProps = {
    src: string;
    srcType?: string;
    caption?: string;
    className?: string;
    style?: React.CSSProperties;
    videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
    [key: string]: unknown;
};

/**
 * Renders a responsive video player with optional caption text.
 *
 * @param props - The properties for the Video component.
 * @param props.src - The source URL of the video to be played.
 * @param props.srcType - The MIME type of the video. Defaults to "video/mp4".
 * @param props.caption - Optional text displayed below the video.
 * @param props.className - Additional className(s) applied to the outer container.
 * @param props.style - Inline styles applied to the outer container.
 * @param props.videoProps - Attributes passed directly to the <video> tag (e.g., controls, preload).
 * @param props... (key: string) attributes associated with the outer figure container.
 *
 * @returns An HTML <figure> element containing the video and optional caption.
 */
export const Video = ({
    src,
    srcType = "video/mp4",
    caption,
    className = "",
    style,
    videoProps = {},
    ...containerProps
}: VideoProps) => {
    return (
        <figure className={`tsx-cmpnt-video-container ${className}`} style={style} {...containerProps}>
            <video
                width="640"
                height="480"
                autoPlay
                muted
                controls
                preload="none"
                playsInline
                {...videoProps}
                id={`tsx-cmpnt-video-${encodeURIComponent(src)}`}
            >
                <source src={src} type={srcType} />
                Your browser does not support the video tag.
            </video>
            {caption && (
                <figcaption style={{ fontSize: "smaller" }}>{caption}</figcaption>
            )}
        </figure>
    );
};

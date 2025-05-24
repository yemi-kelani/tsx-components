import { Image } from "./Image";
import { Video } from "./Video";

export const World = () => {
    return (
        <>
            <Image src="https://placehold.co/600x360/EEE/31343C" />

            <Image
                src="https://placehold.co/600x360/EEE/31343C"
                caption="This is a placeholder image."
            />

            <Image
                src="https://placehold.co/320x180/EEE/31343C"
                caption="Small image example"
                className="tsx-cmpnt-image-small"
                style={{ border: "2px solid #333" }}
                alt="Example small placeholder"
                loading="lazy"
            />

            <Image
                src="https://placehold.co/800x450/EEE/31343C"
                caption="Image with alt and title"
                alt="Large placeholder"
                title="Hover text for large image"
                className="tsx-cmpnt-image-medium"
            />

            <Video src="https://www.w3schools.com/html/mov_bbb.mp4" />

            <Video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                caption="Sample Big Buck Bunny video."
            />

            <Video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                caption="Muted autoplay video"
                className="tsx-cmpnt-video-medium"
                videoProps={{ muted: true, autoPlay: true, loop: true, controls: true }}
                style={{ border: "2px solid #666", borderRadius: "2px" }}
                preload="metadata"
            />

            <Video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                caption="Video with poster image"
                videoProps={{ poster: "https://via.placeholder.com/640x360?text=Video+Poster" }}
                style={{ maxWidth: 640 }}
            />
        </>
    );
}
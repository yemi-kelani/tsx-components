import { FC, ReactNode } from "react";

type ContentProps = {
    content: ReactNode
};

export const Content: FC<ContentProps> = ({ content }) => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            {content}
        </div>
    );
};
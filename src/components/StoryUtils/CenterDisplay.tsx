import { ReactNode } from "react";
import { Content } from "../Content";

export const CenterDisplay = ({ children }: { children: ReactNode }) => {
    return (
        <section
            style={{
                width: "100%",
                height: "100vh"
            }}>
            <Content>
                {children}
            </Content>
        </section>
    );
};
import { ReactNode } from "react";
import { Content } from "../Content/Content";

export const CenterDisplay = ({
  children,
  direction = "column",
}: {
  children: ReactNode;
  direction?: "column" | "row";
}) => {
  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Content direction={direction}>{children}</Content>
    </section>
  );
};

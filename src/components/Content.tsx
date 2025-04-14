import { JSX, ReactNode } from "react";
import { DynamicTag } from "./DynamicTag";

type ContentProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: string;
  direction?: "column" | "row";
  [key: string]: unknown;
};

/**
 * Renders the child elements within a specified HTML tag. The default tag is "dev".
 * Content is automatically centered.
 *
 * @param props - The properties for the component.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "dev".
 * @param props.children - The component child elements.
 * @param props.gap - Gap spacing (as string) between elements in content container.
 * @param props.direction - Flex direction of elements in content container.
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns An HTML tag.
 */
export const Content = ({
  children,
  as = "div",
  gap = "1rem",
  direction = "column",
  ...attributes
}: ContentProps) => {
  return (
    <DynamicTag
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: direction,
        alignItems: "center",
        justifyContent: "center",
        gap: gap,
      }}
      as={as}
      {...attributes}
    >
      {children}
    </DynamicTag>
  );
};

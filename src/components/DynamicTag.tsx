import { JSX, ReactNode } from "react";

type DynamicTagProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  [key: string]: unknown;
};

/**
 * Renders an HTML tag.
 *
 * @param props - The properties for the component.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "dev".
 * @param props.children - The component child elements.
 * @param props.attributes - Attributes associated with the specified "as" prop.
 *
 * @returns An HTML tag.
 */
export const DynamicTag = ({
  as = "div",
  children,
  ...attributes
}: DynamicTagProps) => {
  const Tag = as;
  return <Tag {...attributes}>{children}</Tag>;
};

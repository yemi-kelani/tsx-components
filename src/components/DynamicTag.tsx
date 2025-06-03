import { JSX, ReactNode } from 'react';

export type DynamicTagProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  [key: string]: unknown;
};

/**
 * Renders an HTML tag.
 *
 * @param props - The properties for the component.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "div".
 * @param props.children - The component child elements.
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns An HTML tag.
 */
export const DynamicTag = ({ as = 'div', children, ...attributes }: DynamicTagProps) => {
  const Tag = as;
  return <Tag {...attributes}>{children}</Tag>;
};

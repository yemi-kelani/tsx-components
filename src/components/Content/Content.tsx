import { JSX, ReactNode } from 'react';
import { DynamicTag } from '../DynamicTag/DynamicTag';

export type ContentProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: string;
  direction?: 'column' | 'row';
  width?: string;
  height?: string;
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
 * @param props.width - Width of content container.
 * @param props.height - Height of content container.
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns An HTML tag.
 */
export const Content = ({
  children,
  as = 'div',
  gap = '1rem',
  direction = 'column',
  width = '100%',
  height = '100%',
  ...attributes
}: ContentProps) => {
  return (
    <DynamicTag
      style={{
        width: width,
        height: height,
        display: 'flex',
        flexDirection: direction,
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap,
      }}
      {...attributes}
      as={as}
    >
      {children}
    </DynamicTag>
  );
};

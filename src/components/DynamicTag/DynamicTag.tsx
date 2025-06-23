import { JSX, ReactNode, forwardRef } from 'react';

// Define the base props for DynamicTag
export interface DynamicTagProps {
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * A polymorphic component that renders any HTML element based on the `as` prop.
 * Provides flexibility to render different HTML elements with proper forwarded refs.
 *
 * @param props - The properties for the component.
 * @param props.as - An HTML tag type. Must be a valid HTML element (default: "div").
 * @param props.children - The component child elements.
 * @param props...attributes - Valid HTML attributes for the specified element type.
 * @param ref - Forward ref to the underlying HTML element.
 *
 * @returns The specified HTML element with proper ref forwarding.
 *
 * @example
 * ```tsx
 * // Renders a div (default)
 * <DynamicTag>Content</DynamicTag>
 *
 * // Renders a button
 * <DynamicTag as="button" onClick={handleClick}>
 *   Click me
 * </DynamicTag>
 *
 * // Renders an input
 * <DynamicTag as="input" type="text" placeholder="Enter text" />
 * ```
 */
export const DynamicTag = forwardRef<HTMLElement, DynamicTagProps>(
  ({ as: Component = 'div', children, ...attributes }, ref) => {
    // Filter out React-specific props that shouldn't reach HTML elements
    const filteredAttributes = Object.entries(attributes).reduce((acc, [key, value]) => {
      // Skip React-specific props
      if (key === 'key' || key === 'ref') {
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {} as any);

    // Cast Component to any to avoid the union type complexity
    const TagComponent = Component as any;

    return (
      <TagComponent ref={ref} {...filteredAttributes}>
        {children}
      </TagComponent>
    );
  },
);

// Set display name for better debugging
DynamicTag.displayName = 'DynamicTag';

import './HoverTip.scss';
import { ReactNode } from 'react';

export type HoverTipProps = {
  tip: string;
  tipPosition?: 'top' | 'left' | 'right' | 'bottom';
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
};

/**
 * Renders a BoomerangButton whose appearance oscillates between a primary and secondary state after each click.
 * Both the content and the tip field has a primary and secondary state. Hovering over the button reveals a the
 * specified tip.
 *
 * @param props - The properties for the component.
 * @param props.tip - On hover message to be displayed.
 * @param props.tipPosition - Position of the tip revealed on hover. ["top" | "left" | "right" | "bottom"].
 * @param props.children - The component child elements.
 * @param props.className - Additional className(s) prescribed to the component.
 * @param props... (key: string) attributes associated with the button tag.
 *
 * @returns A Code component element.
 */
export const HoverTip = ({
  tip,
  tipPosition = 'top',
  children,
  className,
  ...attributes
}: HoverTipProps) => {
  return (
    <div
      {...attributes}
      className={
        className
          ? `tsx-cmpnt-hovertip tsx-cmpnt-hovertip-position-${tipPosition} ${className}`
          : `tsx-cmpnt-hovertip tsx-cmpnt-hovertip-position-${tipPosition}`
      }
    >
      <span className="tsx-cmpnt-hovertip-tip-text">{tip}</span>
      {children}
    </div>
  );
};

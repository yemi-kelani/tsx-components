import "./Placeholder.scss";
import { ReactNode, JSX } from "react";
import { DynamicTag } from "../DynamicTag";

type PlaceholderProps = {
  size?: "small" | "medium" | "large" | undefined;
  style?: React.CSSProperties;
  animate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

/**
 * Renders an Placeholder animates. To be used as a placeholder.
 *
 * @param props - The properties for the component.
 * @param props.size - Size of the placeholder. One of ["small" | "medium" | "large" | undefined].
 * @param props.style - A style object containing css properties.
 * @param props.animate - Whether or not to animate the background.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "span".
 * @param props.children - The component child elements.
 * @param props.className - Additional className(s) prescribed to the component.
 * @param props... (key: string) attributes associated with the "as" prop tag.
 *
 * @returns A Placeholder component element.
 */
export const Placeholder = ({
  size = "medium",
  style,
  animate = true,
  as = "span",
  children,
  className = "",
  ...attributes
}: PlaceholderProps) => {
  const styles = {
    small: {
      width: "100%",
      height: "300px",
      maxHeight: "100%",
    },
    medium: {
      width: "100%",
      height: "450px",
      maxHeight: "100%",
    },
    large: {
      width: "100%",
      height: "600px",
      maxHeight: "100%",
    },
  };

  return (
    <DynamicTag
      {...attributes}
      as={as}
      style={size && !style ? styles[size] : (style ?? {})}
      className={ 
        animate 
        ? `${className} tsx-cmpnts-placeholder tsx-cmpnts-placeholder-shimmer-animator`
        : `${className} tsx-cmpnts-placeholder`
      }>
      {children}
    </DynamicTag>
  );
};

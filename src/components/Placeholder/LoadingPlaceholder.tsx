import "./Placeholder.scss";
import { JSX, ReactNode } from "react";
import { Spinner } from "./Spinner";
import { Placeholder } from "./Placeholder";

export type LoadingPlaceholderProps = {
  icon?: ReactNode;
  size?: "small" | "medium" | "large" | undefined;
  style?: React.CSSProperties;
  animate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
};

/**
 * Renders an LoadingPlaceholder animates. To be used as a placeholder.
 *
 * @param props - The properties for the component.
 * @param props.icon - FontAwesome IconDefinition. Default is FontAwesome faSpinner.
 * @param props.size - Size of the placeholder. One of ["small" | "medium" | "large" | undefined].
 * @param props.style - A style object containing css properties.
 * @param props.animate - Whether or not to animate the background.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "span".
 * @param props... (key: string) attributes associated with the button tag.
 *
 * @returns A Code component element.
 */
export const LoadingPlaceholder = ({
  icon = <Spinner/>,
  size = "medium",
  style,
  animate = true,
  as = "span",
  ...attributes
}: LoadingPlaceholderProps) => {
  const styles = {
    small: {
      width: "100%",
      height: "300px",
    },
    medium: {
      width: "100%",
      height: "450px",
    },
    large: {
      width: "100%",
      height: "600px",
    },
  };

  return (
    <Placeholder
      {...attributes}
      as={as}
      animate={animate}
      style={size && !style ? styles[size] : (style ?? {})}>
      {icon}
    </Placeholder>
  );
};

import "./Placeholder.scss";
import "./LoadingPlaceholder.scss";
import { JSX, ReactNode } from "react";
import { DynamicTag } from "../DynamicTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type LoadingPlaceholderProps = {
  icon?: IconDefinition; // https://fontawesome.com/search?q=spin&o=r&ic=free&s=solid&ip=classic
  iconSize?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  customIcon?: ReactNode;
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
 * @param props.iconSize - Size of the faIcon in the placeholder. String compatible with a FontAwesome size, i.e. "2x". Default is "1x".
 * @param props.customIcon - A custom ReactNode to in place of a FontAwesome icon.
 * @param props.size - Size of the placeholder. One of ["small" | "medium" | "large" | undefined].
 * @param props.style - A style object containing css properties.
 * @param props.animate - Whether or not to animate the background.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "span".
 * @param props... (key: string) attributes associated with the button tag.
 *
 * @returns A Code component element.
 */
export const LoadingPlaceholder = ({
  icon = faCircleNotch,
  iconSize = "1x",
  customIcon,
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
    <DynamicTag
      as={as}
      style={size && !style ? styles[size] : (style ?? {})}
      className={
        animate
          ? "tsx-cmpnts-loading-placeholder tsx-cmpnts-placeholder-shimmer-animator"
          : "tsx-cmpnts-loading-placeholder"
      }
      {...attributes}
    >
      {icon && !customIcon && (
        <FontAwesomeIcon icon={icon} size={iconSize} spin={true} />
      )}
      {
        customIcon &&
        <span></span>
      }
    </DynamicTag>
  );
};

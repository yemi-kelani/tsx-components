import "./Placeholder.scss";
import { JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Placeholder } from "./Placeholder";

export type ImagePlaceholderProps = {
  size?: "small" | "medium" | "large" | undefined;
  iconSize?: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
  style?: React.CSSProperties;
  animate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
};

/**
 * Renders an ImagePlaceholder animates. To be used as a placeholder.
 *
 * @param props - The properties for the component.
 * @param props.size - Size of the placeholder. One of ["small" | "medium" | "large" | undefined].
 * @param props.iconsSize - Size of the icon in the placeholder. String compatible with a FontAwesome size, i.e. "2x". Default is "1x".
 * @param props.style - A style object containing css properties.
 * @param props.animate - Whether or not to animate the background.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "span".
 * @param props... (key: string) attributes associated with the "as" prop tag.
 *
 * @returns A ImagePlaceholder component element.
 */
export const ImagePlaceholder = ({
  size = "medium",
  iconSize = "1x",
  style,
  animate = true,
  as = "span",
  ...attributes
}: ImagePlaceholderProps) => {
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
    <Placeholder
      {...attributes}
      as={as}
      animate={animate}
      style={size && !style ? styles[size] : (style ?? {})}
    >
      <FontAwesomeIcon icon={faImage} size={iconSize} />
    </Placeholder>
  );
};

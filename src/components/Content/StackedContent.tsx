import { ReactNode, JSX } from "react";
import "./StackedContent.scss";

export type StackedContentProps = {
  topContent: ReactNode;
  bottomContent: ReactNode;
  className?: string;
  topClassName?: string;
  bottomClassName?: string;
  gap?: string | number;
};

/**
 * Layout component that stacks two blocks vertically (top and bottom).
 *
 * @param props - Component props.
 * @param props.topContent - ReactNode to render on top.
 * @param props.bottomContent - ReactNode to render on the bottom.
 * @param props.className - Optional additional class names for the container.
 * @param props.topClassName - Optional additional class names for the top container.
 * @param props.bottomClassName - Optional additional class names for the bottom container.
 * @param props.gap - Optional vertical spacing between the top and bottom blocks (e.g., "1rem", 16).
 *
 * @returns A JSX.Element stacking top and bottom content.
 */
export const StackedContent = ({
  topContent,
  bottomContent,
  className = "",
  topClassName = "",
  bottomClassName = "",
  gap = "1rem"
}: StackedContentProps): JSX.Element => {
  return (
    <div
      className={`tsx-cmpnt-stacked-content-container ${className}`}
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      <div className={`tsx-cmpnt-stacked-content-top ${topClassName}`}>{topContent}</div>
      <div className={`tsx-cmpnt-stacked-content-bottom ${bottomClassName}`}>{bottomContent}</div>
    </div>
  );
};

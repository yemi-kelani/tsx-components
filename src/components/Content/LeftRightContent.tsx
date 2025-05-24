import { ReactNode, JSX } from "react";
import "./LeftRightContent.css";

export type LeftRightContentProps = {
    leftContent: ReactNode;
    rightContent: ReactNode;
    className?: string;
    shrinkLeft?: boolean;
    shrinkRight?: boolean;
};

/**
 * Layout component displaying two sections side-by-side or stacked responsively.
 *
 * @param props - Component properties.
 * @param props.leftContent - ReactNode to render on the left side.
 * @param props.rightContent - ReactNode to render on the right side.
 * @param props.className - Optional additional className(s) for the container.
 * @param props.shrinkLeft - If true, left content shrinks and right content enlarges.
 * @param props.shrinkRight - If true, right content shrinks and left content enlarges.
 *
 * @returns JSX.Element rendering left and right content areas.
 */
export const LeftRightContent = ({
    leftContent,
    rightContent,
    className = "",
    shrinkLeft = false,
    shrinkRight = false,
}: LeftRightContentProps): JSX.Element => {
    let leftClass = shrinkLeft
        ? "tsx-cmpnt-left-right-content-shrink-left"
        : shrinkRight
            ? "tsx-cmpnt-left-right-content-expand-left"
            : "tsx-cmpnt-left-right-content-left";

    let rightClass = shrinkRight
        ? "tsx-cmpnt-left-right-content-shrink-right"
        : shrinkLeft
            ? "tsx-cmpnt-left-right-content-expand-right"
            : "tsx-cmpnt-left-right-content-right";

    if (shrinkLeft === shrinkRight) {
        leftClass = "tsx-cmpnt-left-right-content-left";
        rightClass = "tsx-cmpnt-left-right-content-right";
    }

    return (
        <div className={`tsx-cmpnt-left-right-content-container ${className}`}>
            <div className={leftClass}>{leftContent}</div>
            <div className={rightClass}>{rightContent}</div>
        </div>
    );
};

import "./BommerangButton.scss";
import { useState, ReactNode } from "react";

type BoomerangButtonProps = {
  tip: [string, string];
  content: [ReactNode, ReactNode];
  handleClick: () => void;
  tipPosition?: "top" | "left" | "right" | "bottom";
  className?: string;
  [key: string]: unknown;
};

/**
 * Renders a BoomerangButton whose appearance oscillates between a primary and secondary state after each click.
 * Both the content and the tip field has a primary and secondary state. Hovering over the button reveals a the
 * specified tip.
 *
 * @param props - The properties for the component.
 * @param props.tip - On hover messages to be displayed. An array of primary and secondary string elements. 
 * Displayed before and after clicking respectively.
 * @param props.content - An array containing a primary and secondary ReactNode element. 
 * Displayed before and after clicking respectively.
 * @param props.handleClick - The function to be executed when the button is clicked. Must support multiple executions.
 * @param props.tipPosition - Position of the tip revealed on hover. ["top" | "left" | "right" | "bottom"].
 * @param props.className - Additional className(s) prescribed to the component.
 * @param props... (key: string) attributes associated with the button tag.
 *
 * @returns A Code component element.
 */
export const BoomerangButton = ({
  tip,
  content,
  handleClick,
  tipPosition = "top",
  className,
  ...attributes
}: BoomerangButtonProps) => {
  const [clicked, setClicked] = useState(false);

  const flipClicked = () => {
    if (!clicked) {
      setClicked(true);
      if (handleClick !== undefined) {
        handleClick();
        setTimeout(() => {
          setClicked(false);
        }, 750);
      }
    }
  };

  return (
    <button
      className={
        className
          ? `tsx-cmpnt-boomerang-button tsx-cmpnt-boomerang-position-${tipPosition} ${className}`
          : `tsx-cmpnt-boomerang-button tsx-cmpnt-boomerang-position-${tipPosition}`
      }
      onClick={flipClicked}
      {...attributes}>
      <span className="tsx-cmpnt-boomerang-button-tip-text">
        {clicked ? tip[1] : tip[0]}
      </span>
      {clicked ? content[1] : content[0]}
    </button>
  );
};

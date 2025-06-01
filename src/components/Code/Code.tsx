import "./Code.scss";
import { Gist } from "./Gist";
import { BoomerangButton } from "../BoomerangButton/BoomerangButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export type CodeProps = {
  type: "basic" | "gist";
  text?: string;
  language?: string;
  gistID?: string;
  gistFile?: string;
  theme?: "light" | "dark";
  caption?: string;
  lineNumbers?: boolean;
  className?: string;
  [key: string]: unknown;
};

/**
 * Renders a code snippet block with optional line numbers, GitHub Gist integration, and theme customization.
 *
 * Supports two display modes:
 * - `"basic"`: Displays a local code block using <pre><code> with optional syntax highlighting and a copy button.
 * - `"gist"`: Embeds a GitHub Gist via its ID and optionally a specific file within the Gist.
 *
 * Additional customization includes themes, language labels, captions, and line number rendering.
 *
 * @param props - The properties for the component.
 * @param props.type - The display mode: either `"basic"` for a local code block or `"gist"` for a GitHub Gist.
 * @param props.text - The code to display (only used if `type` is `"basic"`).
 * @param props.language - Optional language label used for styling or syntax hints.
 * @param props.gistID - The GitHub Gist ID (required if `type` is `"gist"`).
 * @param props.gistFile - The specific file in the Gist to display (optional).
 * @param props.theme - Theme for the code block. Either `"light"` or `"dark"`.
 * @param props.caption - Optional caption displayed below the code block.
 * @param props.lineNumbers - Whether to display line numbers in the code block.
 * @param props.className - Additional CSS classes for the outer container.
 * @param props.(key: string) - Additional attributes to apply to the outer `<figure>` element.
 *
 * @returns A rendered <figure> element containing the code block or embedded Gist.
 */
export const Code = ({
  type,
  text,
  language,
  gistID,
  gistFile,
  theme,
  caption,
  lineNumbers = false,
  className,
  ...attributes
}: CodeProps) => {
  const addLineNums = (text: string) => {
    if (text) {
      let lines: string[] = text.split("\n");
      lines = lines.map((line, i) => `${i + 1}. ${line}`);
      const updatedText: string = lines.join("\n");
      return String.raw`${updatedText}`;
    }
    return text;
  };

  return (
    <figure
      {...attributes}
      className={
        className
          ? `tsx-cmpnt-code-container tsx-cmpnt-code-type-${type} ${className}`
          : `tsx-cmpnt-code-container tsx-cmpnt-code-type-${type}`
      }>
      {type !== "gist" && (
        <BoomerangButton
          tip={["copy", "copied"]}
          tipPosition="top"
          content={[
            <FontAwesomeIcon
              className={`tsx-cmpnt-code-btn-icon-${theme ?? ""}`}
              icon={faClone}
            />,
            <FontAwesomeIcon
              className={`tsx-cmpnt-code-btn-icon-${theme ?? ""}`}
              icon={faCheck}
            />,
          ]}
          className={`tsx-cmpnt-code-btn-copy tsx-cmpnt-code-btn-theme-${theme ?? ""}`}
          handleClick={() => {
            navigator.clipboard.writeText(text ?? "");
          }}
        />
      )}
      {type === "gist" && gistID && <Gist id={gistID} file={gistFile} />}
      {type === "basic" && (
        <pre className={`preblock-${language ?? ""} tsx-cmpnt-code-pre-theme-${theme ?? ""}`}>
          <code className={`text-${language ?? ""} tsx-cmpnt-code-code-theme-${theme ?? ""}`}>
            {lineNumbers ? addLineNums(text ?? "") : String.raw`${text ?? ""}`}
          </code>
        </pre>
      )}
      <div>
        {language && (
          <i className="tsx-cmpnt-code-lang-label">
            <small>{language?.toLowerCase()}</small>
          </i>
        )}
        {caption && (
          <figcaption style={{ fontSize: "smaller" }}>{caption}</figcaption>
        )}
      </div>
    </figure>
  );
};

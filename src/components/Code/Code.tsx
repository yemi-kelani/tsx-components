import "./Code.scss";
import { Gist } from "./Gist";
import { BoomerangButton } from "../BoomerangButton/BoomerangButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type CodeProps = {
  type: "basic" | "highlight" | "gist";
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

// Code **********************************************************************
// Displays Github Gist code as a well as local code blocks. Code blocks need
// to preseve white space (use `` strings) and should be used on small blocks.
/**
 * Renders the child elements within a specified HTML tag. The default tag is "dev".
 * Content is automatically centered.
 *
 * @param props - The properties for the component.
 * @param props.type -
 * @param props.text -
 * @param props.language -
 * @param props.gistID -
 * @param props.gistFile -
 * @param props.theme -
 * @param props.caption -
 * @param props.className -
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns A Code component element.
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
      {/* {
            type === "highlight" &&
            <SyntaxHighlighter
                language={language}
                style={solarizedlight}
                showLineNumbers={true}>
                {lineNumbers ? addLineNums(text ?? "") : String.raw`${text ?? ""}`}
            </SyntaxHighlighter>
        } */}
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

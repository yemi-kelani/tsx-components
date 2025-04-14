import Gist from "react-gist";

type CodeProps = {
  type: "basic" | "highlight" | "gist";
  text: string;
  gistID?: string | number;
  language?: string;
  color?: "light" | "dark";
  caption?: string;
  className?: string;
};

// Code **********************************************************************
// Displays Github Gist code as a well as local code blocks. Code blocks need
// to preseve white space (use `` strings) and should be used on small blocks.
/**
 * Renders the child elements within a specified HTML tag. The default tag is "dev".
 * Content is automatically centered.
 *
 * @param props - The properties for the component.
 * @param props.as - An HTML tag type as a string. A key of JSX.IntrinsicElements, i.e. div, p, etc. Default is "dev".
 * @param props.children - The component child elements.
 * @param props.gap - Gap spacing (as string) between elements in content container.
 * @param props.direction - Flex direction of elements in content container.
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns A Code component element.
 */
export const Code = ({
  type,
  gistID,
  text,
  language,
  color,
  caption,
  className,
  ...attributes
}: CodeProps) => {
  return (
    <code
      className={
        className
          ? `tsx-cmpnt-code-container tsx-cmpnt-code-type-${type} ${className}`
          : `tsx-cmpnt-code-container tsx-cmpnt-code-type-${type}`
      }
      {...attributes}
    >
        <Tool
            toolTip={["copy", "copied"]}
            tipPosition="top"
            content={[
              <i className="fa-regular fa-clone"></i>,
              <i className="fa-solid fa-check"></i>,
            ]}
            classNames="btn-highlighted btn-copy"
            toolFunction={() => {
              navigator.clipboard.writeText(text);
            }}/>
      {}
      <caption style={{ fontSize: "smaller" }}>{ caption }</caption>
    </code>
  );

  let returnBlock;

  switch (type) {
    case "gist":
      returnBlock = (
        <div className="tsx-cmpnt-code-container" style={style}>
          <Gist id={gistID} />
          <caption style={{ fontSize: "smaller" }}>{caption}</caption>
        </div>
      );
      break;
    case "highlight":
      returnBlock = (
        <div className="code-container type-highlight">
          <Tool
            toolTip={["copy", "copied :)"]}
            tipPosition="top"
            content={[
              <i class="fa-regular fa-clone"></i>,
              <i className="fa-solid fa-check"></i>,
            ]}
            classNames="btn-highlighted btn-copy"
            toolFunction={() => {
              navigator.clipboard.writeText(text);
            }}
          />
          <SyntaxHighlighter
            language={language}
            style={solarizedlight}
            showLineNumbers={true}
          >
            {String.raw`${text}`}
          </SyntaxHighlighter>
          <caption style={{ fontSize: "smaller" }}>{caption}</caption>
        </div>
      );
      break;
    case "basic":
      const processedBlock = String.raw`${text}`;
      const preClassName = `preblock-${language ?? ""}`;
      const codeClassName = `text-${language ?? ""}`;
      returnBlock = (
        <div className="code-container">
          <Tool
            toolTip={["copy", "copied :)"]}
            tipPosition="top"
            content={[
              <i id={`icon-code-${color}`} className="fa-regular fa-clone"></i>,
              <i id={`icon-code-${color}`} className="fa-solid fa-check"></i>,
            ]}
            IDs={`btn-colored-${color}`}
            classNames="btn-copy"
            toolFunction={() => {
              navigator.clipboard.writeText(processedBlock);
            }}
          />
          <pre className={preClassName} id={color}>
            <code className={codeClassName} id={color}>
              {processedBlock}
            </code>
          </pre>
          <caption style={{ fontSize: "smaller" }}>{caption}</caption>
        </div>
      );
      break;
    default:
      returnBlock = (
        <div className="code-container">
          <pre className="pre-undefined">
            <code className="code-undefined">Error: Undefined code-block.</code>
          </pre>
        </div>
      );
  }

  return returnBlock;
};

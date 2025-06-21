import React from 'react';
import parse from 'html-react-parser';
import { BulletPoints, ComplexBulletPoint } from '../../BulletPoints/BulletPoints';
import { DynamicTag } from '../../DynamicTag/DynamicTag';
import './Text.css';

type TextProps = {
  content: (string | ComplexBulletPoint)[];
  style?: React.CSSProperties;
  sectionTitle?: string;
  sectionSubTitle?: string;
  indent?: boolean;
  textAlign?: React.CSSProperties['textAlign'];
  borderColor?: React.CSSProperties['color'];
};

/**
 * Renders structured text content with optional section titles and nested bullet points.
 * Accepts both plain strings and complex entries (with HTML and bullet lists).
 * Supports semantic sectioning, indentation, and text alignment.
 *
 * @param props - The properties for the component.
 * @param props.text - An array of strings or `ComplexBulletPoint` objects representing paragraph content.
 * @param props.style - Optional inline styles applied to the text container.
 * @param props.sectionTitle - Optional main section heading. Renders an <h2> with an <hr> separator.
 * @param props.sectionSubTitle - Optional subheading shown in an <h2> when `sectionTitle` is not provided.
 * @param props.indent - Whether to apply text indentation to paragraphs (default: true).
 * @param props.textAlign - Controls horizontal text alignment. Defaults to "justify".
 * @param props.borderColor - A string representing a React CSSProperties color for the hr divider.
 *
 * @returns A semantic text content block as a <section> or <div> with proper accessibility and layout.
 */
export const Text = ({
  content,
  style,
  sectionTitle,
  sectionSubTitle,
  indent = true,
  textAlign = 'justify',
  borderColor = 'black',
}: TextProps) => {
  const renderEntry = (entry: string | ComplexBulletPoint, index: number) => {
    if (typeof entry === 'object' && !Array.isArray(entry)) {
      const { text, listType, listStyleType, subBulletList } = entry;
      const isHTML = /^<.+>$/.test(text);
      return (
        <React.Fragment key={index}>
          {isHTML ? parse(text) : text}
          <BulletPoints
            listType={listType}
            listStyleType={listStyleType}
            bulletList={subBulletList}
          />
        </React.Fragment>
      );
    }

    const isHTML = typeof entry === 'string' && /^<.+>$/.test(entry);
    return <React.Fragment key={index}>{isHTML ? parse(entry) : entry}</React.Fragment>;
  };

  const formatAsID = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const sectionID =
    sectionTitle || sectionSubTitle
      ? `tsx-cmpnt-text-section-title-${formatAsID((sectionTitle || sectionSubTitle) ?? '')}`
      : undefined;

  return (
    <DynamicTag
      as={sectionID ? 'section' : 'div'}
      className="tsx-cmpnt-text-container"
      role="region"
      aria-labelledby={sectionID}
    >
      <div style={{ width: '100%' }}>
        {sectionTitle && (
          <>
            <h2 id={sectionID} style={{ textAlign }}>
              {sectionTitle}
            </h2>
            <hr aria-hidden="true" style={{ borderColor }} />
          </>
        )}
        {!sectionTitle && sectionSubTitle && (
          <>
            <h3 id={sectionID} style={{ textAlign }}>
              {sectionSubTitle}
            </h3>
            <br />
          </>
        )}
      </div>
      <div className={indent ? 'tsx-cmpnt-text-indent' : ''} style={{ textAlign, ...style }}>
        {content.map(renderEntry)}
      </div>
    </DynamicTag>
  );
};
import { DynamicTag } from '../DynamicTag/DynamicTag';
import parse from 'html-react-parser';

export type OLType =
  | 'armenian'
  | 'cjk-ideographic'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'georgian'
  | 'hebrew'
  | 'hiragana'
  | 'hiragana-iroha'
  | 'katakana'
  | 'katakana-iroha'
  | 'lower-alpha'
  | 'lower-greek'
  | 'lower-latin'
  | 'lower-roman'
  | 'upper-alpha'
  | 'upper-latin'
  | 'upper-roman'
  | 'none'
  | 'inherit';

export type ULType = 'disc' | 'circle' | 'square';

export type listStyleType = OLType | ULType;

export interface ComplexBulletPoint {
  text: string;
  listType: 'ul' | 'ol';
  listStyleType: listStyleType;
  subBulletList: BulletPoint[];
}

export type BulletPoint = ComplexBulletPoint | string;

export type BulletPointsProps = {
  listType: 'ul' | 'ol';
  listStyleType: listStyleType;
  bulletList: BulletPoint[];
  [key: string]: unknown;
};

/**
 * Renders a BulletPoints list component.
 *
 * @param props - The properties for the component.
 * @param props.listType - The list type, one of ["ul", "ol"], containing the bullet points.
 * @param props.listStyleType - The type of bullet point style decorator associated with the specified "listType" tag ("ul" | "ol").
 * @param props.bulletList - An array of type BulletPoint.
 * @param props... (key: string) attributes associated with the specified "listType" tag ("ul" | "ol").
 *
 * @returns A BulletPoints component.
 */
export const BulletPoints = ({
  listType,
  listStyleType,
  bulletList,
  ...attributes
}: BulletPointsProps) => {
  const bulletpoints = bulletList.map((bulletpoint) => {
    if (typeof bulletpoint === 'object' && !Array.isArray(bulletpoint)) {
      return (
        <li key={bulletpoint.toString()}>
          {typeof bulletpoint.text === 'string' &&
          bulletpoint.text[0] === '<' &&
          bulletpoint.text[bulletpoint.text.length - 1] === '>'
            ? parse(bulletpoint.text)
            : bulletpoint.text}
          <BulletPoints
            listType={bulletpoint.listType}
            listStyleType={bulletpoint.listStyleType}
            bulletList={bulletpoint.subBulletList}
          />
        </li>
      );
    } else if (
      typeof bulletpoint === 'string' &&
      bulletpoint[0] === '<' &&
      bulletpoint[bulletpoint.length - 1] === '>'
    ) {
      return <li key={bulletpoint.toString()}>{parse(bulletpoint)}</li>;
    } else {
      return <li key={bulletpoint.toString()}>{bulletpoint}</li>;
    }
  });

  return (
    <div className=".tsx-cmpnt-bullet-points-container">
      <DynamicTag {...attributes} as={listType} style={{ listStyleType: listStyleType }}>
        {bulletpoints}
      </DynamicTag>
    </div>
  );
};

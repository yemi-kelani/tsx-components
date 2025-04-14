import {
  HTMLAttributes,
  JSX,
  ReactNode,
  ComponentPropsWithoutRef,
} from "react";

// type HTMLTag = keyof JSX.IntrinsicElements;

// type ContentProps <T extends HTMLTag = 'div'> = {
//     content: ReactNode
//     as?: T;
//     attributes?: HTMLAttributes<HTMLDivElement>;
// } & ComponentPropsWithoutRef<T>;

// export const Content = <T extends HTMLTag = 'div'>({ content, as = "div", attributes }: ContentProps<T>) => {
//     const Tag = as;
//     return (
//         <Tag
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column"
//             }}
//             {...attributes}
//         >
//             {content}
//         </Tag>
//     );
// };

import React from "react";

type DynamicWrapperProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const DynamicWrapper = ({
  as = "div",
  children,
  ...attributes
}: DynamicWrapperProps) => {
  const Tag = as;
  return <Tag {...attributes}>{children}</Tag>;
};

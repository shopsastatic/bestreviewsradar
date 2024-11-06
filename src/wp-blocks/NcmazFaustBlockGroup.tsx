import { NcmazFaustBlockGroupFragmentFragment } from "@/__generated__/graphql";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import { gql } from "@apollo/client";
import { WordPressBlock, getStyles, useBlocksTheme } from "@faustwp/blocks";
import React from "react";
//
const NcmazFaustBlockGroup: WordPressBlock<
  NcmazFaustBlockGroupFragmentFragment
> = (defaultProps) => {
  const props = {
    ...(defaultProps || {}),
    attributes: defaultProps?.aliasAttributes,
  };

  // get the BlocksTheme object
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });

  const { aliasAttributes: attributes } = props || {};
  const { className, hasBackground, variation } = attributes || {};

  return (
    <div
      className={`NcmazFaustBlockGroup relative not-prose ${className || ""}`}
      style={style}
    >
      {/* @ts-ignore */}
      <MyWordPressBlockViewer blocks={props.children} />
    </div>
  );
};

export const NcmazFaustBlockGroupFragments = {
  entry: gql`
    fragment NcmazFaustBlockGroupFragment on NcmazFaustBlockGroup {
      aliasAttributes: attributes {
        style
        variation
        hasBackground
        className
      }
    }
  `,
  key: `NcmazFaustBlockGroupFragment`,
};

NcmazFaustBlockGroup.displayName = "NcmazFaustBlockGroup";
export default NcmazFaustBlockGroup;

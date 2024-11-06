import { gql } from "@apollo/client";
import { NcmazFaustBlockTermsFragmentFragment } from "../__generated__/graphql";
import { WordPressBlock } from "@faustwp/blocks";
import Empty from "@/components/Empty";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";


const NcmazFaustBlockTerms: WordPressBlock<
  NcmazFaustBlockTermsFragmentFragment & {
    renderedHtml?: string;
    clientId?: string;
    parentClientId?: string;
  }
> = (props: any) => {
  const { blockVariation, hasBackground } = props.attributes || {};

  if (!props.renderedHtml) {
    return null;
  }

  let dataObject = null;
  try {
    // <div hidden> {json here} </div>
    // use regex to remove the div tags
    const jsontext = props.renderedHtml.replace(
      /<div data-block-json-wrap hidden>|<\/div>/g,
      ""
    );
    dataObject = JSON.parse(jsontext);
  } catch (error) {}

  return (
    <div className={`relative not-prose ${hasBackground ? "py-16" : ""}`}>
      {dataObject === null && (
        <div dangerouslySetInnerHTML={{ __html: props.renderedHtml }} />
      )}

      {!!props.renderedHtml && (
        <Content
          blockVariation={blockVariation}
          renderedHtml={props.renderedHtml}
          dataObject={dataObject}
        />
      )}
    </div>
  );
};

function Content({
  blockVariation,
  dataObject,
  renderedHtml,
}: {
  blockVariation?: string | null;
  renderedHtml: string;
  dataObject?: {
    block_terms: any;
    errors?: Record<string, any>[];
  } | null;
}) {
  const [dataInitTerms_state, setDataInitTerms_state] = useState<
    any
  >([]);
  const [dataInitErrors_state, setDataInitErrors_state] =
    useState<Record<string, any>[]>();
  //
  const dataInitTerms = dataObject?.block_terms || dataInitTerms_state;
  const dataInitErrors = dataObject?.errors || dataInitErrors_state;
  //

  useEffect(() => {
    if (typeof window === "undefined" || dataObject !== null) {
      return;
    }

    // Deprecated, will be removed in future official versions!!!
    // Deprecated, will be removed in future official versions!!!
    const renderedHtmlNode = document.createElement("div");
    renderedHtmlNode.innerHTML = renderedHtml;

    const contentNode = renderedHtmlNode.querySelector(
      ".ncmazfc-block-content-common-class"
    );

    const dataInitTerms: any = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-terms") || "null"
    );
    const dataInitErrors = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-errors") || "null"
    );

    setDataInitTerms_state(dataInitTerms);
    setDataInitErrors_state(dataInitErrors);
  }, []);

  return (
    <TermBlockLayoutType
      dataInitTerms={dataInitTerms}
      dataInitErrors={dataInitErrors}
      blockVariation={blockVariation}
    />
  );
}

export function TermBlockLayoutType({
  dataInitErrors,
  dataInitTerms,
  blockVariation,
}: {
  dataInitErrors?: Record<string, any>[];
  dataInitTerms?: any;
  blockVariation?: string | null;
}) {
  if (dataInitErrors) {
    console.error("_____ NcmazFaustBlockTerms: dataInitErrors", {
      blockVariation,
      dataInitErrors,
    });
  }

  if (!dataInitTerms || !dataInitTerms?.length) {
    return <Empty />;
  }

  const dataLists = dataInitTerms;

}

export const NcmazFaustBlockTermsFragments = {
  entry: gql`
    fragment NcmazFaustBlockTermsFragment on NcmazFaustBlockTerms {
      attributes {
        blockVariation
        hasBackground
      }
    }
  `,
  key: `NcmazFaustBlockTermsFragment`,
};

NcmazFaustBlockTerms.displayName = "NcmazFaustBlockTerms";
export default NcmazFaustBlockTerms;

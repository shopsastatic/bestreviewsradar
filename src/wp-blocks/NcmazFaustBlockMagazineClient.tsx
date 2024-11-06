import { useLazyQuery } from "@apollo/client";
import { NcmazFaustBlockMagazineFragmentFragment } from "../__generated__/graphql";
import { WordPressBlock } from "@faustwp/blocks";
import Empty from "@/components/Empty";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { QUERY_GET_POSTS_BY } from "@/fragments/queries";
import updatePostFromUpdateQuery from "@/utils/updatePostFromUpdateQuery";
import errorHandling from "@/utils/errorHandling";
import { useEffect, useState } from "react";
import getTrans from "@/utils/getTrans";
//

const NcmazFaustBlockMagazineClient: WordPressBlock<
  NcmazFaustBlockMagazineFragmentFragment & {
    renderedHtml?: string;
    clientId?: string;
    parentClientId?: string;
    dataObject?: {
      block_posts?: any;
      errors?: any[];
      queryVariables?: Record<string, any>;
      pageInfo?: {
        endCursor: string;
        hasNextPage: boolean;
      };
    } | null;
  }
> = ({ attributes, clientId, parentClientId, renderedHtml, dataObject }) => {
  const { blockVariation, hasBackground } = attributes || {};

  const [queryGetPostByVariablesFromSSR, getPostByVariablesFromSSRResult] =
    useLazyQuery(QUERY_GET_POSTS_BY, {
      notifyOnNetworkStatusChange: true,
      context: {
        fetchOptions: {
          method: process.env.NEXT_PUBLIC_SITE_API_METHOD || "GET",
        },
      },
      onError: (error) => {
        errorHandling(error);
      },
    });

  const T = getTrans();

  const [dataInitPosts_state, setDataInitPosts_state] = useState<
    any[] | null
  >();
  const [dataInitErrors_state, setDataInitErrors_state] = useState<
    any[] | null
  >();
  const [dataInitQueryVariable_state, setDataInitQueryVariable_state] =
    useState<any | null>();
  const [dataInitPageInfo_state, setDataInitPageInfo_state] = useState<{
    endCursor: string;
    hasNextPage: boolean;
  } | null>();

  //
  const dataInitPosts = dataObject?.block_posts || dataInitPosts_state;
  const dataInitErrors = dataObject?.errors || dataInitErrors_state;
  const dataInitQueryVariable =
    dataObject?.queryVariables || dataInitQueryVariable_state;
  const dataInitPageInfo = dataObject?.pageInfo || dataInitPageInfo_state;

  //

  useEffect(() => {
    if (typeof window === "undefined" || dataObject !== null) {
      return;
    }
    // Deprecated, will be removed in future official versions!!!
    // Deprecated, will be removed in future official versions!!!
    const renderedHtmlNode = document.createElement("div");
    renderedHtmlNode.innerHTML = renderedHtml || "";
    const contentNode = renderedHtmlNode.querySelector(
      ".ncmazfc-block-content-common-class"
    );

    const dataInitPosts: any = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-posts") || "null"
    );
    const dataInitErrors = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-errors") || "null"
    );
    const dataInitQueryVariable = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-query-variables") || "null"
    );
    const dataInitPageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    } | null = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-data-page-info") || "null"
    );

    setDataInitPosts_state(dataInitPosts);
    setDataInitErrors_state(dataInitErrors);
    setDataInitQueryVariable_state(dataInitQueryVariable);
    setDataInitPageInfo_state(dataInitPageInfo);
  }, []);

  //

  const handleClickLoadmore = () => {
    if (dataInitPageInfo?.hasNextPage !== true) {
      return;
    }

    if (!getPostByVariablesFromSSRResult.called) {
      queryGetPostByVariablesFromSSR({
        variables: {
          ...(dataInitQueryVariable || {}),
          after: dataInitPageInfo?.endCursor,
        },
      });
      return;
    }

    getPostByVariablesFromSSRResult.fetchMore({
      variables: {
        ...(dataInitQueryVariable || {}),
        after: getPostByVariablesFromSSRResult.data?.posts?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return updatePostFromUpdateQuery(prev, fetchMoreResult);
      },
    });
  };

  let dataLists = [
    ...(dataInitPosts || []),
    ...(getPostByVariablesFromSSRResult.data?.posts?.nodes || []),
  ] as any;

  const showLoadmoreButton = !getPostByVariablesFromSSRResult.data?.posts
    ? dataInitPageInfo?.hasNextPage === true
    : getPostByVariablesFromSSRResult.data?.posts?.pageInfo?.hasNextPage ===
      true;

  return (
    <>
      <MagazineLayoutType
        posts={dataLists || []}
        blockVariation={blockVariation}
        error={dataInitErrors || getPostByVariablesFromSSRResult.error}
      />
      {showLoadmoreButton ? (
        <div className="flex mt-12 sm:mt-16 2xl:mt-20 justify-center items-center">
          <ButtonPrimary
            loading={getPostByVariablesFromSSRResult.loading}
            onClick={handleClickLoadmore}
          >
            {T["Show me more"]}
          </ButtonPrimary>
        </div>
      ) : null}
    </>
  );
};

export function MagazineLayoutType({
  posts,
  blockVariation,
  error,
}: {
  posts: any;
  blockVariation?: string | null;
  error: any;
}) {
  if (error) {
    console.error("_____ LayoutType error", { blockVariation, posts, error });
  }

  if (!posts || !posts?.length) {
    return <Empty />;
  }
}

export default NcmazFaustBlockMagazineClient;

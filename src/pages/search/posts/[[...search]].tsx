import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  SearchPageQueryGetPostsBySearchQuery,
} from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import { useRouter } from "next/router";
import useHandleGetPostsArchivePage from "@/hooks/useHandleGetPostsArchivePage";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import { PostDataFragmentType } from "@/data/types";
import GridPostsArchive from "@/components/GridPostsArchive";

const Page: FaustPage<SearchPageQueryGetPostsBySearchQuery> = (props) => {
  const { posts } = props.data || {};

  const router = useRouter();
  const search = router.query.search?.[0] || "";
  const _top10Categories =
    (props.data?.categories?.nodes as any) || [];

  //

  const {
    currentPosts,
    handleChangeFilterPosts,
    handleClickShowMore,
    hasNextPage,
    loading,
  } = useHandleGetPostsArchivePage({
    initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
    initPostsPageInfo: posts?.pageInfo || null,
    search,
  });

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={null}
        pageTitle={"Search"}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        Search
      </PageLayout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 3600,
  });
}

Page.variables = ({ params }) => {
  return {
    search: params?.search?.[0] || null,
    first: GET_POSTS_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query SearchPageQueryGetPostsBySearch( $first: Int,  $search: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    posts(first: $first, where: {search: $search}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      categories(first:10, where: { orderby: COUNT, order: DESC }) {
        nodes {
          ...NcmazFcCategoryFullFieldsFragment
        }
      }
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    # end common query
  }
`);

export default Page;

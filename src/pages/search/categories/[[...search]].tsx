import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcCategoryFullFieldsFragmentFragment,
  SearchPageQueryGetCategoriesBySearchQuery,
} from "@/__generated__/graphql";
import { GET_CATEGORIES_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Empty from "@/components/Empty";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { FOOTER_LOCATION, PRIMARY_LOCATION, SIDEBAR_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import errorHandling from "@/utils/errorHandling";
import getTrans from "@/utils/getTrans";

const Page: FaustPage<SearchPageQueryGetCategoriesBySearchQuery> = (props: any) => {
  const router = useRouter();
  const initCategories = props.data?.categories?.nodes;
  const initPageInfo = props.data?.categories?.pageInfo;
  const search = router.query.search?.[0] || "";
  const T = getTrans();

  const [getCategoriesBySearch, getCategoriesBySearchResult] = useLazyQuery(
    gql(` 
      query queryGetCategoriesBySearchOnSearchPage(
        $first: Int
        $search: String = ""
        $after: String
      ) {
        categories(first: $first, after: $after, where: { search: $search}) {
          nodes {
            ...NcmazFcCategoryFullFieldsFragment
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `),
    {
      notifyOnNetworkStatusChange: true,
      context: {
        fetchOptions: {
          method: process.env.NEXT_PUBLIC_SITE_API_METHOD || "GET",
        },
      },
      variables: {
        search,
        first: GET_CATEGORIES_FIRST_COMMON,
      },
      onError: (error) => {
        errorHandling(error);
      },
    }
  );

  // data for render
  let currentCats = (initCategories ||
    []) as NcmazFcCategoryFullFieldsFragmentFragment[];
  let hasNextPage = initPageInfo?.hasNextPage;
  let loading = false;

  if (getCategoriesBySearchResult.called) {
    currentCats = [
      ...(initCategories || []),
      ...(getCategoriesBySearchResult.data?.categories?.nodes || []),
    ] as NcmazFcCategoryFullFieldsFragmentFragment[];

    hasNextPage =
      getCategoriesBySearchResult.loading ||
      getCategoriesBySearchResult.data?.categories?.pageInfo.hasNextPage ||
      false;
    loading = getCategoriesBySearchResult.loading;
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
      pageFeaturedImageUrl={null}
      pageTitle={"Search"}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      Search
    </PageLayout>
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
    search: params?.search?.[0] || "",
    first: GET_CATEGORIES_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
    sidebarLocation: SIDEBAR_LOCATION
  };
};

Page.query = gql(`
  query SearchPageQueryGetCategoriesBySearch ( $first: Int,  $search: String = "", $after: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $sidebarLocation: MenuLocationEnum!)  {
    categories (first: $first, after: $after, where: {search: $search, }) {
        nodes {
             ...NcmazFcCategoryFullFieldsFragment
        }
        pageInfo {
          endCursor
          hasNextPage
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
    sidebarMenuItems: menuItems(where: {location:$sidebarLocation}, first: 200) {
      nodes {
        ...sidebarMenuFieldsFragment
      }
    }
    # end common query
  }
`);

export default Page;

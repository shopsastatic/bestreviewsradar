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
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";

const Page: FaustPage<SearchPageQueryGetCategoriesBySearchQuery> = (props: any) => {

  // data for render

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
  };
};

Page.query = gql(`
  query SearchPageQueryGetCategoriesBySearch ( $first: Int,  $search: String = "", $after: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum! )  {
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
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
    # end common query
  }
`);

export default Page;

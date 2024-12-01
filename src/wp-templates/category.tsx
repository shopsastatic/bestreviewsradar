import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  PageCategoryGetCategoryQuery,
} from "@/__generated__/graphql";
import PageLayout from "@/container/PageLayout";
import ArchiveLayoutChild from "@/container/archives/ArchieveLayoutChild";
import ArchiveLayout from "@/container/archives/ArchiveLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { PostDataFragmentType } from "@/data/types";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";
import { FaustTemplate } from "@faustwp/core";

const Category: FaustTemplate<PageCategoryGetCategoryQuery> = (props: any) => {

  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  if (!props?.data || !props.data.category) {
    return null;
  }

  // START ----------
  const {
    databaseId,
    description,
    name,
    featuredImageMeta,
    children,
    ancestors,
  } = getCatgoryDataFromCategoryFragment(props.data.category) as any;
  const initPostsPageInfo = props.data?.category?.posts?.pageInfo;
  const posts = props.data?.category?.posts;

  let ances = {
    nodes: ancestors?.nodes?.filter((ancestor: any) => ancestor?.name !== "Arborist Merchandising Root" && ancestor.name !== "Self Service" && ancestor.name !== "Custom Stores")
  };
  let cateName = name;
  if(cateName == "Arborist Merchandising Root" || cateName == "Custom Stores" || cateName == "Self Service") {
    cateName = "";
  }

  let cateChild = {
    nodes: children?.nodes?.filter((child: any) => child?.name !== "Arborist Merchandising Root" && child.name !== "Self Service" && child.name !== "Custom Stores")
  };

  const hasChild = children && Array.isArray(children.nodes) && children.nodes.length > 0;

  if (!hasChild) {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
        pageTitle={props?.data?.category?.seo?.title ?? name}
        pageDescription={props?.data?.category?.seo?.metaDesc || description || ""}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <ArchiveLayoutChild name={cateName} ancestors={ances} initPosts={posts?.nodes as PostDataFragmentType[] | null}></ArchiveLayoutChild>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
      pageTitle={props?.data?.category?.seo?.title ?? name}
      pageDescription={props?.data?.category?.seo?.metaDesc || description || ""}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <ArchiveLayout
        name={name}
        initPosts={posts?.nodes as PostDataFragmentType[] | null}
        initPostsPageInfo={initPostsPageInfo}
        categoryDatabaseId={databaseId}
        taxonomyType="category"
        childs={cateChild?.nodes}
      ></ArchiveLayout>
    </PageLayout>
  );
};

Category.variables = ({ id }) => ({
  id,
  headerLocation: PRIMARY_LOCATION,
  footerLocation: FOOTER_LOCATION,
});

Category.query = gql(`
query PageCategoryGetCategory($id: ID!, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!)  {
    category(id: $id) {
       ...NcmazFcCategoryFullFieldsFragment
       posts(first: 9, where: {orderby: {field: DATE, order: DESC}}) {
         nodes {
           ...ChildCategoryPosts
         }
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
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 40) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
 }`);

export default Category;

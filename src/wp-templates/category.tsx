import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  PageCategoryGetCategoryQuery,
} from "@/__generated__/graphql";
import Page404Content from "@/container/404Content";
import PageLayout from "@/container/PageLayout";
import ArchiveLayoutChild from "@/container/archives/ArchieveLayoutChild";
import ArchiveLayout from "@/container/archives/ArchiveLayout";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import { FOOTER_LOCATION, PRIMARY_LOCATION, SIDEBAR_LOCATION } from "@/contains/menu";
import { PostDataFragmentType } from "@/data/types";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";
import { FaustTemplate } from "@faustwp/core";
import { useRouter } from 'next/router'

const Category: FaustTemplate<PageCategoryGetCategoryQuery> = (props: any) => {
  const router = useRouter()

  const pathname = router.asPath

  const cleanUrl = pathname.replace(/^\/|\/$/g, '');
  const segments = cleanUrl.split('/').filter(Boolean);
  if (segments.length >= 2) {
    return <Page404Content />;
  }

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
    count,
    description,
    name,
    uri,
    ncTaxonomyMeta,
    featuredImageMeta,
    children,
    ancestors,
  } = getCatgoryDataFromCategoryFragment(props.data.category);
  const initPostsPageInfo = props.data?.category?.posts?.pageInfo;
  const posts = props.data?.category?.posts;

  const hasChild = children && Array.isArray(children.nodes) && children.nodes.length > 0;

  if (!hasChild) {
    return (
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
        pageTitle={"Category " + (props?.data?.category?.seo?.title ?? name)}
        pageDescription={props?.data?.category?.seo?.metaDesc || description || ""}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <ArchiveLayoutChild name={name} ancestors={ancestors} initPosts={posts?.nodes as PostDataFragmentType[] | null}></ArchiveLayoutChild>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
      pageFeaturedImageUrl={featuredImageMeta?.sourceUrl}
      pageTitle={"Category " + (props?.data?.category?.seo?.title ?? name)}
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
        childs={children?.nodes}
      ></ArchiveLayout>
    </PageLayout>
  );
};

Category.variables = ({ id }) => ({
  id,
  headerLocation: PRIMARY_LOCATION,
  footerLocation: FOOTER_LOCATION,
  sidebarLocation: SIDEBAR_LOCATION
});

Category.query = gql(`
query PageCategoryGetCategory($id: ID!, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!, $sidebarLocation: MenuLocationEnum!)  {
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
    sidebarMenuItems: menuItems(where: {location:$sidebarLocation}, first: 200) {
      nodes {
        ...sidebarMenuFieldsFragment
      }
    }
 }`);

export default Category;

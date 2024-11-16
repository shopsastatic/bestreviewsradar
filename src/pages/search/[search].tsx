import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
} from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import { useRouter } from "next/router";
import useHandleGetPostsArchivePage from "@/hooks/useHandleGetPostsArchivePage";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import { PostDataFragmentType } from "@/data/types";
import { GetStaticPropsContext } from "next";
import { getNextStaticProps } from "@faustwp/core";
import Link from "next/link";

const Page: any = (props: any) => {
  const { posts } = props.data || {};
  const { categories } = props.data || {};

  const router = useRouter();
  const search = router.query.search || "" as any;
  const listCate = categories?.nodes

  //

  const {
    currentPosts,
    handleChangeFilterPosts,
    handleClickShowMore,
    hasNextPage,
    loading,
  } = useHandleGetPostsArchivePage({
    initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
    category: categories?.nodes as any,
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
        <div className="container my-20">
          <h1 className="font-extrabold">Result for: {search}</h1>
          <hr className="mt-5"/>

          {listCate?.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl md:text-3xl">Categories</h2>
              <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listCate.map((cate: any) => (
                    <Link href={cate?.uri?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "/"} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center">
                      <h3 className="text-gray-700 text-base font-semibold">{cate?.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPosts?.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl md:text-3xl">Posts</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 mt-4'>
                {currentPosts?.map((post: any, index: any) => (
                  <Link href={post?.uri ?? "/"} className='category-child-item rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5 flex items-center' key={index}>
                    <div className='col-span-1 md:col-span-2'>
                      <img className='category-child-image max-w-[80px] m-auto w-full rounded-lg' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                    </div>
                    <div className='col-span-2 md:col-span-3'>
                      <h4 className='font-semibold text-base line-clamp-2'>{post?.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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
    revalidate: 900,
  });
}

Page.variables = ({ params }: any) => {
  return {
    search: params?.search || null,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION
  };
};

Page.query = gql(`
  query SearchPostsBySearch($search: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    posts(first: 10, where: {search: $search}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      categories(first: 10, where: { search: $search, orderby: COUNT, order: DESC }) {
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
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 80) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    # end common query
  }
`);

export default Page;

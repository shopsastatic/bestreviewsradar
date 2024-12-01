import { gql } from '@/__generated__'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import PageLayout from '@/container/PageLayout'
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import { FOOTER_LOCATION, PRIMARY_LOCATION } from '@/contains/menu'
import { GetStaticPropsContext } from 'next'
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link'
import { useQuery } from '@apollo/client'

const SkeletonCard = () => (
  <div className="skeleton-card rounded-xl shadow-sm overflow-hidden h-52 bg-gray-200 animate-pulse"></div>
);

const Page: FaustPage<GetReadingListPageQuery> = (props: any) => {
  const categories = props.data.categoryItems
  function transformMenuItems(items: any) {
    const parentItems = items.filter((item: any) => !item.parentId);

    return parentItems.map((parent: any) => {
      const children = items.filter((item: any) => item.parentId === parent.id);

      return {
        id: parent.id,
        name: parent.label,
        slug: parent.uri,
        icon: parent.menuAddons.menuIcon,
        trending: parent.menuAddons.trending,
        ...(children.length > 0 && {
          subCategories: children.map((child: any) => ({
            name: child.label,
            slug: getLastPath(child.uri),
            id: child.id
          }))
        })
      };
    });
  }
  let topCategories = []

  if (categories?.nodes.length > 0) {
    topCategories = transformMenuItems(categories?.nodes)
  }

  function getLastPath(url: any) {
    const cleanUrl = url.replace(/\/$/, '');
    return cleanUrl.split('/').pop() + '/';
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      sidebarMenuItems={props.data?.sidebarMenuItems?.nodes || []}
      pageFeaturedImageUrl={null}
      pageTitle="Categories"
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
                Product Categories
              </h1>
              <p className="text-gray-300 text-lg">
                Explore our comprehensive collection of product categories, featuring expert reviews and detailed comparisons.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((category: any) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <Link className="flex items-start gap-3" href={category?.slug?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "/"}>
                        <div dangerouslySetInnerHTML={{ __html: category.icon }} className={`p-2 rounded-lg ${category.featured ? 'bg-blue-50 text-blue-500' : 'bg-blue-50 text-blue-500'
                          }`}>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{category.name}</h2>
                        </div>
                      </Link>
                      {category.trending && (
                        <span className="flex items-center gap-1 text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                          <TrendingUp className="w-4 h-4" />
                          <span>Trending</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sub Categories */}
                  {category?.subCategories?.length > 0 && (
                    <div className="p-6 pt-3">
                      <div className="space-y-3">
                        {category.subCategories.map((sub: any, index: any) => (
                          <Link
                            key={index}
                            href={sub?.slug?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "/"}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                            <span>{sub?.name}</span>
                          </Link>
                        ))}
                      </div>

                      {/* View All Button */}
                      <Link href={category?.slug?.replace(/^\/|\/$/g, '')?.split('/')?.pop() ?? "/"}>
                        <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                          <span>Show More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

Page.variables = () => {
  return {
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  }
}

Page.query = gql(`
  query GetCateData($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    categoryItems: menuItems(where: { location: CATEGORIES }, first: 200) {
      nodes {
        ...NcCategoryFieldsFragment
      }
    }
    primaryMenuItems: menuItems(where: { location: $headerLocation }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    categories(where: { parent: null }, first: 50) {
      nodes {
        id
        name
        slug
        ... on Category {
          children {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
    sidebarMenuItems: menuItems(where: { location: MAIN_MENU }, first: 40) {
      nodes {
        ...NcSideBarMenuFieldsFragment
      }
    }
  }
`)

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 3600,
  })
}

export default Page

import { gql } from "@/__generated__";

export const GET_USER_META_BY_ID = gql(`#graphql
  query MyQueryGetCMSUser($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      databaseId
      ncUserMeta {
        ncBio
        featuredImage {
            node {
              ...NcmazFcImageFields
            }
          }
      }
    }
  }
`);

export const QUERY_GET_POSTS_BY = gql(/* GraphQL */ `
  query QueryGetPostsBy(
    $in: [ID] = null
    $first: Int = 20
    $after: String = null
    $author: Int = null
    $categoryId: Int = null
    $categoryName: String = null
    $tagId: String = null
    $day: Int = null
    $month: Int = null
    $year: Int = null
    $search: String = ""
    $field: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
  ) {
    posts(
      first: $first
      after: $after
      where: {
        in: $in
        author: $author
        categoryId: $categoryId
        categoryName: $categoryName
        tagId: $tagId
        dateQuery: { day: $day, month: $month, year: $year }
        search: $search
        orderby: { field: $field, order: $order }
      }
    ) {
      nodes {
        ...NcmazFcPostCardFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
//
export const QUERY_GET_TOP_10_CATEGORIES = gql(/* GraphQL */ `
  query QueryGet10Categories($first: Int = 10) {
    categories(first: $first, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
  }
`);

export const QUERY_GET_CATEGORIES = gql(/* GraphQL */ `
  query QueryGetCategories($after: String, $first: Int = 10) {
    categories(first: $first, after: $after) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const QUERY_GET_TAGS = gql(/* GraphQL */ `
  query QueryGetTags($after: String = "", $first: Int = 5) {
    tags(first: $first, after: $after) {
      nodes {
        __typename
        ...NcmazFcTagShortFieldsFragment
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
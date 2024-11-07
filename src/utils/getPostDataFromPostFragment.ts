import { FragmentType, useFragment } from "../__generated__";
import {
  NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
  NC_POST_CARD_FRAGMENT,
  NC_POST_CARD_NOT_NCMAZGALLERY_FRAGMENT,
  NC_POST_FULL_FRAGMENT,
  NC_POST_META_DATA_FULL_FRAGMENT,
} from "../fragments";
import { getCatgoryDataFromCategoryFragment } from "./getCatgoryDataFromCategoryFragment";
import { getTagDataFromTagFragment } from "./getTagDataFromTagFragment";
import { getUserDataFromUserCardFragment } from "./getUserDataFromUserCardFragment";
import { NcmazFcImageHasDetailFieldsFragment } from "@/__generated__/graphql";

export type PostFormatNameType =
  | ""
  | "audio"
  | "gallery"
  | "video"
  | "aside"
  | "chat"
  | "image"
  | "quote"
  | "status"
  | "standard";

export function getPostDataFromPostFragment(
  post:
    | FragmentType<typeof NC_POST_CARD_FRAGMENT>
    | FragmentType<typeof NC_POST_FULL_FRAGMENT>
    | FragmentType<typeof NC_POST_CARD_NOT_NCMAZGALLERY_FRAGMENT>
    | any
) {
  const query = useFragment(
    NC_POST_FULL_FRAGMENT,
    post as any
  ) as any;

  //
  const featuredImage = useFragment(
    NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
    query.featuredImage?.node
  );

  return {
    ...query,
    uri: query.uri || "",
    link: "",
    title: query.title || "",
    excerpt: query.excerpt || "",
    date: query.date || "",
    content: query.content || "",
    featuredImage,
    categories: {
      nodes: query.categories?.nodes?.map((term: any) =>
        getCatgoryDataFromCategoryFragment(term)
      ),
    },
    tags: {
      nodes: query?.tags?.nodes?.map((term: any) => getTagDataFromTagFragment(term)),
    },
    author: getUserDataFromUserCardFragment({ ...query.author?.node }),
  };
}

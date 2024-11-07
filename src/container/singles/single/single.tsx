import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";

export interface SingleType1Props {
  post: any;
  showRightSidebar?: boolean;
}

const SingleType1: FC<SingleType1Props> = ({ post, showRightSidebar }) => {
  //
  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    featuredImage,
    ncPostMetaData,
  } = getPostDataFromPostFragment(post || {});
  //

  const hasFeaturedImage = !!featuredImage?.sourceUrl;
  return (
    <>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div
            className={
              !hasFeaturedImage && showRightSidebar
                ? ""
                : `max-w-screen-md mx-auto`
            }
          >
            <SingleHeader post={{ ...post }} />
            {!hasFeaturedImage && (
              <div className="my-5 border-b border-neutral-200 dark:border-neutral-800" />
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default SingleType1;

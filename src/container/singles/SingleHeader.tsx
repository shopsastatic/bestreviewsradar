import React, { FC } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  post,
}) => {
  const {
    title,
    excerpt,
    ncPostMetaData,
    categories,
    commentCount,
    databaseId,
    uri,
  } = getPostDataFromPostFragment(post || {});

  return (
    <>
      <div className='container my-6'>
        <h1 className="text-center my-12">{title}</h1>

        <div className="flex gap-2 items-center">
          {categories?.nodes?.map((item: any, index: any) => (
            <React.Fragment key={item.id || index}>
              <Link
                className="text-[13px] text-[#5B5E61]"
                href={item?.uri ?? '/'}
              >
                {item.name}
              </Link>
              {categories?.nodes && index < categories?.nodes.length - 1 && <img width={7} src="/images/posts/symbol.svg" />}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <img width={14} src="/images/posts/author-symbol.svg" />
              <span className="text-sm text-[#191C1F]">Fact checked by <Link href={"/"} className="underline">Nick Blackmer</Link></span>
            </div>
            <div className="text-sm flex items-center mt-2 gap-2 flex-wrap text-[#5B5E61]">
              <span>Last Updated</span>
              <img width={8} src="/images/posts/heading-symbol1.svg" />
              <span>September 20, 2024</span>
              <img width={16} src="/images/posts/heading-symbol2.svg" />
              <span>Advertising Disclosure</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={"/"} className="w-[45px] h-[45px] bg-white rounded-[8px] border border-[#d0d5dd] flex justify-center items-center">
              <img width={20} src="/images/posts/x-icon.svg" />
            </Link>
            <Link href={"/"} className="w-[45px] h-[45px] bg-white rounded-[8px] border border-[#d0d5dd] flex justify-center items-center">
              <img width={20} src="/images/posts/facebook.svg" />
            </Link>
            <Link href={"/"} className="w-[45px] h-[45px] bg-white rounded-[8px] border border-[#d0d5dd] flex justify-center items-center">
              <img width={20} src="/images/posts/email.svg" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;

import React, { FC } from "react";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";
import { formatDate } from "@/components/FormatDate";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: FragmentType<any>;
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
    author,
    date
  } = getPostDataFromPostFragment(post as any || {});

  const getBaseURL = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  };

  const baseURL = getBaseURL();

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseURL + uri)}`,
      'popup',
      'width=600,height=400'
    );
  };

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(baseURL + uri)}&text=${encodeURIComponent(title)}`,
      'popup',
      'width=600,height=400'
    );
  };

  const shareToMail = () => {
    const subject = encodeURIComponent(title || 'Check this out!');
    const body = encodeURIComponent(`I found this interesting: ${baseURL + uri}`);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

    window.open(mailtoLink, 'popup', 'width=600,height=400');
  };

  return (
    <>
      <div className='container my-6'>
        <h1 className="post-title text-center my-5 md:my-12 font-bold leading-[1.1em] max-w-full md:max-w-[690px] mx-auto">{title}</h1>

        <div className="hidden md:flex gap-2 items-center">
          {categories?.nodes?.map((item: any, index: any) => (
            <React.Fragment key={item.id || index}>
              <Link
                className="text-[13px] text-[#5B5E61]"
                href={item?.uri ?? '/'}
              >
                {item.name}
              </Link>
              {categories?.nodes && index < categories?.nodes.length - 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" height="10"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" fill="#5D6266" /></svg>}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-between">
          <div className="col-span-1">
            <div className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14"><path d="m256 0c36.8 0 68.8 20.7 84.9 51.1 32.9-10.1 70.1-2.1 96.1 23.9s34 63.3 23.9 96.1c30.4 16.1 51.1 48.1 51.1 84.9s-20.7 68.8-51.1 84.9c10.1 32.9 2.1 70.1-23.9 96.1s-63.3 34-96.1 23.9c-16.1 30.4-48.1 51.1-84.9 51.1s-68.8-20.7-84.9-51.1c-32.9 10.1-70.1 2.1-96.1-23.9s-34-63.3-23.9-96.1c-30.4-16.1-51.1-48.1-51.1-84.9s20.7-68.8 51.1-84.9c-10.1-32.9-2.1-70.1 23.9-96.1s63.3-34 96.1-23.9c16.1-30.4 48.1-51.1 84.9-51.1zm113 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0z" fill="#016EF9" /></svg>
              <span className="text-sm text-[#191C1F]">Fact checked by <Link href={author?.uri ?? "/"} className="underline">{author?.name}</Link></span>
            </div>
            <div className="text-sm flex items-center mt-2 gap-2 flex-wrap text-[#5B5E61]">
              <span>Last Updated</span>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="e-font-icon-svg e-fas-circle" viewBox="0 0 512 512" width="8" height="8"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" fill="#92DF00" /></svg>
              <span>{formatDate(date, false)}</span>
              <div className="hidden md:flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 184c13.25 0 24-10.74 24-24c0-13.25-10.75-24-24-24S232 146.7 232 160C232 173.3 242.7 184 256 184zM304 352h-32V240C272 231.2 264.8 224 256 224H224C215.2 224 208 231.2 208 240S215.2 256 224 256h16v96h-32C199.2 352 192 359.2 192 368C192 376.8 199.2 384 208 384h96c8.836 0 16-7.164 16-16C320 359.2 312.8 352 304 352z" fill="#5D6266" /></svg>
                <span>Advertising Disclosure</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex justify-start md:justify-end gap-3 mt-5 md:mt-0">
            <div onClick={shareToX} className="hover:bg-slate-200 cursor-pointer w-[35px] h-[35px] md:w-[36px] md:h-[36px] rounded-[8px] border flex justify-center items-center heading-share-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px] md:w-[16px] md:h-[16px]" fill="none" viewBox="0 0 20 20"><g clipPath="url(#X_svg__a)" fill="none"><path fill="#98A2B3" fillRule="evenodd" d="m13.288 19.167-4.625-6.591-5.789 6.591H.424l7.153-8.14L.425.834h6.288l4.359 6.213 5.46-6.213h2.45l-6.82 7.764 7.414 10.57zm2.727-1.858h-1.649L3.933 2.692H5.58l4.18 5.853.722 1.016z" clipRule="evenodd" /></g><defs><clipPath id="X_svg__a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs></svg>
            </div>
            <div onClick={shareToFacebook} className="hover:bg-slate-200 cursor-pointer w-[35px] h-[35px] md:w-[36px] md:h-[36px] rounded-[8px] border flex justify-center items-center heading-share-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px] md:w-[16px] md:h-[16px]" fill="none" viewBox="0 0 20 20"><g clipPath="url(#Facebook_svg__a)" fill="none"><path fill="#98A2B3" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.129 20 14.991 20 10" /></g><defs><clipPath id="Facebook_svg__a"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs></svg>
            </div>
            <div onClick={shareToMail} className="hover:bg-slate-200 cursor-pointer w-[35px] h-[35px] md:w-[36px] md:h-[36px] rounded-[8px] border flex justify-center items-center heading-share-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="e-font-icon-svg e-fas-envelope w-[17px] h-[17px] md:w-[16px] md:h-[16px]"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" fill="#98A2B3" /></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;

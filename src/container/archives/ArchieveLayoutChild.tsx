import { TPostCard } from '@/components/Card2/Card2'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import Link from 'next/link'
import { FC } from 'react'


const ArchiveLayoutChild: FC<any> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories
}) => {
	// START ----------
	//
	const { } = useGetPostsNcmazMetaByIds({
		posts: (posts || []) as TPostCard[],
	})
	//

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: posts,
		initPostsPageInfo,
		tagDatabaseId,
		categoryDatabaseId,
	})

	return (
		<div className="mt-10">
			<div className={`page-category`}>
				<div className='container'>
					<div className='category-breadcrumb ml-1 mt-2 flex items-center gap-2'>
						<Link href={"/"} className='hover:underline text-sm'>Home</Link>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" height="10"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" fill="#5D6266" /></svg>
						<span className='text-sm'>{name}</span>
					</div>

					<h1 className='font-bold capitalize mt-14'>{name}</h1>

					{posts?.length > 0 && (
							<div className='mt-14'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 mt-4'>
									{posts?.slice(0, 10)?.map((item: any, index: any) => (
										<div className='category-child-item rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4' key={index}>
											<Link href={item?.uri ?? "/"} className='w-full col-span-1 md:col-span-2'>
												<img className='w-full h-[100px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
											</Link>
											<div className='col-span-2 md:col-span-3'>
												<Link href={item?.uri ?? "/"}>
													<h4 className='font-semibold text-base'>{item?.title}</h4>
												</Link>
												<Link href={"#"} className='text-xs mt-4 inline-block w-fit hover:underline text-[#2c5bb3]'>{name}</Link>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayoutChild

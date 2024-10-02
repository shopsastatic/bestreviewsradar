import { TPostCard } from '@/components/Card2/Card2'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'


const ArchiveLayout: FC<any> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories,
	childs
}) => {
	// START ----------
	//
	const { } = useGetPostsNcmazMetaByIds({
		posts: (posts || []) as TPostCard[],
	})
	//

	console.log(childs)
	const child1 = childs?.[0]
	const child2 = childs?.[1]
	const child3 = childs?.[2]

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
					<h1 className='font-bold capitalize'>{name}</h1>

					<div className='category-child mt-10 py-3 border-t border-slate-300'>
						<ul className='flex gap-4 flex-wrap'>
							{childs?.length > 0 && childs?.map((item: any, index: any) => (
								<Link key={index} href={item?.uri ?? "/"} className='category-item px-4 py-2 rounded-xl hover:text-blue-700 transition-all shadow shadow-slate-300'>
									<li className='text-sm capitalize'>{item?.name}</li>
								</Link>
							))}
						</ul>
					</div>

					<div className='category-breadcrumb ml-1 mt-2 flex items-center gap-2'>
						<Link href={"/"} className='hover:underline text-sm'>Home</Link>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10" height="10"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" fill="#5D6266" /></svg>
						<span className='text-sm'>{name}</span>
					</div>

					<div>
						{child1?.posts?.nodes?.length > 0 && (
							<div className='mt-7'>
								<Link href={child1?.uri ?? "/"}><h3>{child1?.name}</h3></Link>

								<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7 mt-4'>
									{child1?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
										<div className='rounded-lg col-span-1 border border-slate-300 shadow hover:shadow-lg shadow-slate-300 transition-all' key={index}>
											<Link href={item?.uri ?? "/"}>
												<img className='w-full max-[400px]:h-[120px] h-[170px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												<p className='mt-2 font-semibold max-[400px]:px-2 max-[400px]:text-sm px-4 pt-2 pb-5 text-base'>{item?.title}</p>
											</Link>
										</div>
									))}
								</div>
							</div>
						)}

						{child2?.posts?.nodes?.length > 0 && (
							<div className='mt-20'>
								<Link href={child2?.uri ?? "/"}><h3>{child2?.name}</h3></Link>

								<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7 mt-4'>
									{child2?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
										<div className='rounded-lg col-span-1 border border-slate-300 shadow hover:shadow-lg shadow-slate-300 transition-all' key={index}>
											<Link href={item?.uri ?? "/"}>
												<img className='w-full max-[400px]:h-[120px] h-[170px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												<p className='mt-2 font-semibold max-[400px]:px-2 max-[400px]:text-sm px-4 pt-2 pb-5 text-base'>{item?.title}</p>
											</Link>
										</div>
									))}
								</div>
							</div>
						)}

						{child3?.posts?.nodes?.length > 0 && (
							<div className='mt-20'>
								<Link href={child3?.uri ?? "/"}><h3>{child3?.name}</h3></Link>

								<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7 mt-4'>
									{child3?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
										<div className='rounded-lg col-span-1 border border-slate-300 shadow hover:shadow-lg shadow-slate-300 transition-all' key={index}>
											<Link href={item?.uri ?? "/"}>
												<img className='w-full max-[400px]:h-[120px] h-[170px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												<p className='mt-2 font-semibold max-[400px]:px-2 max-[400px]:text-sm px-4 pt-2 pb-5 text-base'>{item?.title}</p>
											</Link>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout

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

					<div className='py-10 border-b border-slate-300'>
						<ul className='flex gap-4 flex-wrap'>
							{childs?.length > 0 && childs?.map((item: any, index: any) => (
								<Link key={index} href={item?.uri ?? "/"} className='px-6 py-3 text-[#e06308] border border-[#e06308] rounded-xl hover:border-0 hover:bg-[#e06308] hover:text-white'>
									<li className='text-base font-semibold capitalize'>{item?.name}</li>
								</Link>
							))}
						</ul>
					</div>

					<div>
						{child1?.posts?.nodes?.length > 0 && (
							<div className='mt-7'>
								<div className='flex justify-between items-end mb-10'>
									<h2>{child1?.name}</h2>
									<Link href={child1?.uri ?? "/"} className='hover:underline text-[#2c5bb3]'><p>View More</p></Link>
								</div>

								<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 mt-4'>
									{child1?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
										<div className='rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
											<Link href={item?.uri ?? "/"} className='w-full col-span-1 md:col-span-2'>
												<img className='w-full h-[120px] object-cover object-top rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
											</Link>
											<div className='col-span-2 md:col-span-3'>
												<Link href={item?.uri ?? "/"}>
													<h4 className='font-semibold'>{item?.title}</h4>
												</Link>
												<Link href={child1?.uri ?? "/"} className='text-sm mt-4 inline-block w-fit text-[#2c5bb3]'>{child1?.name}</Link>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{child2?.posts?.nodes?.length > 0 && (
							<>
								<hr className='my-14' />
								<div>
									<div className='flex justify-between items-end mb-10'>
										<h2>{child2?.name}</h2>
										<Link href={child2?.uri ?? "/"} className='hover:underline text-[#2c5bb3]'><p>View More</p></Link>
									</div>

									<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 mt-4'>
										{child2?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
											<div className='rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
												<Link href={item?.uri ?? "/"} className='w-full col-span-1 md:col-span-2'>
													<img className='w-full h-[120px] object-cover object-top rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												</Link>
												<div className='col-span-2 md:col-span-3'>
													<Link href={item?.uri ?? "/"}>
														<h4 className='font-semibold'>{item?.title}</h4>
													</Link>
													<Link href={child2?.uri ?? "/"} className='text-sm mt-4 block w-fit text-[#2c5bb3]'>{child2?.name}</Link>
												</div>
											</div>
										))}
									</div>
								</div>
							</>
						)}

						{child3?.posts?.nodes?.length > 0 && (
							<>
								<hr className='my-14' />
								<div>
									<div className='flex justify-between items-end mb-10 mt-14'>
										<h2>{child3?.name}</h2>
										<Link href={child3?.uri ?? "/"} className='hover:underline text-[#2c5bb3]'><p>View More</p></Link>
									</div>

									<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 mt-4'>
										{child3?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
											<div className='rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
												<Link href={item?.uri ?? "/"} className='w-full col-span-1 md:col-span-2'>
													<img className='w-full h-[120px] object-cover object-top rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												</Link>
												<div className='col-span-2 md:col-span-3'>
													<Link href={item?.uri ?? "/"}>
														<h4 className='font-semibold'>{item?.title}</h4>
													</Link>
													<Link href={child3?.uri ?? "/"} className='text-sm mt-4 inline-block w-fit text-[#2c5bb3]'>{child3?.name}</Link>
												</div>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout

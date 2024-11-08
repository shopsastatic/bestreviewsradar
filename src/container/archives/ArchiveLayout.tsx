import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'


const ArchiveLayout: FC<any> = ({
	children,
	name,
	uri,
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

	function categorySlug(uri: any) {
		return uri.split('/').filter(Boolean).pop()
	}

	return (
		<div className="mt-10">
			<div className={`page-category`}>
				<div className='container'>
					<h1 className='font-bold capitalize'>{name}</h1>

					<div className='py-10 border-b border-slate-300'>
						<ul className='flex gap-4 flex-wrap'>
							{childs?.length > 0 && childs?.map((item: any, index: any) => (
								<Link key={index} href={categorySlug(item?.uri) ?? "/"} className='cate-child-box px-6 py-3 bg-white rounded-xl'>
									<li className='text-base font-semibold capitalize'>{item?.name}</li>
								</Link>
							))}
						</ul>
					</div>

					<div>
						{child1?.posts?.nodes?.length > 0 && (
							<div className='mt-7'>
								<div className='flex justify-between gap-3 items-center mb-10'>
									<h2>{child1?.name}</h2>
									<Link href={categorySlug(child1?.uri) ?? "/f"} className='hover:underline text-[#2c5bb3]'><p className='min-w-max'>View More</p></Link>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 mt-4'>
									{child1?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
										<Link href={item?.uri ?? "/"} className='category-child-item rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
											<div className='w-full col-span-1 md:col-span-2'>
												<img className='category-child-image w-full h-[100px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
											</div>
											<div className='col-span-2 md:col-span-3'>
												<h4 className='font-semibold text-base'>{item?.title}</h4>
												<div className='text-xs mt-4 inline-block w-fit text-[#2c5bb3]'>{child1?.name}</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}

						{child2?.posts?.nodes?.length > 0 && (
							<>
								<hr className='my-14' />
								<div>
									<div className='flex justify-between items-center mb-10'>
										<h2>{child2?.name}</h2>
										<Link href={categorySlug(child2?.uri) ?? "/"} className='hover:underline text-[#2c5bb3]'><p className='min-w-max'>View More</p></Link>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 mt-4'>
										{child2?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
											<Link href={item?.uri ?? "/"} className='category-child-item rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
												<div className='w-full col-span-1 md:col-span-2'>
													<img className='category-child-image w-full h-[100px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												</div>
												<div className='col-span-2 md:col-span-3'>
													<h4 className='font-semibold text-base'>{item?.title}</h4>
													<div className='text-xs mt-4 inline-block w-fit text-[#2c5bb3]'>{child2?.name}</div>
												</div>
											</Link>
										))}
									</div>
								</div>
							</>
						)}

						{child3?.posts?.nodes?.length > 0 && (
							<>
								<hr className='my-14' />
								<div>
									<div className='flex justify-between items-center mb-10 mt-14'>
										<h2>{child3?.name}</h2>
										<Link href={categorySlug(child3?.uri) ?? "/"} className='hover:underline text-[#2c5bb3]'><p className='min-w-max'>View More</p></Link>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 mt-4'>
										{child3?.posts?.nodes?.slice(0, 6)?.map((item: any, index: any) => (
											<Link href={item?.uri ?? "/"} className='category-child-item rounded-lg col-span-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5' key={index}>
												<div className='w-full col-span-1 md:col-span-2'>
													<img className='category-child-image w-full h-[100px] object-cover object-center rounded-lg' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
												</div>
												<div className='col-span-2 md:col-span-3'>
													<h4 className='font-semibold text-base'>{item?.title}</h4>
													<div className='text-xs mt-4 inline-block w-fit text-[#2c5bb3]'>{child3?.name}</div>
												</div>
											</Link>
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

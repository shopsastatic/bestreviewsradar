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

	let categoryPosts = [] as any;

	for (const item of childs) {
		for (const post of item.posts.nodes) {
			if (categoryPosts.length < 10) {
				categoryPosts.push(post);
			} else {
				break;
			}
		}
		if (categoryPosts.length >= 10) {
			break;
		}
	}

	console.log(childs)

	function slugToLabel(slug: any) {
		const cleanedSlug = slug.replace(/^\/+|\/+$/g, '');
		return cleanedSlug
			.split('-')
			.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	return (
		<div className="mt-10">
			<div className={`page-category`}>
				<div className='container'>
					<h1 className='font-bold capitalize'>{name}</h1>

					<div className='category-child mt-10 py-3 border-t border-slate-300'>
						<ul className='flex gap-4 flex-wrap'>
							{childs?.length > 0 && childs?.map((item: any, index: any) => (
								<Link key={index} href={item?.uri ?? "/"} className='category-box-child !px-4 !py-2 !rounded-lg hover:text-blue-700 transition-all shadow shadow-slate-300'>
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

					<div className='grid grid-cols-3 gap-5 mt-5'>
						{categoryPosts.length > 0 && categoryPosts.map((item: any) => (
							<Link href={item?.uri ?? "/"} className='category-box-child col-span-1 flex items-center gap-5'>
								<img className='category-image max-w-[55px] w-auto h-[55px]' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
								<span className='font-medium text-base'>{slugToLabel(item?.uri)}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArchiveLayout

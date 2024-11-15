'use client'

import { FC, useEffect, useRef, useState, useCallback, memo } from 'react'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import Link from 'next/link'
import axios from 'axios'
import ScrollTop from '@/components/ScrollTop'
import Image from 'next/image'
import debounce from 'lodash/debounce'

export interface SingleContentProps {
	post: any
}

const TableOfContents = memo(({ headings, activeHeading }: { headings: any[], activeHeading: string }) => (
	<nav className='article_menu col-span-3 mb-10 lg:mb-0 flex flex-col lg:block justify-between lg:sticky top-0 h-fit p-5 md:p-2 md:pt-0 rounded lg:shadow-none'>
		{headings?.length > 0 && (
			<p className='pb-0 lg:pb-4 border-0 lg:border-b border-[#999] uppercase font-semibold'>
				On This Page
			</p>
		)}

		<ul className='mt-4 flex-col gap-6 hidden lg:flex'>
			{headings.map((heading) => (
				<li
					key={heading.id}
					className={`border-l-2 transition-[padding-left, border-color, color] ${activeHeading === heading.id
							? 'duration-300 font-semibold border-blue-600'
							: 'duration-300 font-normal border-transparent'
						}`}
				>
					<a
						href={`#${heading.id}`}
						className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'
							}`}
					>
						{heading.text}
					</a>
				</li>
			))}
		</ul>

		<ul className='mt-4 flex-col gap-5 flex lg:hidden'>
			{headings.map((heading) => (
				<li
					key={heading.id}
					className={`border-l-2 transition-[padding-left, border-color, color] ${activeHeading === heading.id
							? 'duration-300 font-semibold border-blue-600'
							: 'duration-300 font-normal border-transparent'
						}`}
				>
					<a
						href={`#${heading.id}`}
						className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'
							}`}
					>
						{heading.text}
					</a>
				</li>
			))}
		</ul>
	</nav>
))

TableOfContents.displayName = 'TableOfContents'

const RelatedProduct = memo(({ item }: { item: any }) => (
	<Link href={item.url ?? "/"} className='col-span-1 related-prod-child'>
		<div className='max-h-[94px] h-full m-auto mb-3'>
			<Image
				loading='lazy'
				width={200}
				height={94}
				className='related-prod-image mx-auto rounded-[8px] h-full object-contain'
				src={item?.img ?? "/"}
				alt={item?.title}
			/>
		</div>
		<Image
			loading='lazy'
			width={85}
			height={30}
			className='mx-auto !mb-10 max-w-[50px] md:max-w-[85px]'
			src="/images/posts/amazon.webp"
			alt="Amazon logo"
		/>
		<div className='block w-fit my-3 mt-1'>
			<p className='font-bold line-clamp-2 text-base'>{item?.title}</p>
		</div>
		<span className='line-clamp-1 block mb-2 text-sm truncate'>
			{item?.productDatas?.description}
		</span>
		<div className='box-price flex flex-wrap items-end gap-4'>
			{item?.price > 0 && (
				<span className='font-bold text-base'>
					${Number(item?.price)?.toFixed(2)}
				</span>
			)}
			<div className='flex items-center gap-4'>
				{item?.priceOld > 0 && (
					<span className='text-sm line-through text-[#444]'>
						${Number(item?.priceOld)?.toFixed(2)}
					</span>
				)}
				{item?.percentageSaved > 0 && (
					<span className='text-sm text-red-700'>
						({item?.percentageSaved}% OFF)
					</span>
				)}
			</div>
		</div>
		<button
			className="mt-3 bg-[#ff6b00] hover:bg-[#e06308] transition-all rounded-xl text-center text-sm w-full text-white font-semibold py-3 px-4 min-h-[44px]"
			aria-label="View Deal"
		>
			View Deal
		</button>
	</Link>
))

RelatedProduct.displayName = 'RelatedProduct'

const processTable = (table: HTMLTableElement) => {
	const firstRow = table.querySelector('tr')
	if (!firstRow) return null

	const tdElements = Array.from(firstRow.querySelectorAll('td'))
	const hasProsOrCons = tdElements.some(td =>
		td.textContent?.toLowerCase().includes('pros') ||
		td.textContent?.toLowerCase().includes('cons')
	)

	if (!hasProsOrCons) return null

	const newDivWrapper = document.createElement('div')
	newDivWrapper.classList.add('pros-cons-table')

	const thead = table.querySelector('thead')
	if (thead) {
		const theadDiv = document.createElement('div')
		theadDiv.classList.add('thead-wrapper')

		Array.from(thead.querySelectorAll('th')).forEach(th => {
			const thDiv = document.createElement('div')
			thDiv.classList.add('thead-cell')
			thDiv.innerHTML = th.innerHTML
			theadDiv.appendChild(thDiv)
		})

		newDivWrapper.appendChild(theadDiv)
	}

	const columns = [] as any[]
	const rows = Array.from(table.querySelectorAll('tbody tr'))

	rows.forEach(row => {
		Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
			if (!columns[index]) columns[index] = []

			if (cell.innerHTML) {
				const icon = index === 0
					? '<svg width="20" viewBox="0 0 24 24" fill="#358b15" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Checkmark Icon</title><path d="M8.982 18.477a.976.976 0 0 1-.658-.266l-5.056-5.055a.926.926 0 0 1 0-1.305.927.927 0 0 1 1.305 0L8.97 16.25 19.427 5.792a.926.926 0 0 1 1.305 0 .926.926 0 0 1 0 1.304L9.628 18.2a.906.906 0 0 1-.658.265l.012.012Z" class="icon-base"></path></svg>'
					: '<svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.62252 7.17879L7.41279 5.38672L18.7265 16.7004L16.8 18.5995L5.62252 7.17879Z" fill="#D71919"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9344 5.50932L18.7265 7.29959L7.41281 18.6133L5.51375 16.6868L16.9344 5.50932Z" fill="#D71919"></path> </svg>'
				columns[index].push(icon + cell.innerHTML)
			}
		})
	})

	columns.forEach(columnData => {
		const columnDiv = document.createElement('div')
		columnDiv.classList.add('pros-cons-item')

		columnData.forEach((cellContent: string) => {
			const cellDiv = document.createElement('div')
			cellDiv.classList.add('cell')
			cellDiv.innerHTML = cellContent
			columnDiv.appendChild(cellDiv)
		})

		newDivWrapper.appendChild(columnDiv)
	})

	return newDivWrapper
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	const contentRef = useRef(null)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const cRef = useRef<HTMLDivElement>(null)
	const relatedRef = useRef(null)

	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
	const [dataRelated, setDataRelated] = useState<any>({})
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
	const [activeHeading, setActiveHeading] = useState<string>('')
	const [hydratedContent, setHydratedContent] = useState('')

	const {
		content,
		status,
		date,
		amazonShortcode,
		numberOfToplist
	} = getPostDataFromPostFragment(post || {})

	const NoT = numberOfToplist?.numberOfToplist || 10
	const post_id = post?.databaseId

	const fetchRelatedData = useCallback(async () => {
		if (!post_id) return

		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/cegg/v1/data/${post_id}`
			)
			setDataRelated(data)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}, [post_id])

	const handleScroll = debounce(() => {
		const sections = cRef.current?.querySelectorAll('h2')
		if (!sections) return

		const scrollPosition = window.scrollY + 150
		let currentSection = ''

		Array.from(sections).forEach((section: HTMLElement) => {
			const sectionTop = section.offsetTop
			if (scrollPosition >= sectionTop) {
				currentSection = section.id
			}
		})

		if (currentSection !== activeHeading) {
			setActiveHeading(currentSection)
		}
	}, 100)

	const handleProgressIndicator = useCallback(() => {
		if (!contentRef.current || !progressRef.current) return

		const entryContent = contentRef.current as HTMLElement
		const totalHeight = entryContent.offsetTop + entryContent.offsetHeight
		const scrollPosition = window.scrollY || document.documentElement.scrollTop
		const progress = (scrollPosition / totalHeight) * 100

		progressRef.current.innerText = `${Math.min(100, Math.max(0, progress)).toFixed(0)}%`
		setIsShowScrollToTop(progress >= 100)
	}, [])

	const processContent = useCallback(() => {
		if (typeof window === 'undefined' || !content) return

		const parser = new DOMParser()
		const doc = parser.parseFromString(content, 'text/html')

		const h2Elements = Array.from(doc.querySelectorAll('h2'))
		h2Elements.forEach(heading => {
			const slugifiedText = heading.textContent?.toLowerCase()
				.trim()
				.replace(/[\s\W-]+/g, '-')
				.replace(/^-+|-+$/g, '') || 'heading'
			heading.id = `toc-${slugifiedText}`
		})

		doc.querySelectorAll('table').forEach(table => {
			const processedTable = processTable(table)
			if (processedTable) {
				table.replaceWith(processedTable)
			}
		})

		setHydratedContent(doc.body.innerHTML)
		setHeadings([
			{ id: 'toc-related-deal', text: 'Related Deals' },
			...h2Elements.map(heading => ({
				id: heading.id,
				text: heading.textContent || '',
			}))
		])
	}, [content])

	useEffect(() => {
		processContent()
		fetchRelatedData()
	}, [processContent, fetchRelatedData])

	useEffect(() => {
		const scrollHandler = () => {
			handleScroll()
			handleProgressIndicator()
		}

		window.addEventListener('scroll', scrollHandler, { passive: true })
		return () => {
			window.removeEventListener('scroll', scrollHandler)
			handleScroll.cancel()
		}
	}, [handleScroll, handleProgressIndicator])

	const dataRelatedArray = dataRelated?.Amazon ? Object.values(dataRelated.Amazon) : []

	const renderAlert = () => {
		if (status === 'publish') return null

		return (
			<Alert type="warning">
				{status === 'future'
					? `This post is scheduled. It will be published on ${date}.`
					: `This post is ${status}. It will not be visible on the website until it is published.`
				}
			</Alert>
		)
	}

	return (
		<>
			<div className='container'>
				{renderAlert()}
				{amazonShortcode?.amazonShortcode && (
					<div dangerouslySetInnerHTML={{ __html: amazonShortcode.amazonShortcode }} />
				)}
				<ScrollTop />
			</div>

			{headings?.length > 0 && (
				<div className={`large-width p-5 grid grid-cols-1 ${headings.length === 1 && dataRelatedArray.length > 0
						? 'lg-grid-cols-1'
						: 'lg:grid-cols-12'
					} mt-20`}>
					{((headings.length > 1 && dataRelatedArray.length > 0) ||
						(headings.length > 1 && !dataRelatedArray.length)) && (
							<TableOfContents headings={headings} activeHeading={activeHeading} />
						)}

					<div className='col-span-8' ref={cRef}>
						{dataRelatedArray.length > 0 && (
							<>
								<h2 className='mb-10' id='toc-related-deal'>
									Related deals you might like
								</h2>
								<div className='related-products mb-14 pr-0 lg:pr-4' ref={relatedRef}>
									<div className={`grid grid-cols-1 ${headings.length === 1 && dataRelatedArray.length > 0
											? 'md:grid-cols-3 md:gap-7'
											: 'md:grid-cols-2 md:gap-10'
										} gap-6`}>
										{dataRelatedArray.slice(NoT, 50).map((item: any, index: number) => (
											<RelatedProduct key={`${item.title}-${index}`} item={item} />
										))}
									</div>
								</div>
							</>
						)}

						{hydratedContent && (
							<div
								ref={contentRef}
								className='summary-content'
								dangerouslySetInnerHTML={{ __html: hydratedContent }}
							/>
						)}
					</div>
				</div>
			)}

			<div className="!my-0" ref={endedAnchorRef} />
		</>
	)
}

export default memo(SingleContent)
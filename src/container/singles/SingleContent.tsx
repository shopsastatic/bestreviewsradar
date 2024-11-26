'use client'

import React, { FC, useEffect, useRef, useState, memo, useMemo, useCallback } from 'react'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import Link from 'next/link'
import axios from 'axios'
import ScrollTop from '@/components/ScrollTop'
import Image from 'next/image'
import debounce from 'lodash/debounce'
import SinglePopup from '@/components/SinglePopup'
import { useRouter } from 'next/router'

// Types
export interface SingleContentProps {
	post: any
}

// Move parseImageUrl outside component
const parseImageUrl = async (url: any) => {
	const imgDomain = "https://img.bestreviewsradar.com/"
	const contentDomain = "https://content.bestreviewsradar.com/"
	const replacementPath = `${imgDomain}image/upload/c_scale,w_160,h_160,dpr_1.25/f_auto,q_auto/`

	if (!url || typeof url !== "string") return "/"

	if (url.startsWith(imgDomain)) {
		if (url.includes('/images/')) {
			const [baseUrl, queryParams] = url.split('?')
			const matches = baseUrl.match(/\/([^\/]+?)(?:_[a-f0-9]+)?\.(?:jpg|jpeg|png|gif)$/i)
			if (matches?.[1]) {
				const fileName = matches[1]
				const extension = url.split('.').pop()?.split('?')[0] || 'jpg'
				let newUrl = `${imgDomain}image/upload/c_scale,w_160,h_160/f_auto,q_auto/${fileName}.${extension}`
				return queryParams ? `${newUrl}?${queryParams}` : newUrl
			}
		}
		return url
	}

	if (url.startsWith(contentDomain)) {
		return url.replace(/^https:\/\/content\.bestreviewsradar\.com\/wp-content\/uploads\/\d{4}\/\d{2}\//, replacementPath)
	}

	return url
}

// Optimize RelatedProduct component
const RelatedProduct = memo(({ item }: { item: any }) => {
	const [imageSrc, setImageSrc] = useState<string>("/")
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const observerRef = useRef<HTMLDivElement | null>(null)

	// Use IntersectionObserver with useCallback
	const initializeObserver = useCallback(() => {
		const observer = new IntersectionObserver(
			(entries) => entries[0]?.isIntersecting && setIsVisible(true),
			{ threshold: 0.1 }
		)

		if (observerRef.current) {
			observer.observe(observerRef.current)
			return () => observer.disconnect()
		}
	}, [])

	useEffect(() => {
		return initializeObserver()
	}, [initializeObserver])

	// Optimize image loading
	useEffect(() => {
		if (!isVisible || !item?.img) return

		const loadImage = async () => {
			try {
				const tempImg = new window.Image()
				tempImg.src = item.img

				const url = await parseImageUrl(item.img)
				setImageSrc(url)
			} catch {
				setImageSrc(item.img ?? "/")
			}
		}

		loadImage()
	}, [isVisible, item?.img])

	// Memoize price calculations
	const priceFormatted = useMemo(() => (
		item?.price > 0 ? Number(item.price).toFixed(2) : null
	), [item?.price])

	const oldPriceFormatted = useMemo(() => (
		item?.priceOld > 0 ? Number(item.priceOld).toFixed(2) : null
	), [item?.priceOld])

	return (
		<div ref={observerRef} className="col-span-1 related-prod-child">
			<Link href={item.url ?? "/"}>
				<div className="max-h-[94px] h-full m-auto mb-3 relative">
					{imageSrc === "/" ? (
						<div className="skeleton-card w-[94px] h-[94px] bg-gray-300 animate-pulse mx-auto rounded-lg" />
					) : (
						<Image
							loading="lazy"
							width={94}
							height={94}
							className="related-prod-image mx-auto rounded-lg max-w-24 w-full h-full object-contain"
							src={imageSrc}
							alt={item?.title || "Related product image"}
						/>
					)}
				</div>
				<Image
					loading="lazy"
					width={85}
					height={30}
					className="mx-auto !mb-10 max-w-[50px] md:max-w-[85px]"
					src="/images/posts/amazon.webp"
					alt="Amazon logo"
				/>
				{/* Rest of JSX remains same */}
			</Link>
		</div>
	)
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id)

RelatedProduct.displayName = 'RelatedProduct'

const SingleContent: FC<SingleContentProps> = memo(({ post }) => {
	const router = useRouter()
	// Use refs with proper typing
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const cRef = useRef<HTMLDivElement>(null)
	const relatedRef = useRef<HTMLDivElement>(null)

	const [showTooltip, setShowTooltip] = useState(false)
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
	const [activeHeading, setActiveHeading] = useState<string>('')
	const [isShowScrollToTop, setIsShowScrollToTop] = useState(false)
	const [dataRelated, setDataRelated] = useState<any>({})

	// Memoize post data
	const { content, status, date, amazonShortcode, numberOfToplist } = useMemo(() =>
		getPostDataFromPostFragment(post || {}), [post])
	const [hydratedContent, setHydratedContent] = useState(content)

	const NoT = numberOfToplist?.numberOfToplist || 10
	const post_id = post?.databaseId

	// Optimize lazy loading
	useEffect(() => {
		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (!entry.isIntersecting) return

				const img = entry.target as HTMLImageElement
				const dataSrc = img.dataset.src
				if (!dataSrc) return

				try {
					const optimizedSrc = await parseImageUrl(dataSrc)
					img.src = optimizedSrc
					img.onload = () => {
						img.style.opacity = "1"
						img.parentElement?.classList.add("loaded")
						img.parentElement?.classList.remove("prod-image-container")
					}
					imageObserver.unobserve(img)
				} catch (error) {
					console.error('Image load error:', error)
				}
			})
		}, { threshold: 0.1 })

		document.querySelectorAll(".lazy-load-prod").forEach(img =>
			imageObserver.observe(img))

		return () => imageObserver.disconnect()
	}, [])

	// Optimize data fetching
	useEffect(() => {
		const fetchData = async () => {
			const cacheKey = `related-data-${post_id}`
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/cegg/v1/data/${post_id}`,
					{
						headers: {
							'Cache-Control': 'max-age=300'
						}
					}
				)
				setDataRelated(data)
				sessionStorage.setItem(cacheKey, JSON.stringify({
					data,
					timestamp: Date.now()
				}))
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [post_id])

	const dataRelatedArray = useMemo(() => {
		return dataRelated?.Amazon ? Object.values(dataRelated.Amazon) : []
	}, [dataRelated?.Amazon])

	const amzShortcode = amazonShortcode

	// Tối ưu click handler với useCallback
	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
			setShowTooltip(false)
		}
	}, [])

	const handleClickOutsideLearnMore = (event: MouseEvent) => {
		const learnMoreBtn = document.getElementById('learnMoreBtn')
		const learnMoreContent = document.getElementById('learnMoreContent')

		if (
			learnMoreContent &&
			learnMoreBtn &&
			!learnMoreContent.contains(event.target as Node) &&
			!learnMoreBtn.contains(event.target as Node)
		) {
			learnMoreContent.classList.add('hidden')
			learnMoreContent.classList.remove('block')
		}
	}

	const getButtonHTML = useCallback((text: string, rotateIcon: boolean = false) => `
        ${text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 16 16"
          fill="none"
          ${rotateIcon ? 'style="transform: rotate(180deg); transition: transform 0.3s ease;"' : ''}
        >
          <g id="Primary">
            <path
              id="Vector (Stroke)"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z"
              fill="#1575d4"
            />
          </g>
        </svg>
      `, [])

	// Learn more functionality với cleanup tốt hơn
	useEffect(() => {
		const learnMoreBtn = document.getElementById('learnMoreBtn')
		const learnMoreContent = document.getElementById('learnMoreContent')

		const handleLearnMore = (event: MouseEvent) => {
			event.stopPropagation()
			learnMoreContent?.classList.remove('hidden')
			learnMoreContent?.classList.add('block')
		}

		learnMoreBtn?.addEventListener('click', handleLearnMore)
		document.addEventListener('click', handleClickOutsideLearnMore)

		return () => {
			learnMoreBtn?.removeEventListener('click', handleLearnMore)
			document.removeEventListener('click', handleClickOutsideLearnMore)
		}
	}, [])

	// Toggle button functionality tối ưu
	useEffect(() => {
		const initializeToggleButtons = (selector: string) => {
			const buttons = document.querySelectorAll(selector)
			const contents = document.querySelectorAll('.max-h-content')
			const gradients = document.querySelectorAll('.bg-animate')

			const buttonStates = new WeakMap()

			buttons.forEach((button, index) => {
				const content = contents[index] as HTMLElement
				const gradient = gradients[index] as HTMLElement

				const handleClick = (event: Event) => {
					event.preventDefault()
					event.stopPropagation()

					const isExpanded = buttonStates.get(button) || false

					requestAnimationFrame(() => {
						content.style.maxHeight = isExpanded ? '276px' : `${content.scrollHeight}px`
						gradient.style.opacity = isExpanded ? '1' : '0'
						button.innerHTML = getButtonHTML(isExpanded ? 'Show More' : 'Show Less', !isExpanded)
					})

					buttonStates.set(button, !isExpanded)
				}

				button.addEventListener('click', handleClick)
			})
		}

		initializeToggleButtons('.toggle-button:not(.mob)')
		initializeToggleButtons('.toggle-button.mob')

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])

	// Progress indicator tối ưu với RAF
	useEffect(() => {
		const handleProgressIndicator = () => {
			const entryContent = contentRef.current
			const progressBarContent = progressRef.current

			if (!entryContent || !progressBarContent) return

			const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight
			const winScroll = window.scrollY || document.documentElement.scrollTop
			const scrolled = totalEntryH ? (winScroll / totalEntryH) * 100 : 0

			requestAnimationFrame(() => {
				progressBarContent.innerText = `${Math.round(scrolled)}%`
				setIsShowScrollToTop(scrolled >= 100)
			})
		}

		const debouncedProgressIndicator = debounce(handleProgressIndicator, 100)

		handleProgressIndicator()
		window.addEventListener('scroll', debouncedProgressIndicator, { passive: true })

		return () => {
			window.removeEventListener('scroll', debouncedProgressIndicator)
			debouncedProgressIndicator.cancel()
		}
	}, [])

	// Alert với memo
	const renderAlert = useMemo(() => {
		if (status === 'publish') return null

		if (status === 'future') {
			return (
				<Alert type="warning">
					This post is scheduled. It will be published on {date}.
				</Alert>
			)
		}

		return (
			<Alert type="warning">
				This post is {status}. It will not be visible on the website until it is published.
			</Alert>
		)
	}, [status, date])

	// Slugify function với memoization
	const slugify = useCallback((text: string) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, '-')
			.replace(/^-+|-+$/g, '')
	}, [])

	// Content processing tối ưu
	useEffect(() => {
		if (typeof window === 'undefined') return

		const updateContentWithHeadings = () => {
			const parser = new DOMParser()
			const doc = parser.parseFromString(content, 'text/html')

			// Process headings
			const h2Elements = Array.from(doc.querySelectorAll('h2'))
			h2Elements.forEach(heading => {
				heading.id = `toc-${slugify(heading.textContent || 'heading')}`
			})

			// Process tables với performance tối ưu
			const tables = Array.from(doc.querySelectorAll('table'))
			tables.forEach((table: any) => {
				const firstRow = table.querySelector('tr')
				if (!firstRow) return

				const hasProsOrCons = Array.from(firstRow.querySelectorAll('td'))
					.some((td: any) => td.textContent?.toLowerCase().includes('pros') ||
						td.textContent?.toLowerCase().includes('cons'))

				if (!hasProsOrCons) return

				// Create optimized wrapper
				const wrapper = document.createElement('div')
				wrapper.className = 'pros-cons-table'

				// Process thead
				const thead = table.querySelector('thead')
				if (thead) {
					const theadWrapper = document.createElement('div')
					theadWrapper.className = 'thead-wrapper'

					Array.from(thead.querySelectorAll('th')).forEach((th: any) => {
						const cell = document.createElement('div')
						cell.className = 'thead-cell'
						cell.innerHTML = th.innerHTML
						theadWrapper.appendChild(cell)
					})

					wrapper.appendChild(theadWrapper)
				}

				// Process columns efficiently
				const columns = table.querySelectorAll('tbody tr td')
					.reduce((acc: string[][], cell: Element, index: number) => {
						const columnIndex = index % 2
						if (!acc[columnIndex]) acc[columnIndex] = []

						const icon = columnIndex === 0
							? '<svg width="20" viewBox="0 0 24 24" fill="#358b15" xmlns="http://www.w3.org/2000/svg"><path d="M8.982 18.477a.976.976 0 0 1-.658-.266l-5.056-5.055a.926.926 0 0 1 0-1.305.927.927 0 0 1 1.305 0L8.97 16.25 19.427 5.792a.926.926 0 0 1 1.305 0 .926.926 0 0 1 0 1.304L9.628 18.2a.906.906 0 0 1-.658.265l.012.012Z"></path></svg>'
							: '<svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.62252 7.17879L7.41279 5.38672L18.7265 16.7004L16.8 18.5995L5.62252 7.17879Z" fill="#D71919"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9344 5.50932L18.7265 7.29959L7.41281 18.6133L5.51375 16.6868L16.9344 5.50932Z" fill="#D71919"></path></svg>'

						if (cell.innerHTML) {
							acc[columnIndex].push(icon + cell.innerHTML)
						}
						return acc
					}, [])

				// Build column structure
				columns.forEach((columnData: any) => {
					const columnDiv = document.createElement('div')
					columnDiv.className = 'pros-cons-item'

					columnData.forEach((content: any) => {
						const cell = document.createElement('div')
						cell.className = 'cell'
						cell.innerHTML = content
						columnDiv.appendChild(cell)
					})

					wrapper.appendChild(columnDiv)
				})

				table.replaceWith(wrapper)
			})

			const updatedContent = doc.body.innerHTML
			const headingData = [
				{ id: 'toc-related-deal', text: 'Related Deals' },
				...h2Elements.map(heading => ({
					id: heading.id,
					text: heading.textContent || ''
				}))
			]

			setHeadings(headingData)
			setHydratedContent(updatedContent)
		}

		updateContentWithHeadings()
	}, [content, slugify])

	// Scroll handling với performance tối ưu
	useEffect(() => {
		const handleScroll = debounce(() => {
			requestAnimationFrame(() => {
				const sections = cRef.current?.querySelectorAll('h2')
				if (!sections) return

				const sectionPositions = Array.from(sections).map((section: Element) => ({
					id: section.id,
					top: section.getBoundingClientRect().top - 150
				}))

				let currentActiveId = ''
				for (let i = 0; i < sectionPositions.length; i++) {
					const current = sectionPositions[i]
					const next = sectionPositions[i + 1]

					if (next) {
						if (current.top <= 0 && next.top > 0) {
							currentActiveId = current.id
							break
						}
					} else if (current.top <= 0) {
						currentActiveId = current.id
					}
				}

				if (currentActiveId && currentActiveId !== activeHeading) {
					setActiveHeading(currentActiveId)
				}
			})
		}, 100)

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
			handleScroll.cancel()
		}
	}, [activeHeading])


	return (
		<>
			<div className='container'>
				{renderAlert}
				<div dangerouslySetInnerHTML={{ __html: amzShortcode?.amazonShortcode }}></div>
				<ScrollTop />
				{router.query.gclid != undefined && (
					<SinglePopup prod={dataRelatedArray[0]} />
				)}
			</div>

			{headings && headings?.length > 0 && (
				<div className={`large-width p-5 grid grid-cols-1 ${headings.length === 1 && dataRelatedArray.length > 0
					? 'lg-grid-cols-1'
					: 'lg:grid-cols-12'
					} mt-20`}>
					{((headings.length > 1 && dataRelatedArray.length > 0) ||
						(headings.length > 1 && dataRelatedArray.length === 0)) && (
							<div className='article_menu col-span-3 mb-10 lg:mb-0 flex flex-col lg:block justify-between lg:sticky top-0 h-fit p-5 md:p-2 md:pt-0 rounded lg:shadow-none'>
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
							</div>
						)}

					{(headings.length > 0 && dataRelatedArray.length == 0 || headings.length > 1 && dataRelatedArray.length > 0) && (
						<div></div>
					)}

					<div className='col-span-8' ref={cRef}>
						{dataRelatedArray.length > 0 && (
							<>
								<h2 className='mb-10' id='toc-related-deal'>Related deals you might like</h2>
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
})

SingleContent.displayName = 'SingleContent'

export default SingleContent
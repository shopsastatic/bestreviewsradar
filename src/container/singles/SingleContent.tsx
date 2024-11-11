'use client'

import { FC, forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

export interface SingleContentProps {
	post: any
}

interface CacheData {
	data: any;
	timestamp: number;
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)

	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
	const [dataRelated, setDataRelated] = useState<any>({});

	const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
		threshold: 0,
		root: null,
		rootMargin: '0%',
		freezeOnceVisible: false,
	})

	//
	//
	const {
		content,
		status,
		date,
		amazonShortcode,
		numberOfToplist
	} = getPostDataFromPostFragment(post || {})
	let NoT = numberOfToplist?.numberOfToplist as any

	if (!NoT) {
		NoT = 10
	}

	const post_id = post?.databaseId

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/cegg/v1/data/${post_id}`);
				setDataRelated(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [post_id]);

	let dataRelatedArray = [] as any

	if (dataRelated?.Amazon) {
		dataRelatedArray = Object.values(dataRelated?.Amazon);
	}


	//	

	const amzShortcode = amazonShortcode as any
	//
	const [showMoreStore, setShowMoreStore] = useState(false);
	const ctRef = useRef(null) as any;
	const contentRef = useRef(null);
	const [maxHeights, setMaxHeights] = useState<number[]>([]);
	const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [formVisible, setFormVisible] = useState(true);
	const [thanksVisible, setThanksVisible] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
	const [activeHeading, setActiveHeading] = useState<string>('');
	const cRef = useRef<HTMLDivElement>(null) as any;
	const [hydratedContent, setHydratedContent] = useState(content);
	const [isVisible, setIsVisible] = useState(false);
	const relatedRef = useRef(null);
	const menuRef = useRef(null) as any;
	const buttonRef = useRef(null) as any;
	const handleClickOutside = (event: MouseEvent) => {
		if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
			setShowTooltip(false);
		}
	};


	useEffect(() => {
		var learnMoreBtn = document.getElementById('learnMoreBtn');
		var learnMoreContent = document.getElementById('learnMoreContent');
		learnMoreBtn?.addEventListener('click', function (event) {
			learnMoreContent?.classList.remove('hidden');
			learnMoreContent?.classList.add('block');
			event.stopPropagation();
		});

		document.addEventListener('click', function (event: any) {
			if (!learnMoreContent?.contains(event.target) && !learnMoreBtn?.contains(event.target)) {
				learnMoreContent?.classList.add('hidden');
				learnMoreContent?.classList.remove('block');
			}
		});

		// Set Max Height
		document.querySelectorAll('.toggle-button').forEach((button, index) => {
			let content = document.querySelectorAll('.max-h-content')[index] as any;

			let isExpanded = false;

			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				event.stopPropagation();
				if (isExpanded) {
					content.style.maxHeight = '276px';
					button.innerHTML = `Show More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 16 16"
                        fill="none"
                        <g id="Primary">
                        <path
                            id="Vector (Stroke)"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z"
                            fill="#1575d4" />
                        </g>
                    </svg>`;
				} else {
					content.style.maxHeight = content.scrollHeight + 'px';
					button.innerHTML = `Show Less
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 16 16"
                        fill="none"
						style="transform: rotate(180deg); transition: transform 0.3s ease;"
                        <g id="Primary">
                        <path
                            id="Vector (Stroke)"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z"
                            fill="#1575d4" />
                        </g>
                    </svg>`;
				}
				isExpanded = !isExpanded;
			});
		});

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleClickTooltip = () => {
		setShowTooltip(!showTooltip);
	};

	const contentRefs = useRef([]) as any;

	const handleSignUp = (e: any) => {
		e.preventDefault();

		setFormVisible(false);

		setTimeout(() => {
			setThanksVisible(true);
		}, 1000);
	};

	const toggleExpand = (index: number) => {
		setExpandedItems((prevExpandedItems) => {
			const newExpandedItems = [...prevExpandedItems];
			newExpandedItems[index] = !newExpandedItems[index];

			if (newExpandedItems[index] && contentRefs.current[index]) {
				const content = contentRefs.current[index] as any;
				setMaxHeights((prevMaxHeights) => {
					const newMaxHeights = [...prevMaxHeights];
					newMaxHeights[index] = content.scrollHeight;
					return newMaxHeights;
				});
			}

			return newExpandedItems;
		});
	};

	const toggleStores = (index: number) => {
		setShowMoreStore(!showMoreStore)
		setActiveIndex(prevIndex => prevIndex === index ? null : index);
	};

	useEffect(() => {
		const handleProgressIndicator = () => {
			const entryContent = contentRef.current as any
			const progressBarContent = progressRef.current

			if (!entryContent || !progressBarContent) {
				return
			}

			const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight
			let winScroll =
				document.body.scrollTop || document.documentElement.scrollTop

			let scrolled = totalEntryH ? (winScroll / totalEntryH) * 100 : 0

			progressBarContent.innerText = scrolled.toFixed(0) + '%'

			if (scrolled >= 100) {
				setIsShowScrollToTop(true)
			} else {
				setIsShowScrollToTop(false)
			}
		}

		const handleProgressIndicatorHeadeEvent = () => {
			window?.requestAnimationFrame(handleProgressIndicator)
		}
		handleProgressIndicator()
		window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
		return () => {
			window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
		}
	}, [])


	const transToArray = (str: any) => {
		const descriptionArray = str
			.trim()
			.split('\n')
			.filter((line: any) => line.trim() !== '');


		return descriptionArray
	}

	function parseSP(data: any) {
		if (data) {
			return data.trim().split('\n').map((item: any) => {
				const label = item.trim().split(' ');
				return label
			});
		} else {
			return []
		}
	}

	const renderAlert = () => {
		if (status === 'publish') {
			return null
		}
		if (status === 'future') {
			return (
				<Alert type="warning">
					This post is scheduled. It will be published on {date}.
				</Alert>
			)
		}
		return (
			<>
				<Alert type="warning">
					This post is {status}. It will not be visible on the website until it
					is published.
				</Alert>
			</>
		)
	}

	const slugify = (text: string) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	};


	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateContentWithHeadings = () => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			const h2Elements = Array.from(doc.querySelectorAll('h2'));

			h2Elements.forEach((heading, index) => {
				const slugifiedText = slugify(heading.textContent || `heading`);
				heading.id = `toc-${slugifiedText}`;
			});

			const tables = Array.from(doc.querySelectorAll('table'));
			tables.forEach((table, index) => {
				let hasProsOrCons = false;

				const firstRow = table.querySelector('tr');
				if (firstRow) {
					const tdElements = Array.from(firstRow.querySelectorAll('td'));
					tdElements.forEach((td: any) => {
						const text = td.textContent.toLowerCase();
						if (text.includes('pros') || text.includes('cons')) {
							hasProsOrCons = true;
						}
					});
				}

				if (hasProsOrCons) {
					const newDivWrapper = document.createElement('div');
					newDivWrapper.classList.add('pros-cons-table');

					const thead = table.querySelector('thead');
					if (thead) {
						const theadDiv = document.createElement('div');
						theadDiv.classList.add('thead-wrapper');

						const thElements = Array.from(thead.querySelectorAll('th'));
						thElements.forEach((th) => {
							const thDiv = document.createElement('div');
							thDiv.classList.add('thead-cell');
							thDiv.innerHTML = th.innerHTML;
							theadDiv.appendChild(thDiv);
						});

						newDivWrapper.appendChild(theadDiv);
					}

					const rows = Array.from(table.querySelectorAll('tbody tr'));
					const columns = [] as any;

					rows.forEach((row, rowIndex) => {
						const cells = Array.from(row.querySelectorAll('td'));
						cells.forEach((cell, cellIndex) => {
							if (!columns[cellIndex]) {
								columns[cellIndex] = [];
							}

							if (cell.innerHTML) {
								if (cellIndex == 0) {
									columns[cellIndex].push('<svg width="20" viewBox="0 0 24 24" fill="#358b15" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Checkmark Icon</title><path d="M8.982 18.477a.976.976 0 0 1-.658-.266l-5.056-5.055a.926.926 0 0 1 0-1.305.927.927 0 0 1 1.305 0L8.97 16.25 19.427 5.792a.926.926 0 0 1 1.305 0 .926.926 0 0 1 0 1.304L9.628 18.2a.906.906 0 0 1-.658.265l.012.012Z" class="icon-base"></path></svg>' + cell.innerHTML);
								} else {
									columns[cellIndex].push('<svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.62252 7.17879L7.41279 5.38672L18.7265 16.7004L16.8 18.5995L5.62252 7.17879Z" fill="#D71919"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9344 5.50932L18.7265 7.29959L7.41281 18.6133L5.51375 16.6868L16.9344 5.50932Z" fill="#D71919"></path> </svg>' + cell.innerHTML)
								}
							}
						});
					});

					columns.forEach((columnData: any) => {
						const columnDiv = document.createElement('div');
						columnDiv.classList.add('pros-cons-item');

						columnData.forEach((cellContent: any) => {
							const cellDiv = document.createElement('div');
							cellDiv.classList.add('cell');
							cellDiv.innerHTML = cellContent;
							columnDiv.appendChild(cellDiv);
						});

						newDivWrapper.appendChild(columnDiv);
					});

					table.replaceWith(newDivWrapper);
				}
			});

			const updatedContent = doc.body.innerHTML;
			let headingData = [
				{
					id: 'toc-related-deal',
					text: 'Related Deals',
				}
			]
			h2Elements.map((heading) => (
				headingData.push({
					id: heading.id,
					text: heading.textContent || '',
				})
			));

			setHeadings(headingData);
			setHydratedContent(updatedContent);
		};

		updateContentWithHeadings();

	}, [content]);

	useEffect(() => {
		const handleScroll = () => {
			const sections = cRef.current?.querySelectorAll('h2');
			if (sections) {
				let currentActiveId = '';
				let sectionPositions: { id: string; top: number }[] = [];

				sections.forEach((section: HTMLElement) => {
					sectionPositions.push({ id: section.id, top: section.getBoundingClientRect().top - 150 });
				});

				for (let i = 0; i < sectionPositions.length; i++) {
					const currentSection = sectionPositions[i];
					const nextSection = sectionPositions[i + 1];

					if (nextSection) {
						if (currentSection.top <= 0 && nextSection.top > 0) {
							currentActiveId = currentSection.id;
							break;
						}
					} else {
						if (currentSection.top <= 0) {
							currentActiveId = currentSection.id;
						}
					}
				}

				if (currentActiveId && currentActiveId !== activeHeading) {
					setActiveHeading(currentActiveId);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [activeHeading]);

	return (
		<>
			<div className='container'>
				{renderAlert()}
				{/* content */}
				<div dangerouslySetInnerHTML={{ __html: amzShortcode?.amazonShortcode }}></div>
			</div>

			{headings && headings?.length > 0 && (
				<div className={`large-width p-5 grid grid-cols-1 ${headings.length == 1 && dataRelatedArray.length > 0 ? 'lg-grid-cols-1' : 'lg:grid-cols-12'} mt-20`}>
					{((headings.length > 1 && dataRelatedArray.length > 0) || (headings.length > 1 && dataRelatedArray.length == 0)) && (
						<div className='article_menu col-span-3 mb-10 lg:mb-0 flex flex-col lg:block justify-between lg:sticky top-0 h-fit p-5 md:p-2 md:pt-0 rounded lg:shadow-none'>
							{headings?.length > 0 && (
								<>
									<p className='pb-0 lg:pb-4 border-0 lg:border-b border-[#999] uppercase font-semibold'>On This Page</p>
								</>
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
										<a href={`#${heading.id}`} className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'}`}>{heading.text}</a>
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
										<a href={`#${heading.id}`} className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'}`}>{heading.text}</a>
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
									<div className={`grid grid-cols-1 ${headings.length == 1 && dataRelatedArray.length > 0 ? 'md:grid-cols-3 md:gap-7' : 'md:grid-cols-2 md:gap-10'} gap-3`}>
										{dataRelatedArray.slice(NoT, 50).map((item: any, index: any) => (
											<Link href={item.url ?? "/"} className='col-span-1 related-prod-child' key={index}>
												<img loading='lazy' className='related-prod-image mx-auto rounded-[8px] max-w-[120px] w-[120px] h-[120px] mb-3' src={item?.img ?? "/"} alt={item?.featuredImage?.node?.altText} />
												<img loading='lazy' className='mx-auto !mb-10 max-w-[50px] md:max-w-[85px]' src="/images/posts/amazon.webp" alt="" />

												<div className='block w-fit my-3 mt-1'>
													<p className='font-bold line-clamp-2 text-base'>{item?.title}</p>
												</div>
												<span className='line-clamp-1 block mb-2 text-sm truncate'>{item?.productDatas?.description}</span>
												<div className='box-price flex flex-wrap items-end gap-4'>
													{item?.price > 0 && (
														<span className='font-bold text-base'>${Number(item?.price)?.toFixed(2)}</span>
													)}
													<div className='flex items-center gap-4'>
														{item?.priceOld > 0 && (
															<span className='text-sm line-through text-[#444]'>${Number(item?.priceOld)?.toFixed(2)}</span>
														)}
														{item?.percentageSaved > 0 && (
															<span className='text-sm text-red-700 '>({item?.percentageSaved}% OFF)</span>
														)}
													</div>
												</div>
												<div className='p-2.5 block w-full mt-3 bg-[#ff6b00] hover:bg-[#e06308] transition-all rounded-xl'>
													<button className='text-center text-sm w-full text-white font-semibold'>View Deal</button>
												</div>
											</Link>
										))}
									</div>
								</div>
							</>
						)}
						{hydratedContent && (
							<div className='summary-content' dangerouslySetInnerHTML={{ __html: hydratedContent }}></div>
						)}
					</div>

				</div>
			)}

			<div className="!my-0" ref={endedAnchorRef}></div>
		</>
	)
}

export default SingleContent

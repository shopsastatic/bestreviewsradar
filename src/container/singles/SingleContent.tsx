'use client'

import { FC, forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Tag from '@/components/Tag/Tag'
import SingleAuthor from './SingleAuthor'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction'
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { GetPostSiglePageQuery } from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import NcBookmark from '@/components/NcBookmark/NcBookmark'
import SingleCommentWrap from './SingleCommentWrap'
import { Transition } from '@headlessui/react'
import TableContentAnchor from './TableContentAnchor'
import Alert from '@/components/Alert'
import { clsx } from 'clsx'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import Rating from '@/components/Rating'
import Link from 'next/link'
import RenderStore from '@/components/RenderStore'

declare var dataRelated: any;

export interface SingleContentProps {
	post: GetPostSiglePageQuery['post']
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)

	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)

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
		author,
		databaseId,
		commentCount,
		commentStatus,
		tags,
		status,
		date,
		postData,
		uri,
		amazonShortcode
	} = getPostDataFromPostFragment(post || {})

	//	

	const products = postData?.products?.nodes
	const points = postData?.points
	const amzShortcode = amazonShortcode as any

	const pointLines = points?.trim().split('\n');

	const pointArray = pointLines?.map(line => {
		const numbers = line.split(' ').map(parseFloat);
		return numbers
	});

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
	const [isToggle, setIsToggle] = useState(false);
	const [hydratedContent, setHydratedContent] = useState(content);
	const [isVisible, setIsVisible] = useState(false);
	const relatedRef = useRef(null);
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

	const handleClickToggle = () => {
		setIsToggle(!isToggle);
	}

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

	const calculateRating = (rateIndex: any) => {
		let tag = "Very Good";
		let point = 9.7;

		switch (rateIndex) {
			case 1:
				tag = "Exceptional";
				point = 9.9;
				break;
			case 2:
				tag = "Exceptional";
				point = 9.7;
				break;
			case 3:
				tag = "Excellent";
				point = 9.4;
				break;
			case 4:
				tag = "Excellent";
				point = 9.2;
				break;
			case 5:
				tag = "Excellent";
				point = 9.0;
				break;
			case 6:
				tag = "Excellent";
				point = 8.9;
				break;
			case 7:
				tag = "Very Good";
				point = 8.7;
				break;
			case 8:
				tag = "Very Good";
				point = 8.5;
				break;
			case 9:
				tag = "Very Good";
				point = 8.4;
				break;
			case 10:
				tag = "Good";
				point = 8.2;
				break;
			default:
				tag = "Good";
				point = 8.0;
				break;
		}

		return { tag, point };
	};

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
							table.id = `pros-cons-table`;
						}
					});
				}

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

				<div className='prod-item mt-8'>
					{products && products?.length > 0 && products?.slice(0, 10)?.map((item: any, index: any) => (
						<div key={index}>
							<div className={`prod-child prod-item-${++index} grid grid-cols-1 md:grid-cols-10 bg-white gap-3 md:gap-7 px-4 md:px-0`}>
								{(index == 1 || index == 2 || index == 3 || index == 4) && (
									<div className={`h-tag ${index == 4 ? "sub" : ""} flex items-center absolute -top-[16px] -left-[7px]`}>
										<div className={`${index == 4 ? "noicon-tag-left" : ""} w-[42px] h-[32px] flex justify-center items-center prod-heading-tag relative`}>
											{index == 1 && (
												<svg xmlns="http://www.w3.org/2000/svg" className='mr-2' viewBox="0 0 576 512" width="16" height="16"><path d="M226.5 168.8L287.9 42.3l61.4 126.5c4.6 9.5 13.6 16.1 24.1 17.7l137.4 20.3-99.8 98.8c-7.4 7.3-10.8 17.8-9 28.1l23.5 139.5L303 407.7c-9.4-5-20.7-5-30.2 0L150.2 473.2l23.5-139.5c1.7-10.3-1.6-20.7-9-28.1L65 206.8l137.4-20.3c10.5-1.5 19.5-8.2 24.1-17.7zM424.9 509.1c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2z" fill="#FFFFFF" /></svg>

											)}
											{index == 2 && (
												<svg xmlns="http://www.w3.org/2000/svg" className='mr-2' height="16" viewBox="0 0 512.007 512.007" width="16"><g fill="#fff"><path d="m510.025 139.609-85.333-102.4a8.547 8.547 0 0 0 -6.554-3.063h-324.267a8.524 8.524 0 0 0 -6.554 3.063l-85.333 102.4a8.512 8.512 0 0 0 -1.178 9.079 8.55 8.55 0 0 0 7.731 4.915h494.933a8.55 8.55 0 0 0 7.731-4.915 8.53 8.53 0 0 0 -1.176-9.079zm-483.268-3.072 71.108-85.333h316.271l71.108 85.333z"></path><path d="m263.898 39.402a8.535 8.535 0 0 0 -7.885-5.265h-162.133c-3.055 0-5.871 1.63-7.398 4.284s-1.519 5.905.026 8.55l59.733 102.4a8.541 8.541 0 0 0 6.272 4.164c.367.043.734.068 1.092.068a8.539 8.539 0 0 0 6.042-2.5l102.4-102.4a8.532 8.532 0 0 0 1.851-9.301zm-108.501 91.81-46.669-80.008h126.677z"></path><path d="m511.109 141.281a8.527 8.527 0 0 0 -7.646-4.753h-494.933a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267c1.613 2.116 4.122 3.362 6.784 3.362s5.171-1.246 6.767-3.362l247.467-324.267a8.54 8.54 0 0 0 .87-8.96zm-255.104 313.993-230.221-301.67h460.442z"></path><path d="m264.146 466.76-102.4-324.267a8.538 8.538 0 0 0 -8.141-5.965h-145.067a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267a8.517 8.517 0 0 0 6.784 3.362 8.297 8.297 0 0 0 3.925-.973 8.53 8.53 0 0 0 4.208-10.137zm-238.362-313.156h121.566l85.811 271.736zm399.753-115.183a8.52 8.52 0 0 0 -7.398-4.284h-162.134a8.53 8.53 0 0 0 -6.033 14.566l102.4 102.4a8.503 8.503 0 0 0 6.033 2.5c.367 0 .734-.026 1.101-.068a8.531 8.531 0 0 0 6.272-4.164l59.733-102.4a8.55 8.55 0 0 0 .026-8.55zm-68.924 92.791-80.009-80.008h126.677z"></path><path d="m511.126 141.299a8.527 8.527 0 0 0 -7.646-4.753h-145.067a8.53 8.53 0 0 0 -8.141 5.965l-102.4 324.267a8.539 8.539 0 0 0 4.207 10.138 8.493 8.493 0 0 0 3.925.956 8.574 8.574 0 0 0 6.784-3.345l247.467-324.267a8.54 8.54 0 0 0 .871-8.961zm-232.277 284.04 85.811-271.736h121.566z"></path></g></svg>
											)}
											{/* {index == 3 && (
												<svg xmlns="http://www.w3.org/2000/svg" className='mr-2' fill="#fff" height="16" width="16" version="1.1" id="Layer_1" viewBox="0 0 512.001 512.001">
													<g>
														<g>
															<path d="M468.658,41.987c-11.591,0-22.77,4.755-30.883,13.059L415.699,77.84V41.465c0-5.765-4.901-9.918-10.667-9.918H106.457    c-5.766,0-10.212,4.153-10.212,9.918v35.97L74.384,55.034c-8.1-8.29-19.449-13.045-31.04-13.045C19.46,41.987,0,61.418,0,85.302    c0,51.645,27.57,100.109,71.975,126.48l78.11,46.397c18.865,15.597,41.161,26.982,64.128,33.311v64.731h-54.514    c-5.766,0-10.212,4.675-10.212,10.44v103.701c0,5.765,4.446,10.092,10.212,10.092h192.09c5.766,0,10.667-4.327,10.667-10.092    V366.661c0-5.765-4.901-10.44-10.667-10.44h-54.059V291.49c20.879-5.881,41.908-16.13,59.851-30.064l82.459-49.644    c44.404-26.372,71.961-74.836,71.961-126.48C512,61.418,492.54,41.987,468.658,41.987z M233.004,52.427L233.004,52.427h45.935    v86.777c-7.308-2.989-14.939-4.651-22.967-4.651s-15.66,1.662-22.967,4.651V52.427z M255.744,155.432    c20.148,0,36.539,16.391,36.539,36.539c0,20.148-16.391,36.539-36.539,36.539s-36.539-16.391-36.539-36.539    C219.205,171.824,235.597,155.432,255.744,155.432z M82.623,193.831C44.52,171.202,20.851,129.616,20.851,85.302    c0-12.371,10.065-22.435,22.436-22.435c6.003,0,11.853,2.463,16.025,6.733l35.853,36.818c0.306,0.315,0.769,0.656,1.079,0.867    v43.798c0,20.676,5.006,40.863,14.727,59.517L82.623,193.831z M341.577,459.575H170.366v-20.879h171.211V459.575z     M341.577,377.101v40.715H170.366v-40.715H341.577z M235.092,356.222v-60.438c6.264,0.956,13.929,1.454,20.879,1.454    s13.572-0.498,20.879-1.454v60.438H235.092z M255.972,276.358c-72.668,0-138.848-59.711-138.848-125.276V52.427h95.001v101.091    c0,0.331,0.079,0.657,0.11,0.98c-8.693,10.066-13.939,23.161-13.939,37.473c0,31.66,25.772,57.418,57.433,57.418    s57.426-25.758,57.426-57.418c0-14.312-4.984-27.407-13.678-37.473c0.03-0.324,0.341-0.649,0.341-0.98V52.427h95.001v98.655h0.001    C394.82,216.648,328.639,276.358,255.972,276.358z M429.321,193.83l-28.787,17.163c9.856-18.764,15.165-39.088,15.165-59.911    v-43.309l37.024-38.149c4.195-4.294,9.988-6.758,15.992-6.758c12.371,0,22.407,10.065,22.407,22.435    C491.121,129.616,467.422,171.202,429.321,193.83z" />
														</g>
													</g>
												</svg>
											)} */}
										</div>
										{/* {index == 4 && (
											<div className='tag-has-poligon'>
												<div className="noicon-tag-right bg-white heading-tag-text py-0.5 flex items-center">
													<span className="font-semibold px-4 text-black max-[375px]:text-sm py-0.5">
														{index == 1 ? "Best Choice" : index == 2 ? "Value for Money" : "Best for Cashback"}
													</span>
												</div>
											</div>
										)}

										{index !== 4 && (
											<div className="bg-white heading-tag-text py-0.5 flex items-center">
												<span className="font-semibold px-4 text-black max-[375px]:text-sm py-0.5">
													{index == 1 ? "Best Choice" : index == 2 ? "Value for Money" : "Best for Cashback"}
												</span>
											</div>
										)} */}
									</div>
								)}
								<div className='count-num absolute top-20 -left-[25px]'>
									<div className='hex-wrap'>
										<span className='hex-num'>{index}</span>
									</div>
								</div>
								<div className='col-span-1 md:col-span-3 p-4 pt-10 pb-0 md:pb-10 flex justify-center items-center flex-col'>
									<Link href={item?.productDatas?.actions?.[0]?.actionsLink ?? "/"}>
										<img className='max-w-[140px] min-[400px]:max-w-[180px] max-[375px]:mr-[3.5em]' src={item?.featuredImage?.node?.sourceUrl ?? "/"} alt={item?.featuredImage?.node?.altText} />
									</Link>
									<p className='mt-4 text-sm text-[#615b5b]'>{item?.productDatas?.general?.brand}</p>
								</div>

								<div className='col-span-1 md:col-span-4 pt-5 pb-0 md:pb-5'>
									<Link href={item?.productDatas?.actions?.[0]?.actionsLink ?? "/"}>
										<h2 className='text-[#3e434a] text-base font-semibold line-clamp-2'>{item?.title}</h2>
									</Link>
									{item?.productDatas?.price?.discount && (
										<p className='discount-tag bg-[#f13549] w-fit text-sm text-white p-2 py-1 mt-2 rounded'>{item?.productDatas?.price?.discount}</p>
									)}
									<div ref={(el: any) => (contentRefs.current[index] = el)} className='overflow-hidden' style={{
										maxHeight: `${expandedItems[index] ? maxHeights[index] || 276 : 276}px`,
										transition: 'max-height 0.7s ease',
										willChange: 'max-height'
									}}>
										{parseSP(item?.productDatas?.additionals?.specifications)?.length > 0 && (
											<div className='min-h-5 my-5 rounded-lg md:rounded-2xl p-4 bg-[#e8f2ff] grid grid-cols-1 gap-2'>
												{parseSP(item?.productDatas?.additionals?.specifications)?.map((itemSP: any, indexSP: any) => (
													<div className='flex items-start md:items-center gap-2 col-span-1' key={"sp" + indexSP}>
														<span className='bg-white py-0.5 px-2.5 rounded text-[#3a95ee] font-medium min-w-11 flex justify-center'>{pointArray?.[index - 1]?.[indexSP] ?? 9.4}</span>
														<span className='text-[#615b5b] mt-[2px] md:mt-0'>{itemSP}</span>
													</div>
												))}
											</div>
										)}

										{item?.productDatas?.additionals?.features && (
											<div>
												<h6>Why we love it</h6>
												<div className='features-details mt-2 grid grid-cols-1 gap-2.5'>
													{transToArray(item?.productDatas?.additionals?.features)?.map((itemF: any, indexF: any) => (
														<div className='col-span-1 flex items-start gap-2' key={"F" + indexF}>
															<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className='min-w-[20px] md:min-w-[22px] mt-0 md:mt-0.5' viewBox="0 0 20 20" fill="none">
																<path d="M9.99992 1.04166C7.52633 1.04166 5.2859 2.04504 3.66542 3.66549C2.84062 4.4903 2.17569 5.47573 1.72156 6.57077C1.15266 7.73153 0.833252 9.03679 0.833252 10.4167C0.833252 15.2491 4.75076 19.1667 9.58325 19.1667C10.9631 19.1667 12.2684 18.8472 13.4292 18.2783C14.5242 17.8242 15.5096 17.1593 16.3344 16.3345C17.9549 14.714 18.9583 12.4736 18.9583 9.99999C18.9583 7.5264 17.9549 5.28597 16.3344 3.66549C14.7139 2.04504 12.4735 1.04166 9.99992 1.04166Z" fill="#eaf4ff" />
																<path fillRule="evenodd" clipRule="evenodd" d="M14.6087 7.05806C14.8528 7.30214 14.8528 7.69786 14.6087 7.94194L9.60869 12.9419C9.36461 13.186 8.96888 13.186 8.72481 12.9419L6.22481 10.4419C5.98073 10.1979 5.98073 9.80214 6.22481 9.55806C6.46888 9.31398 6.86461 9.31398 7.10869 9.55806L9.16675 11.6161L13.7248 7.05806C13.9689 6.81398 14.3646 6.81398 14.6087 7.05806Z" fill="#1666b4" />
															</svg>
															<span className='text-[#615b5b]'>{itemF}</span>
														</div>
													))}
												</div>
											</div>
										)}

										<div
											className="prod-content mt-7"
										>
											{(item?.productDatas?.description || item?.productDatas?.flexibleDescription?.content1 || item?.productDatas?.flexibleDescription?.content2 || item?.productDatas?.flexibleDescription?.content3) ? (
												<>
													<h5 className='mb-2 text-[#333]'>Main highlights</h5>
													{(item?.productDatas?.flexibleDescription?.content1 || item?.productDatas?.flexibleDescription?.content2 || item?.productDatas?.flexibleDescription?.content3) ? (
														<div className='grid gap-4'>
															{item?.productDatas?.flexibleDescription?.content1 && (
																<div className='col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4'>
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
																			<g clipPath="url(#clip0_3150_10534)">
																				<path d="M12 12.5L21 3.5" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
																				<path d="M18.3665 6.13549C16.7709 4.53513 14.6327 3.5921 12.375 3.49305C10.1173 3.394 7.90474 4.14613 6.17515 5.6006C4.44556 7.05507 3.32504 9.10586 3.03536 11.3471C2.74569 13.5883 3.30797 15.8566 4.61091 17.703C5.91386 19.5494 7.86252 20.8394 10.0712 21.3176C12.2799 21.7959 14.5876 21.4275 16.5376 20.2854C18.4876 19.1433 19.9378 17.3107 20.6012 15.1504C21.2645 12.9901 21.0927 10.6595 20.1196 8.61986" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
																				<path d="M15.1791 9.31864C14.4359 8.5775 13.4565 8.12011 12.4111 8.02593C11.3658 7.93175 10.3204 8.20673 9.45671 8.8031C8.59299 9.39946 7.96545 10.2795 7.68311 11.2905C7.40076 12.3014 7.48145 13.3793 7.91114 14.3369C8.34084 15.2945 9.09241 16.0713 10.0353 16.5325C10.9782 16.9936 12.0528 17.1099 13.0725 16.8611C14.0922 16.6124 14.9925 16.0143 15.6172 15.1708C16.2418 14.3272 16.5512 13.2916 16.4916 12.2436" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
																			</g>
																			<defs>
																				<clipPath id="clip0_3150_10534">
																					<rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
																				</clipPath>
																			</defs>
																		</svg>
																	</div>
																	<div>
																		<p className='mb-1.5 font-medium'>Key Features and Benefits</p>
																		<span>{item?.productDatas?.flexibleDescription?.content1}</span>
																	</div>
																</div>
															)}

															{item?.productDatas?.flexibleDescription?.content2 && (
																<div className='col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4'>
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
																			<path fillRule="evenodd" clipRule="evenodd" d="M11.9983 2.21436C12.1714 2.21391 12.3298 2.31183 12.4067 2.46691L14.178 6.0359L18.1282 6.61189C18.2992 6.63683 18.4413 6.75658 18.4949 6.92092C18.5485 7.08526 18.5042 7.26575 18.3807 7.38669L15.5077 10.2004L16.1901 14.11C16.22 14.2812 16.1497 14.4545 16.009 14.5565C15.8682 14.6584 15.6817 14.6712 15.5283 14.5895L11.9995 12.7086L8.47137 14.5895C8.31792 14.6713 8.13125 14.6584 7.99048 14.5563C7.84972 14.4542 7.77951 14.2807 7.80963 14.1095L8.49698 10.2003L5.61927 7.38697C5.49558 7.26604 5.45121 7.08541 5.50481 6.92094C5.55841 6.75647 5.70069 6.63666 5.87189 6.61183L9.84361 6.03591L11.5911 2.46901C11.6673 2.31353 11.8251 2.2148 11.9983 2.21436ZM12.0021 3.69719L10.5547 6.65152C10.4886 6.78638 10.3602 6.87991 10.2116 6.90147L6.91283 7.37981L9.30422 9.71773C9.41155 9.82266 9.46018 9.97379 9.43419 10.1216L8.86687 13.3481L11.7855 11.7921C11.9192 11.7208 12.0796 11.7208 12.2133 11.7921L15.1341 13.3489L14.5707 10.1211C14.545 9.97353 14.5935 9.82279 14.7005 9.71801L17.0885 7.37931L13.8111 6.90141C13.6634 6.87988 13.5357 6.78728 13.4694 6.65361L12.0021 3.69719Z" fill="#074786" stroke="#074786" strokeWidth="0.257143" strokeLinejoin="round" />
																			<path fillRule="evenodd" clipRule="evenodd" d="M3.64307 18.2857C3.64307 17.2206 4.50652 16.3572 5.57164 16.3572H18.4288C19.4939 16.3572 20.3574 17.2206 20.3574 18.2857V20.8572C20.3574 21.9223 19.4939 22.7857 18.4288 22.7857H5.57164C4.50653 22.7857 3.64307 21.9223 3.64307 20.8572V18.2857ZM5.57164 17.6429C5.2166 17.6429 4.92878 17.9307 4.92878 18.2857V20.8572C4.92878 21.2122 5.21659 21.5 5.57164 21.5H18.4288C18.7838 21.5 19.0716 21.2122 19.0716 20.8572V18.2857C19.0716 17.9307 18.7838 17.6429 18.4288 17.6429H5.57164Z" fill="#074786" />
																		</svg>
																	</div>
																	<div>
																		<p className='mb-1.5 font-medium'>Key Features and Benefits</p>
																		<span>{item?.productDatas?.flexibleDescription?.content1}</span>
																	</div>
																</div>
															)}

															{item?.productDatas?.flexibleDescription?.content3 && (
																<div className='col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4'>
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><g clipPath="url(#clip0_3150_10534)"><path d="M12 12.5L21 3.5" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.3665 6.13549C16.7709 4.53513 14.6327 3.5921 12.375 3.49305C10.1173 3.394 7.90474 4.14613 6.17515 5.6006C4.44556 7.05507 3.32504 9.10586 3.03536 11.3471C2.74569 13.5883 3.30797 15.8566 4.61091 17.703C5.91386 19.5494 7.86252 20.8394 10.0712 21.3176C12.2799 21.7959 14.5876 21.4275 16.5376 20.2854C18.4876 19.1433 19.9378 17.3107 20.6012 15.1504C21.2645 12.9901 21.0927 10.6595 20.1196 8.61986" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.1791 9.31864C14.4359 8.5775 13.4565 8.12011 12.4111 8.02593C11.3658 7.93175 10.3204 8.20673 9.45671 8.8031C8.59299 9.39946 7.96545 10.2795 7.68311 11.2905C7.40076 12.3014 7.48145 13.3793 7.91114 14.3369C8.34084 15.2945 9.09241 16.0713 10.0353 16.5325C10.9782 16.9936 12.0528 17.1099 13.0725 16.8611C14.0922 16.6124 14.9925 16.0143 15.6172 15.1708C16.2418 14.3272 16.5512 13.2916 16.4916 12.2436" stroke="#074786" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></g><defs><clipPath id="clip0_3150_10534"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>
																	</div>
																	<div>
																		<p className='mb-1.5 font-medium'>Key Features and Benefits</p>
																		<span>{item?.productDatas?.flexibleDescription?.content1}</span>
																	</div>
																</div>
															)}
														</div>
													) : (
														<ul>
															{transToArray(item?.productDatas?.description)?.map((itemM: any, indexM: any) => (
																<li key={"M" + indexM}>{itemM}</li>
															))}
														</ul>
													)}
												</>
											) : null}

										</div>

									</div>
									<button onClick={() => toggleExpand(index)} className='text-[#1575d4] flex items-center gap-1 mt-5 md:mt-2 py-2 w-full justify-center md:justify-start'>
										{expandedItems[index] ? 'Show less' : 'Show more'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="17"
											height="17"
											viewBox="0 0 16 16"
											fill="none"
											style={{
												transform: expandedItems[index] ? 'rotate(180deg)' : 'rotate(0deg)',
												transition: 'transform 0.3s ease'
											}}
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
									</button>
								</div>

								<div className={`col-span-1 md:col-span-3 flex flex-col items-center pr-0 md:pr-5 ${item?.productDatas?.actions?.length == 1 ? "justify-start gap-10" : "justify-between"}`}>
									<div className='heading-poligon'>
										<h2 className='font-bold tracking-wider'>{calculateRating(index)?.point.toFixed(1)}</h2>
										<p className='font-semibold text-sm my-1 mt-0'>{calculateRating(index)?.tag}</p>
										<Rating rating={calculateRating(index)?.point}></Rating>
									</div>
									<div className='w-full'>
										{item?.productDatas?.actions?.length > 0 && (
											<>
												<p className='text-sm text-[#6d6d6d] hidden lg:block'>View offer on:</p>

												<div className='box-action pb-3'>
													{item?.productDatas?.actions?.slice(0, 3)?.map((itemS: any, indexS: any) => (
														<div key={"S" + indexS} className={`flex flex-row md:flex-col lg:flex-row justify-between gap-2 items-center py-4 ${indexS != item?.productDatas?.actions?.length - 1 ? 'border-b' : ''}`}>
															<div className='flex justify-start md:justify-center lg:justify-start text-center lg:text-left'>
																<RenderStore storename={itemS?.stores}></RenderStore>
															</div>
															<div className='flex justify-end md:justify-center lg:justify-end'>
																<Link href={itemS?.actionsLink ?? "/"} className='bg-[#ff6b00] hover:bg-[#e06308] transition-all text-white py-2 px-2.5 rounded-xl font-medium'>
																	<button className='flex flex-nowrap items-center gap-2'>
																		<span>Check Price</span>
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -6.5 38 38" version="1.1">
																			<g id="icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																				<g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1511.000000, -158.000000)" fill="#1C1C1F" fillRule="nonzero">
																					<g id="1" transform="translate(1350.000000, 120.000000)">
																						<path fill='#fff' d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z" id="right-arrow">

																						</path>
																					</g>
																				</g>
																			</g>
																		</svg>
																	</button>
																</Link>
															</div>
														</div>
													))}

													{item?.productDatas?.actions?.length > 3 && (
														<div className='more-store relative'>
															<p onClick={() => toggleStores(index)} className='flex items-center justify-center cursor-pointer select-none text-center mt-4 text-base text-[#666]'>
																More stores ({item?.productDatas?.actions?.length - 3})
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="22"
																	height="22"
																	viewBox="0 0 16 16"
																	fill="none"
																	style={{
																		transform: (showMoreStore && activeIndex == index) ? 'rotate(180deg)' : 'rotate(0deg)',
																		transition: 'transform 0.3s ease'
																	}}
																>
																	<g id="Primary">
																		<path
																			id="Vector (Stroke)"
																			fillRule="evenodd"
																			clipRule="evenodd"
																			d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z"
																			fill="#666"
																		/>
																	</g>
																</svg>
															</p>
															<div className={`store-add absolute bg-white w-full ${(showMoreStore == true && activeIndex == index) ? "block" : "hidden"}`}>
																{item?.productDatas?.actions?.slice(3, 100)?.map((itemT: any, indexT: any) => (
																	<div className='flex justify-between gap-2 items-center py-4 border-b' key={"T" + indexT}>
																		<div className='col-span-1 flex justify-start md:justify-center lg:justify-start text-center lg:text-left'>
																			<RenderStore storename={itemT?.stores}></RenderStore>
																		</div>
																		<div className='col-span-1 flex justify-end md:justify-center lg:justify-end'>
																			<Link href={itemT?.actionsLink ?? "/"} className='bg-[#ff6b00] text-white py-1.5 px-2.5 rounded-xl font-medium'>
																				<button className='flex flex-nowrap items-center gap-2'>
																					<span>Check Price</span>
																					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -6.5 38 38" version="1.1">
																						<g id="icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																							<g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1511.000000, -158.000000)" fill="#1C1C1F" fillRule="nonzero">
																								<g id="1" transform="translate(1350.000000, 120.000000)">
																									<path fill='#fff' d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z" id="right-arrow">

																									</path>
																								</g>
																							</g>
																						</g>
																					</svg>
																				</button>
																			</Link>
																		</div>
																	</div>
																))}
															</div>
														</div>
													)}
												</div>
											</>
										)}
									</div>
								</div>
							</div>

							{index == 1 && (
								<div className='how-it-work'>
									<span className='text-sm text-center block text-[#444]'>Wondering how we select the best products for you?
										<strong onClick={handleClickTooltip} className='relative ml-1 text-sm underline underline-offset-2 cursor-pointer select-none' ref={tooltipRef}>Learn More
											{showTooltip && (
												<span className="absolute z-20 max-[350px]:-right-[35%] max-[490px]:-right-[100%] right-0 pt-2 mt-6 p-4 bg-white text-xs text-left font-normal leading-5 border border-gray-300 shadow-lg rounded-md w-64 md:w-72">
													Our rankings are based on an algorithmic analysis of thousands of customer reviews, considering product quality, brand reputation, merchant service, popularity, and more. These rankings reflect our informed opinion and are designed to guide your shopping decisions. When you purchase through our recommendations, you’ll access the best prices available. We may also earn a commission, at no additional cost to you, which helps us continue delivering valuable insights.
												</span>
											)}
										</strong></span>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{headings?.length > 0 && content && (
				<div className='large-width grid grid-cols-1 lg:grid-cols-12 mt-20'>
					<div className='hidden col-span-3 mb-10 lg:mb-0 items-center lg:block justify-between lg:sticky top-0 h-fit border lg:border-0 p-2 pt-2 md:pt-0 rounded shadow-[1px_1px_5px_rgba(0,0,0,0.4)] lg:shadow-none'>
						{headings?.length > 0 && (
							<>
								<p className='pb-0 lg:pb-4 border-0 lg:border-b border-[#999] uppercase font-semibold'>On This Page</p>
								<div onClick={handleClickToggle} className='cursor-pointer lg:cursor-none lg:hidden jump-mob text-[#2765de] font-medium flex items-center gap-2 border p-3 py-1.5 rounded border-blue-600'>
									Jump to
									<svg viewBox="0 0 24 24" fill="#2765de" width={18} xmlns="http://www.w3.org/2000/svg" focusable="false"><path fillRule="evenodd" clipRule="evenodd" d="M3 5.972a1.099 1.099 0 1 0 2.197 0 1.099 1.099 0 0 0-2.197 0Zm17.163.837H8.107a.84.84 0 0 1-.837-.837.84.84 0 0 1 .837-.837h12.056a.84.84 0 0 1 .837.837.84.84 0 0 1-.837.837ZM8.107 12.837h12.056A.84.84 0 0 0 21 12a.84.84 0 0 0-.837-.837H8.107A.84.84 0 0 0 7.27 12c0 .46.376.837.837.837Zm0 6.028h12.056a.84.84 0 0 0 .837-.837.84.84 0 0 0-.837-.837H8.107a.84.84 0 0 0-.837.837c0 .46.376.837.837.837Zm-4.008-5.64a1.099 1.099 0 1 1 0-2.198 1.099 1.099 0 0 1 0 2.198ZM3 18.027a1.099 1.099 0 1 0 2.197 0 1.099 1.099 0 0 0-2.197 0Z"></path></svg>
								</div>
							</>
						)}

						<ul className='mt-4 flex-col gap-4 hidden lg:flex'>
							{headings.map((heading) => (
								<li
									key={heading.id}
									className={`border-l-2 transition-[padding-left, border-color, color] ${activeHeading === heading.id
										? 'duration-300 font-semibold border-blue-600'
										: 'duration-300 font-normal border-transparent'
										}`}
								>
									<a href={`#${heading.id}`} className={` duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'}`}>{heading.text}</a>
								</li>

							))}
						</ul>
						<ul className='mt-4 flex-col gap-4 hidden lg:flex'>
							{(typeof dataRelated !== 'undefined' ? headings : headings.slice(1)).map((heading) => (
								<li
									key={heading.id}
									className={`border-l-2 transition-[padding-left, border-color, color] ${activeHeading === heading.id
											? 'duration-300 font-semibold border-blue-600'
											: 'duration-300 font-normal border-transparent'
										}`}
								>
									<a
										href={`#${heading.id}`}
										className={`duration-500 block ease-in-out ${activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'
											}`}
									>
										{heading.text}
									</a>
								</li>
							))}
						</ul>

						<ul className={`mt-4 flex-col gap-4 mob-footer-menu flex lg:hidden ${isToggle ? "active" : ""}`}>
							{headings.map((heading) => (
								<li
									key={heading.id}
									className={`border-l-2 transition-[padding-left, border-color, color] duration-500 ease-in-out ${activeHeading === heading.id
										? 'font-semibold border-blue-600 pl-4'
										: 'font-normal border-transparent pl-0'
										}`}
								>
									<a href={`#${heading.id}`}>{heading.text}</a>
								</li>

							))}
						</ul>
					</div>
					<div></div>


					<div className='col-span-8' ref={cRef}>
						{typeof dataRelated !== 'undefined' && dataRelated.length > 0 && (
							<>
								<h2 className='mb-10' id='toc-related-deal'>Related deals you might like for</h2>
								<div className='related-products mb-14 pr-0 lg:pr-4' ref={relatedRef}>
									<div className='grid grid-cols-2 gap-3 md:gap-10'>
										{dataRelated.slice(0, 50).map((item: any, index: any) => (
											<Link href={item.url ?? "/"} className='col-span-1 related-prod-child' key={index}>
												<img className='related-prod-image mx-auto max-w-[120px] w-[120px] h-[120px] mb-3' src={item?.img ?? "/"} alt={item?.featuredImage?.node?.altText} />
												<img className='mx-auto !mb-10 max-w-[50px] md:max-w-[85px]' src="/images/posts/amazon.webp" alt="" />
												<div className='flex flex-wrap items-center gap-1 md:gap-2'>
													{item?.percentageSaved > 0 && (
														<span className='bg-blue-400 mb-1 block w-fit px-2 py-1 rounded-2xl text-xs text-white'>{item?.percentageSaved + "% OFF"}</span>
													)}
													<span className='bg-blue-400 mb-1 block w-fit px-2 py-1 rounded-2xl text-xs text-white'>Free Shipping</span>
												</div>
												<div className='block w-fit my-3 mt-1'>
													<p className='font-semibold line-clamp-2'>{item?.title}</p>
												</div>
												<span className='line-clamp-1 block mb-2 text-sm truncate'>{item?.productDatas?.description}</span>
												<div className='box-price flex flex-wrap items-end gap-4'>
													{item?.price > 0 && (
														<span className='font-bold text-lg md:text-[22px]'>${item?.price}</span>
													)}
													<div className='flex items-center gap-4'>
														{item?.priceOld > 0 && (
															<span className='text-sm line-through text-[#444]'>${item?.priceOld}</span>
														)}
														{item?.percentageSaved > 0 && (
															<span className='text-sm text-red-700 '>({item?.percentageSaved}% OFF)</span>
														)}
													</div>
												</div>
												<div className='p-3 px-2 block w-full mt-3 bg-[#ff6b00] hover:bg-[#e06308] transition-all rounded-xl'>
													<button className='text-center w-full text-white font-semibold'>View Deal</button>
												</div>
											</Link>
										))}
									</div>
								</div>
							</>
						)}
						<div className='summary-content' dangerouslySetInnerHTML={{ __html: hydratedContent }}></div>
					</div>

				</div>
			)}

			<div className="container mt-20 flex flex-col items-center space-y-4 w-full">
				<h3 className="font-bold text-2xl text-gray-700 text-center">Join now for exclusive deals and special offers!</h3>

				<div className={`w-full flex justify-center transition-all duration-1000 ${!formVisible ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}>
					<form onSubmit={handleSignUp} className="w-full flex justify-center overflow-hidden transition-all duration-1000">
						<div className="relative flex flex-col items-center space-x-2 w-full max-w-md">
							<input
								type="text"
								placeholder="Email Address..."
								className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-0"
								required
							/>
							<button className="absolute top-0 bottom-0 right-0 bg-blue-500 border border-[#2563eb] text-white px-5 text-base font-bold rounded-full rounded-tl-none rounded-bl-none w-fit m-auto hover:bg-blue-600">
								Sign Up
							</button>
						</div>
					</form>
				</div>

				{thanksVisible && (
					<div className="text-center text-green-500 font-semibold text-xl mt-4">
						Thank you for subscribing!
					</div>
				)}
			</div>
			<div className="!my-0" ref={endedAnchorRef}></div>
		</>
	)
}

export default SingleContent

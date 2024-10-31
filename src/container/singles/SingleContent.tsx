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
import axios from 'axios'

export interface SingleContentProps {
	post: any
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
		author,
		databaseId,
		commentCount,
		commentStatus,
		tags,
		status,
		date,
		postData,
		uri,
		amazonShortcode,
		numberOfToplist
	} = getPostDataFromPostFragment(post || {})
	let NoT = numberOfToplist?.numberOfToplist as any
	console.log(NoT)

	if(!NoT) {
		NoT = 10
	}

	const post_id = post?.databaseId

	useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://content.bestreviewsradar.com/wp-json/cegg/v1/data/${post_id}`);
                setDataRelated(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [post_id]);

	let dataRelatedArray = [] as any

	if(dataRelated?.Amazon) {
		dataRelatedArray = Object.values(dataRelated?.Amazon);
	}


	//	

	const products = postData?.products?.nodes
	const points = postData?.points
	const amzShortcode = amazonShortcode as any

	const pointLines = points?.trim().split('\n');

	const pointArray = pointLines?.map((line: any) => {
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
														{index == 1 ? "Editor's Choice" : index == 2 ? "Best Value" : "Best for Cashback"}
													</span>
												</div>
											</div>
										)}

										{index !== 4 && (
											<div className="bg-white heading-tag-text py-0.5 flex items-center">
												<span className="font-semibold px-4 text-black max-[375px]:text-sm py-0.5">
													{index == 1 ? "Editor's Choice" : index == 2 ? "Best Value" : "Best for Cashback"}
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
																	<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="21" height="21" viewBox="0 0 32 32"><path d="m26.58 6.834a13.95 13.95 0 0 1 3.42 9.166c0 7.726-6.274 14-14 14s-14-6.274-14-14 6.274-14 14-14a13.95 13.95 0 0 1 9.166 3.42l1.834-1.834v-1.586a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1.586zm-2.832.004a11.956 11.956 0 0 0 -7.748-2.838c-6.622 0-12 5.378-12 12s5.378 12 12 12 12-5.378 12-12c0-2.952-1.068-5.656-2.838-7.748l-2.132 2.132a8.96 8.96 0 0 1 1.97 5.616c0 4.968-4.032 9-9 9s-9-4.032-9-9 4.032-9 9-9a8.96 8.96 0 0 1 5.616 1.97zm-3.556 3.556a7.003 7.003 0 0 0 -11.192 5.606c0 3.864 3.136 7 7 7a7.003 7.003 0 0 0 5.606-11.192l-1.436 1.436c.524.79.83 1.738.83 2.756 0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5c1.018 0 1.966.306 2.756.83zm-2.898 2.898a3.001 3.001 0 1 0 -1.294 5.708 3.001 3.001 0 0 0 2.708-4.294l-2 2.002c-.392.39-1.024.39-1.416 0a1.003 1.003 0 0 1 0-1.416z" fill="#07499e"/></svg>
																	</div>
																	<div>
																		<p className='title-desc mb-1.5 font-bold'>Key Features and Benefits</p>
																		<span>{item?.productDatas?.flexibleDescription?.content1}</span>
																	</div>
																</div>
															)}

															{item?.productDatas?.flexibleDescription?.content2 && (
																<div className='col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4'>
																	<div>
																	<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="22" height="22" viewBox="0 0 32 32"><path d="m11.116 27.007v-3.607a.997.997 0 0 0 -.4-.8l-.01-.007a8.613 8.613 0 0 1 -3.341-6.839c0-4.83 3.921-8.752 8.752-8.752s8.752 3.921 8.752 8.752a8.743 8.743 0 0 1 -3.311 6.855l-.022.016a.971.971 0 0 0 -.387.774v.033c-.03.946-.03 2.394-.03 3.575a3.004 3.004 0 0 1 -3.002 3h-4a3.001 3.001 0 0 1 -3.001-3zm8.06-4.001a2.977 2.977 0 0 1 1.15-1.974 6.74 6.74 0 0 0 2.543-5.278c0-3.726-3.026-6.752-6.752-6.752s-6.752 3.026-6.752 6.752a6.62 6.62 0 0 0 2.562 5.255 2.995 2.995 0 0 1 1.163 1.997zm-6.767-5.795a1.001 1.001 0 0 1 1.415-1.414l1.21 1.21 3.303-4.129a1.001 1.001 0 0 1 1.562 1.25l-4.002 5.002a.998.998 0 0 1 -1.488.081zm.707 7.795v2.001a1 1 0 0 0 1.001 1h4a1.001 1.001 0 0 0 1.001-1c0-.63 0-1.334.004-2.001zm2.001-23.005a1 1 0 0 1 2 0v2a1 1 0 1 1 -2 0zm12.003 15.004a1 1 0 0 1 0-2.002h2.001a1.001 1.001 0 0 1 0 2.002zm-24.007 0a1 1 0 0 1 0-2.002h2.001a1.001 1.001 0 0 1 0 2.002zm23.007-12.418a1.001 1.001 0 0 1 1.414 1.415l-1.414 1.413a.999.999 0 1 1 -1.415-1.413zm-21.42 1.415a1.001 1.001 0 0 1 1.414-1.415l1.416 1.415a1 1 0 1 1 -1.415 1.413z" fill="#07499e"/></svg>
																	</div>
																	<div>
																		<p className='title-desc mb-1.5 font-bold'>Key Features and Benefits</p>
																		<span>{item?.productDatas?.flexibleDescription?.content1}</span>
																	</div>
																</div>
															)}

															{item?.productDatas?.flexibleDescription?.content3 && (
																<div className='col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4'>
																	<div>
																	<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="22" height="22" viewBox="0 0 32 32"><path d="m23.922 12.093s-1.735-1.171-3.123-2.752c-1.037-1.181-1.84-2.594-1.84-3.93 0-1.886 1.515-3.41 3.373-3.41.816 0 1.565.293 2.149.782a3.338 3.338 0 0 1 2.149-.783c1.858 0 3.374 1.524 3.374 3.41 0 1.336-.805 2.749-1.841 3.93-1.388 1.58-3.123 2.752-3.123 2.752a.998.998 0 0 1 -1.118 0zm.559-2.066c.553-.425 1.426-1.147 2.18-2.006.702-.8 1.344-1.706 1.344-2.61 0-.775-.612-1.41-1.375-1.41-.55 0-1.023.332-1.244.805a.999.999 0 0 1 -1.81 0 1.376 1.376 0 0 0 -1.244-.805c-.763 0-1.376.635-1.376 1.41 0 .904.643 1.81 1.344 2.61.755.86 1.627 1.581 2.18 2.006zm-12.517-5.027a6 6 0 0 1 0 12 6 6 0 0 1 0-12zm0 2a4 4 0 0 0 0 8 4 4 0 0 0 0-8zm4.996 12a5.002 5.002 0 0 1 4.996 5v3a3.002 3.002 0 0 1 -2.998 3h-13.988a2.996 2.996 0 0 1 -2.997-3v-3a4.994 4.994 0 0 1 4.996-5zm0 2h-9.991a2.996 2.996 0 0 0 -2.998 3v3a1.001 1.001 0 0 0 1 1h13.987a1 1 0 0 0 .999-1v-3a2.997 2.997 0 0 0 -2.997-3z" fill="#07499e"/></svg>
																	</div>
																	<div>
																		<p className='title-desc mb-1.5 font-bold'>Key Features and Benefits</p>
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

			{headings && headings?.length > 0 && (
				<div className={`large-width grid grid-cols-1 ${headings.length == 1 && dataRelatedArray.length > 0 ? 'lg-grid-cols-1' : 'lg:grid-cols-12'} mt-20`}>
					{(headings.length > 1 && dataRelatedArray.length > 0 || hydratedContent) && (
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
												<img className='related-prod-image mx-auto rounded-[8px] max-w-[120px] w-[120px] h-[120px] mb-3' src={item?.img ?? "/"} alt={item?.featuredImage?.node?.altText} />
												<img className='mx-auto !mb-10 max-w-[50px] md:max-w-[85px]' src="/images/posts/amazon.webp" alt="" />

												<div className='block w-fit my-3 mt-1'>
													<p className='font-semibold line-clamp-2 text-base'>{item?.title}</p>
												</div>
												<span className='line-clamp-1 block mb-2 text-sm truncate'>{item?.productDatas?.description}</span>
												<div className='box-price flex flex-wrap items-end gap-4'>
													{item?.price > 0 && (
														<span className='font-bold text-base'>${item?.price}</span>
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

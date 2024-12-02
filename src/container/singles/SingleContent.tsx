'use client'

import { FC, useEffect, useRef, useState, memo } from 'react'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import Link from 'next/link'
import ScrollTop from '@/components/ScrollTop'
import debounce from 'lodash/debounce'
import SinglePopup from '@/components/SinglePopup'
import { useRouter } from 'next/router'

// Types
export interface SingleContentProps {
	post: any
}

const parseImageUrl = async (url: string) => {
	const imgDomain = "https://img.bestreviewsradar.com/";
	const contentDomain = "https://content.bestreviewsradar.com/";
	const replacementPath = `${imgDomain}image/upload/c_scale,w_160,h_160,dpr_1.25/f_auto,q_auto/`;

	if (!url || typeof url !== "string") {
		return "/";
	}

	if (url.startsWith(imgDomain)) {
		if (url.includes('/images/')) {
			const [baseUrl, queryParams] = url.split('?');

			const matches = baseUrl.match(/\/([^\/]+?)(?:_[a-f0-9]+)?\.(?:jpg|jpeg|png|gif)$/i);
			if (matches && matches[1]) {
				const fileName = matches[1];
				const extension = url.split('.').pop()?.split('?')[0] || 'jpg';
				let newUrl = `${imgDomain}image/upload/c_scale,w_160,h_160/f_auto,q_auto/${fileName}.${extension}`;
				if (queryParams) {
					newUrl += `?${queryParams}`;
				}
				return newUrl;
			}
		}
		return url;
	}

	if (url.startsWith(contentDomain)) {
		const regex = /^https:\/\/content\.bestreviewsradar\.com\/wp-content\/uploads\/\d{4}\/\d{2}\//;
		return url.replace(regex, replacementPath);
	}

	return url;
};

const RelatedProduct = memo(({ item }: { item: any }) => {
	const [imageSrc, setImageSrc] = useState<string>("/");
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observerRef.current) {
				observer.unobserve(observerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const fetchImageUrl = async () => {
			if (isVisible && item?.img) {
				try {
					const updatedUrl = await parseImageUrl(item.img)
					setImageSrc(updatedUrl ?? item?.img);
				} catch (e) {
					setImageSrc(item?.img);
				}
			}
		};

		fetchImageUrl();
	}, [isVisible, item?.img]);

	return (
		<div ref={observerRef} className="col-span-1 related-prod-child">
			<Link href={item.url ?? "/"}>
				<div className="max-h-[94px] h-full m-auto mb-3 relative">
					{imageSrc === "/" ? (
						<div className="skeleton-card w-[94px] h-[94px] bg-gray-300 animate-pulse mx-auto rounded-lg"></div>
					) : (
						<img
							loading="lazy"
							width={94}
							height={94}
							className="related-prod-image mx-auto rounded-lg max-w-24 w-full h-full object-contain"
							src={imageSrc}
							alt={item?.title || "Related product image"}
						/>
					)}
				</div>
				<img
					loading="lazy"
					className="mx-auto !mb-10 max-w-[50px] md:max-w-[85px]"
					src="/images/posts/amazon.webp"
					alt="Amazon logo"
				/>
				<div className="block w-fit my-3 mt-1">
					<p className="font-bold line-clamp-2 text-base">{item?.title}</p>
				</div>
				<span className="line-clamp-1 block mb-2 text-sm truncate">
					{item?.productDatas?.description}
				</span>
				<div className="box-price flex flex-wrap items-end gap-4">
					{item?.price > 0 && (
						<span className="font-bold text-base">
							${Number(item?.price)?.toFixed(2)}
						</span>
					)}
					<div className="flex items-center gap-4">
						{item?.priceOld > 0 && (
							<span className="text-sm line-through text-[#444] leading-6">
								${Number(item?.priceOld)?.toFixed(2)}
							</span>
						)}
						{item?.percentageSaved > 0 && (
							<span className="text-sm text-red-700">
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
		</div>
	);
});

RelatedProduct.displayName = 'RelatedProduct'

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const router = useRouter()
	// Refs
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	const contentRef = useRef(null)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [showTooltip, setShowTooltip] = useState(false)
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
	const [activeHeading, setActiveHeading] = useState<string>('')
	const cRef = useRef<HTMLDivElement>(null) as any
	const relatedRef = useRef(null)

	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)

	// Get post data
	const {
		content,
		status,
		date,
		contentEggData,
		numberOfToplist
	} = getPostDataFromPostFragment(post || {})

	const amzData = JSON.parse(contentEggData) as any

	const [hydratedContent, setHydratedContent] = useState(content)

	let NoT = numberOfToplist?.numberOfToplist as any
	if (!NoT) {
		NoT = 10
	}

	const post_id = post?.databaseId

	useEffect(() => {
		const handleLazyLoading = () => {
			const lazyImages = document.querySelectorAll(".lazy-load-prod");

			const imageObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as any;
						const dataSrc = img.getAttribute("data-src");

						if (dataSrc) {
							parseImageUrl(dataSrc).then((data: any) => {
								img.src = data
								img.setAttribute('data-src', data);
								img.onload = () => {
									img.style.opacity = "1";
									img.parentElement?.classList.add("loaded");
									img.parentElement?.classList.remove("prod-image-container")
								};
								img.onerror = () => {
									if (img.src.includes('c_scale')) {
										const retryUrl = img.src.replace(/c_scale,w_160,h_160/g, 'w_160,h_160');
										img.src = retryUrl;

										img.onerror = () => {
											img.src = dataSrc;
											img.parentElement?.classList.add("loaded");
											img.parentElement?.classList.remove("prod-image-container");
										};
									} else {
										img.src = dataSrc;
										img.parentElement?.classList.add("loaded");
										img.parentElement?.classList.remove("prod-image-container");
									}
								};
								observer.unobserve(img);
							})
						}
					}
				});
			}, {
				threshold: 0.1
			});

			lazyImages.forEach((img) => imageObserver.observe(img));
		};
		handleLazyLoading()
	}, [])

	// Handle click outside
	const handleClickOutside = (event: MouseEvent) => {
		if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
			setShowTooltip(false)
		}
	}

	// Learn more button functionality
	useEffect(() => {
		const learnMoreBtn = document.getElementById('learnMoreBtn')
		const learnMoreContent = document.getElementById('learnMoreContent')

		const handleLearnMore = (event: any) => {
			learnMoreContent?.classList.remove('hidden')
			learnMoreContent?.classList.add('block')
			event.stopPropagation()
		}

		const handleClickOutsideLearnMore = (event: any) => {
			if (!learnMoreContent?.contains(event.target) && !learnMoreBtn?.contains(event.target)) {
				learnMoreContent?.classList.add('hidden')
				learnMoreContent?.classList.remove('block')
			}
		}

		learnMoreBtn?.addEventListener('click', handleLearnMore)
		document.addEventListener('click', handleClickOutsideLearnMore)

		return () => {
			learnMoreBtn?.removeEventListener('click', handleLearnMore)
			document.removeEventListener('click', handleClickOutsideLearnMore)
		}
	}, [])

	// Toggle button functionality
	useEffect(() => {
		const initializeToggleButtons = (selector: string) => {
			document.querySelectorAll(selector).forEach((button, index) => {
				let content = document.querySelectorAll('.max-h-content')[index] as HTMLElement;
				const listBgGradient = document.querySelectorAll(".bg-animate")[index] as HTMLElement

				let isExpanded = false;

				button.addEventListener('click', function (event) {
					event.preventDefault();
					event.stopPropagation();

					const getButtonHTML = (text: string, rotateIcon: boolean = false) => `
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
          `;

					if (isExpanded) {
						content.style.maxHeight = '276px';
						listBgGradient.style.opacity = '1'
						button.innerHTML = getButtonHTML('Show More');
					} else {
						content.style.maxHeight = content.scrollHeight + 'px';
						listBgGradient.style.opacity = '0'
						button.innerHTML = getButtonHTML('Show Less', true);
					}

					isExpanded = !isExpanded;
				});
			});
		};

		initializeToggleButtons('.toggle-button:not(.mob)');
		initializeToggleButtons('.toggle-button.mob');

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Progress indicator
	useEffect(() => {
		const handleProgressIndicator = () => {
			const entryContent = contentRef.current as any;
			const progressBarContent = progressRef.current;

			if (!entryContent || !progressBarContent) return;

			const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
			let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			let scrolled = totalEntryH ? (winScroll / totalEntryH) * 100 : 0;

			progressBarContent.innerText = scrolled.toFixed(0) + '%';
			setIsShowScrollToTop(scrolled >= 100);
		};

		const debouncedProgressIndicator = debounce(() => {
			requestAnimationFrame(handleProgressIndicator);
		}, 100);

		handleProgressIndicator();
		window.addEventListener('scroll', debouncedProgressIndicator, { passive: true });

		return () => {
			window.removeEventListener('scroll', debouncedProgressIndicator);
			debouncedProgressIndicator.cancel();
		};
	}, []);

	// Process content and extract headings
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateContentWithHeadings = () => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			const h2Elements = Array.from(doc.querySelectorAll('h2'));

			h2Elements.forEach((heading) => {
				const slugifiedText = slugify(heading.textContent || `heading`);
				heading.id = `toc-${slugifiedText}`;
			});

			const tables = Array.from(doc.querySelectorAll('table'));
			tables.forEach((table) => {
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

						Array.from(thead.querySelectorAll('th')).forEach((th) => {
							const thDiv = document.createElement('div');
							thDiv.classList.add('thead-cell');
							thDiv.innerHTML = th.innerHTML;
							theadDiv.appendChild(thDiv);
						});

						newDivWrapper.appendChild(theadDiv);
					}

					const rows = Array.from(table.querySelectorAll('tbody tr'));
					const columns = [] as any[];

					rows.forEach((row) => {
						const cells = Array.from(row.querySelectorAll('td'));
						cells.forEach((cell, cellIndex) => {
							if (!columns[cellIndex]) {
								columns[cellIndex] = [];
							}

							if (cell.innerHTML) {
								const icon = cellIndex === 0
									? '<svg width="20" viewBox="0 0 24 24" fill="#358b15" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Checkmark Icon</title><path d="M8.982 18.477a.976.976 0 0 1-.658-.266l-5.056-5.055a.926.926 0 0 1 0-1.305.927.927 0 0 1 1.305 0L8.97 16.25 19.427 5.792a.926.926 0 0 1 1.305 0 .926.926 0 0 1 0 1.304L9.628 18.2a.906.906 0 0 1-.658.265l.012.012Z" class="icon-base"></path></svg>'
									: '<svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.62252 7.17879L7.41279 5.38672L18.7265 16.7004L16.8 18.5995L5.62252 7.17879Z" fill="#D71919"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9344 5.50932L18.7265 7.29959L7.41281 18.6133L5.51375 16.6868L16.9344 5.50932Z" fill="#D71919"></path></svg>';
								columns[cellIndex].push(icon + cell.innerHTML);
							}
						});
					});

					columns.forEach((columnData) => {
						const columnDiv = document.createElement('div');
						columnDiv.classList.add('pros-cons-item');

						columnData.forEach((cellContent: string) => {
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
			const headingData = [
				{ id: 'toc-related-deal', text: 'Related Deals' },
				...h2Elements.map((heading) => ({
					id: heading.id,
					text: heading.textContent || '',
				}))
			];

			setHeadings(headingData);
			setHydratedContent(updatedContent);
		};

		updateContentWithHeadings();
	}, [content]);

	// Handle scroll for active heading
	useEffect(() => {
		const handleScroll = debounce(() => {
			const sections = cRef.current?.querySelectorAll('h2');
			const btn_link = cRef.current?.querySelectorAll('.amz-link-content a');

			if (amzData.length > 0) {
				Array.from(btn_link).map((btn: any, index: any) => {
					let org_link = 1;
					if (btn.href.match(/0\.0\.0\.(\d+)/)) {
						org_link = Number(btn.href.match(/0\.0\.0\.(\d+)/)?.[1])
					} else {
						org_link = Number(btn.href.replace(/\/$/, '').split('/').pop());
					}
					if (org_link) {
						btn.href = amzData?.[org_link - 1]?.url
					}
				});
			}

			if (!sections) return;

			let currentActiveId = '';
			const sectionPositions = Array.from(sections).map((section: any) => ({
				id: section.id,
				top: section.getBoundingClientRect().top - 150
			}));

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
		}, 100);

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			handleScroll.cancel();
		};
	}, [activeHeading]);

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

		return [tag, point] as any;
	};

	// Render individual star
	const renderStar = (filled = false, partial = 0) => {
		if (filled) {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="#ffb506"
					className="feather feather-star"
					style={{ marginRight: '0px' }}
				>
					<polygon
						stroke="#ffb506"
						strokeWidth="1"
						points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"
					/>
				</svg>
			);
		} else if (partial > 0) {
			const percent = partial * 100;
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					className="feather feather-star"
					style={{ marginRight: '0px' }}
				>
					<defs>
						<linearGradient id={`grad${percent}`}>
							<stop offset={`${percent}%`} stopColor="#ffb506" />
							<stop offset={`${percent}%`} stopColor="#fff" />
						</linearGradient>
					</defs>
					<polygon
						stroke="#ffb506"
						strokeWidth="1"
						points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"
						fill={`url(#grad${percent})`}
					/>
				</svg>
			);
		} else {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="#f1f1f1"
					className="feather feather-star"
					style={{ marginRight: '0px' }}
				>
					<polygon
						stroke="#ffb506"
						strokeWidth="1"
						points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"
					/>
				</svg>
			);
		}
	};

	// Render full rating component
	const renderRating = (rating: any) => {
		rating = Number(rating.toFixed(1));

		if (rating >= 9.7) {
			rating = 5;
		} else if (rating >= 9 && rating < 9.7) {
			rating = rating - 5 + 0.01;
		} else if (rating > 8.2 && rating < 9) {
			rating = 4;
		} else {
			rating = 3.5;
		}

		return (
			<div className="stars" style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
				{[...Array(5)].map((_, i) => {
					if (rating >= i + 1) {
						return renderStar(true);
					} else if (rating > i && rating < i + 1) {
						const partial = rating - i;
						return renderStar(false, partial);
					} else {
						return renderStar(false);
					}
				})}
			</div>
		);
	};

	const stringToArray = (str: any) => {
		if (!str) return [];

		return str.split('\n')
			.map((line: any) => line.trim())
			.filter((line: any) => line.length > 0);
	};

	const pointToArray = (point: any) => {
		if (!point) return [];

		return point.split(' ')
			.map((line: any) => line.trim())
			.filter((line: any) => line.length > 0);
	};

	const processDescription = (desc: any) => {
		if (!desc) return [];

		let result = [];

		if (desc.toLowerCase().includes('<ul>') && desc.toLowerCase().includes('<li>')) {
			const regex = /<li[^>]*>(.*?)<\/li>/gis;
			const matches = [...desc.matchAll(regex)];
			result = matches.map(match => match[1].trim());
		} else {
			result = desc.split('<br />')
				.map((line: any) => line.trim())
				.filter((line: any) => line.length > 0);
		}

		return result;
	};

	// Alert render
	const renderAlert = () => {
		if (status === 'publish') return null;

		if (status === 'future') {
			return (
				<Alert type="warning">
					This post is scheduled. It will be published on {date}.
				</Alert>
			);
		}

		return (
			<Alert type="warning">
				This post is {status}. It will not be visible on the website until it is published.
			</Alert>
		);
	};

	// Slugify text
	const slugify = (text: string) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	};

	let counter = 0;

	return (
		<>
			<div className='container'>
				{renderAlert()}
				{/* html */}
				{amzData?.length > 0 && (
					1
				)}

				<ScrollTop />
				{/* {router.query.gclid != undefined && (
					<SinglePopup prod={amzData[0]} />
				)} */}
			</div>

			{headings && headings?.length > 0 && (
				<div className={`large-width p-5 grid grid-cols-1 ${headings.length === 1 && amzData.length > 0
					? 'lg-grid-cols-1'
					: 'lg:grid-cols-12'
					} mt-20`}>
					{((headings.length > 1 && amzData.length > 0) ||
						(headings.length > 1 && amzData.length === 0)) && (
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

					{(headings.length > 0 && amzData.length == 0 || headings.length > 1 && amzData.length > 0) && (
						<div></div>
					)}

					<div className='col-span-8' ref={cRef}>
						{amzData.length > 0 && (
							<>
								<h2 className='mb-10' id='toc-related-deal'>Related deals you might like</h2>
								<div className='related-products mb-14 pr-0 lg:pr-4' ref={relatedRef}>
									<div className={`grid grid-cols-1 ${headings.length === 1 && amzData.length > 0
										? 'md:grid-cols-3 md:gap-7'
										: 'md:grid-cols-2 md:gap-10'
										} gap-6`}>
										{amzData.slice(NoT, 50).map((item: any, index: number) => (
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
	);
};

export default SingleContent;

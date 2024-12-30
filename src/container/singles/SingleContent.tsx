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
				try{
					const updatedUrl = await parseImageUrl(item.img)
					setImageSrc(updatedUrl ?? item?.img);
				}catch(e) {
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

			if (amzData?.length > 0) {
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

	let counter = 0;

	return (
		<>
			<div className='container'>
				{renderAlert()}
				{/* html */}
				{amzData?.length > 0 && (
					<div className="product-list">
						{amzData?.slice(0, NoT).map((item: any, index: any) => (
							<div className="prod-item mt-8" key={index}>
								<a href={item?.url || "/"} target="_blank" className={`prod-child prod-item-${++counter} cursor-pointer grid grid-cols-1 md:grid-cols-10 bg-white rounded-2xl gap-x-3 md:gap-x-7 px-4 md:px-0`}>
									{(counter === 1 || counter === 2 || counter === 3 || counter === 4) && (
										<div className={`h-tag ${counter === 4 ? 'sub' : ''} flex items-center absolute -top-[16px] -left-[6px]`}>
											<div className={`${counter === 4 ? 'noicon-tag-left' : ''} w-[42px] h-[32px] flex justify-center items-center prod-heading-tag relative`}>
												{counter === 1 && (
													<svg xmlns="http://www.w3.org/2000/svg" className="mr-2" viewBox="0 0 576 512" width="16" height="16">
														<path d="M226.5 168.8L287.9 42.3l61.4 126.5c4.6 9.5 13.6 16.1 24.1 17.7l137.4 20.3-99.8 98.8c-7.4 7.3-10.8 17.8-9 28.1l23.5 139.5L303 407.7c-9.4-5-20.7-5-30.2 0L150.2 473.2l23.5-139.5c1.7-10.3-1.6-20.7-9-28.1L65 206.8l137.4-20.3c10.5-1.5 19.5-8.2 24.1-17.7zM424.9 509.1c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2z" fill="#FFFFFF"></path>
													</svg>
												)}
												{counter === 2 && (
													<svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="16" viewBox="0 0 512.007 512.007" width="16">
														<g fill="#fff">
															<path d="m510.025 139.609-85.333-102.4a8.547 8.547 0 0 0 -6.554-3.063h-324.267a8.524 8.524 0 0 0 -6.554 3.063l-85.333 102.4a8.512 8.512 0 0 0 -1.178 9.079 8.55 8.55 0 0 0 7.731 4.915h494.933a8.55 8.55 0 0 0 7.731-4.915 8.53 8.53 0 0 0 -1.176-9.079zm-483.268-3.072 71.108-85.333h316.271l71.108 85.333z"></path>
															<path d="m263.898 39.402a8.535 8.535 0 0 0 -7.885-5.265h-162.133c-3.055 0-5.871 1.63-7.398 4.284s-1.519 5.905.026 8.55l59.733 102.4a8.541 8.541 0 0 0 6.272 4.164c.367.043.734.068 1.092.068a8.539 8.539 0 0 0 6.042-2.5l102.4-102.4a8.532 8.532 0 0 0 1.851-9.301zm-108.501 91.81-46.669-80.008h126.677z"></path>
															<path d="m511.109 141.281a8.527 8.527 0 0 0 -7.646-4.753h-494.933a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267c1.613 2.116 4.122 3.362 6.784 3.362s5.171-1.246 6.767-3.362l247.467-324.267a8.54 8.54 0 0 0 .87-8.96zm-255.104 313.993-230.221-301.67h460.442z"></path>
															<path d="m264.146 466.76-102.4-324.267a8.538 8.538 0 0 0 -8.141-5.965h-145.067a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267a8.517 8.517 0 0 0 6.784 3.362 8.297 8.297 0 0 0 3.925-.973 8.53 8.53 0 0 0 4.208-10.137zm-238.362-313.156h121.566l85.811 271.736zm399.753-115.183a8.52 8.52 0 0 0 -7.398-4.284h-162.134a8.53 8.53 0 0 0 -6.033 14.566l102.4 102.4a8.503 8.503 0 0 0 6.033 2.5c.367 0 .734-.026 1.101-.068a8.531 8.531 0 0 0 6.272-4.164l59.733-102.4a8.55 8.55 0 0 0 .026-8.55zm-68.924 92.791-80.009-80.008h126.677z"></path>
															<path d="m511.126 141.299a8.527 8.527 0 0 0 -7.646-4.753h-145.067a8.53 8.53 0 0 0 -8.141 5.965l-102.4 324.267a8.539 8.539 0 0 0 4.207 10.138 8.493 8.493 0 0 0 3.925.956 8.574 8.574 0 0 0 6.784-3.345l247.467-324.267a8.54 8.54 0 0 0 .871-8.961zm-232.277 284.04 85.811-271.736h121.566z"></path>
														</g>
													</svg>
												)}
												{counter === 3 && (
													<svg xmlns="http://www.w3.org/2000/svg" className="mr-2" fill="#fff" height="16" width="16" version="1.1" id="Layer_1" viewBox="0 0 512.001 512.001">
														<g>
															<g>
																<path d="M468.658,41.987c-11.591,0-22.77,4.755-30.883,13.059L415.699,77.84V41.465c0-5.765-4.901-9.918-10.667-9.918H106.457c-5.766,0-10.212,4.153-10.212,9.918v35.97L74.384,55.034c-8.1-8.29-19.449-13.045-31.04-13.045C19.46,41.987,0,61.418,0,85.302c0,51.645,27.57,100.109,71.975,126.48l78.11,46.397c18.865,15.597,41.161,26.982,64.128,33.311v64.731h-54.514c-5.766,0-10.212,4.675-10.212,10.44v103.701c0,5.765,4.446,10.092,10.212,10.092h192.09c5.766,0,10.667-4.327,10.667-10.092V366.661c0-5.765-4.901-10.44-10.667-10.44h-54.059V291.49c20.879-5.881,41.908-16.13,59.851-30.064l82.459-49.644c44.404-26.372,71.961-74.836,71.961-126.48C512,61.418,492.54,41.987,468.658,41.987z" />
															</g>
														</g>
													</svg>
												)}
											</div>
											{counter === 4 ? (
												<div className="tag-has-poligon">
													<div className="noicon-tag-right bg-white heading-tag-text py-0 flex items-center">
														<span className="font-semibold px-4 text-black max-[375px]:text-sm py-0.5">
															{/* {counter === 1 ? "Editor's Choice" : counter === 2 ? "Best Value" : "Best for Cashback"} */}
														</span>
													</div>
												</div>
											) : (
												<div className="bg-white heading-tag-text py-0 flex items-center">
													<span className="font-semibold px-4 text-black max-[375px]:text-sm py-0.5">
														{counter === 1 ? "Editor's Choice" : counter === 2 ? "Best Value" : "Best for Cashback"}
													</span>
												</div>
											)}
										</div>
									)}
									<div className="count-num absolute top-20">
										<div className="hex-wrap">
											<span className="hex-num">{counter}</span>
										</div>
									</div>
									<div className="prod-feature col-span-1 md:col-span-3 p-4 pt-10 pb-0 md:pb-10 flex justify-center items-center flex-col">
										<div className="prod-image-container">
											<img
												className="lazy-load-prod prod-image"
												data-src={item.img}
												src="/"
												alt={item.title}
											/>
										</div>
										<p className="mt-4 text-sm text-center text-[#615b5b]">{item.manufacturer}</p>
									</div>
									<div className="col-span-1 md:col-span-4 pt-5 pb-0">
										<h2 className="text-[#3e434a] text-base font-semibold line-clamp-2">{item.title}</h2>
										{item.percentageSaved > 0 && (
											<p className="discount-tag w-fit text-sm text-white p-2 py-1 mt-2 rounded">-{item.percentageSaved}%</p>
										)}
										<div className="max-h-content relative">
											{/* specifications */}
											{stringToArray(item.specs)?.length > 0 && pointToArray(item.specs_points)?.length > 0 && (
												<div className="specs-container min-h-5 my-3 rounded-lg md:rounded-2xl p-4 bg-[#f0f6fd] grid grid-cols-1 gap-2">
													{stringToArray(item.specs)?.map((spec: any, index: any) => (
														<div key={index} className="flex items-center gap-2 col-span-1">
															<span className="spec-point bg-white py-0.5 px-2.5 rounded font-medium min-w-11 flex justify-center">
																{Number(pointToArray(item.specs_points)[index]).toFixed(1)}
															</span>
															<span className="text-[#42495f] font-medium">{spec}</span>
														</div>
													))}
												</div>
											)}

											{/* features */}
											{stringToArray(item.feats)?.length > 0 && (
												<div>
													<h2 className="text-base">Why we love it</h2>
													<div className="features-details mt-3 grid grid-cols-1 gap-1.5">
														{stringToArray(item.feats).map((feat: any, index: any) => (
															<div key={index} className="col-span-1 flex items-start gap-2">
																<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px]" style={{ minWidth: "22px" }}>
																	<g transform="translate(12 12)">
																		<circle fill="#e8f0fe" r="10" />
																		<path d="m-5 0 3.33 3.33 6.67-6.66" fill="none" stroke="#326cbb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
																	</g>
																</svg>
																<span className="text-[#42495f]">{feat}</span>
															</div>
														))}
													</div>
												</div>
											)}

											{(item.cusDescContent1 || item.cusDescContent2 || item.cusDescContent3 || item.description) && (
												<div className="prod-content mt-4">
													<h2 className="mb-3 text-[#333] text-base">Main highlights</h2>
													{(item.cusDescContent1 || item.cusDescContent2 || item.cusDescContent3) ? (
														<div className="grid gap-4">
															{item.cusDescContent1 && (
																<div className="main-highlight-item col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4">
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="20" height="24" viewBox="0 0 32 32">
																			<path d="m26.58 6.834a13.95 13.95 0 0 1 3.42 9.166c0 7.726-6.274 14-14 14s-14-6.274-14-14 6.274-14 14-14a13.95 13.95 0 0 1 9.166 3.42l1.834-1.834v-1.586a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1.586zm-2.832.004a11.956 11.956 0 0 0 -7.748-2.838c-6.622 0-12 5.378-12 12s5.378 12 12 12 12-5.378 12-12c0-2.952-1.068-5.656-2.838-7.748l-2.132 2.132a8.96 8.96 0 0 1 1.97 5.616c0 4.968-4.032 9-9 9s-9-4.032-9-9 4.032-9 9-9a8.96 8.96 0 0 1 5.616 1.97zm-3.556 3.556a7.003 7.003 0 0 0 -11.192 5.606c0 3.864 3.136 7 7 7a7.003 7.003 0 0 0 5.606-11.192l-1.436 1.436c.524.79.83 1.738.83 2.756 0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5c1.018 0 1.966.306 2.756.83zm-2.898 2.898a3.001 3.001 0 1 0 -1.294 5.708 3.001 3.001 0 0 0 2.708-4.294l-2 2.002c-.392.39-1.024.39-1.416 0a1.003 1.003 0 0 1 0-1.416z" fill="#07499e"></path>
																		</svg>
																	</div>
																	<div>
																		<p className="title-desc mb-1.5 font-semibold">{item.cusDescTitle1 || "Key Features"}</p>
																		<span>{item.cusDescContent1}</span>
																	</div>
																</div>
															)}

															{item.cusDescContent2 && (
																<div className="main-highlight-item col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4">
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="24" height="24" viewBox="0 0 32 32">
																			<path d="m11.116 27.007v-3.607a.997.997 0 0 0 -.4-.8l-.01-.007a8.613 8.613 0 0 1 -3.341-6.839c0-4.83 3.921-8.752 8.752-8.752s8.752 3.921 8.752 8.752a8.743 8.743 0 0 1 -3.311 6.855l-.022.016a.971.971 0 0 0 -.387.774v.033c-.03.946-.03 2.394-.03 3.575a3.004 3.004 0 0 1 -3.002 3h-4a3.001 3.001 0 0 1 -3.001-3zm8.06-4.001a2.977 2.977 0 0 1 1.15-1.974 6.74 6.74 0 0 0 2.543-5.278c0-3.726-3.026-6.752-6.752-6.752s-6.752 3.026-6.752 6.752a6.62 6.62 0 0 0 2.562 5.255 2.995 2.995 0 0 1 1.163 1.997zm-6.767-5.795a1.001 1.001 0 0 1 1.415-1.414l1.21 1.21 3.303-4.129a1.001 1.001 0 0 1 1.562 1.25l-4.002 5.002a.998.998 0 0 1 -1.488.081zm.707 7.795v2.001a1 1 0 0 0 1.001 1h4a1.001 1.001 0 0 0 1.001-1c0-.63 0-1.334.004-2.001zm2.001-23.005a1 1 0 0 1 2 0v2a1 1 0 1 1 -2 0zm12.003 15.004a1 1 0 0 1 0-2.002h2.001a1.001 1.001 0 0 1 0 2.002zm-24.007 0a1 1 0 0 1 0-2.002h2.001a1.001 1.001 0 0 1 0 2.002zm23.007-12.418a1.001 1.001 0 0 1 1.414 1.415l-1.414 1.413a.999.999 0 1 1 -1.415-1.413zm-21.42 1.415a1.001 1.001 0 0 1 1.414-1.415l1.416 1.415a1 1 0 1 1 -1.415 1.413z" fill="#07499e"></path>
																		</svg>
																	</div>
																	<div>
																		<p className="title-desc mb-1.5 font-semibold">{item.cusDescTitle2 || "Ideal Uses Cases"}</p>
																		<span>{item.cusDescContent2}</span>
																	</div>
																</div>
															)}

															{item.cusDescContent3 && (
																<div className="main-highlight-item col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4">
																	<div>
																		<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" fill-rule="evenodd" width="22" height="22" viewBox="0 0 32 32">
																			<path d="m23.922 12.093s-1.735-1.171-3.123-2.752c-1.037-1.181-1.84-2.594-1.84-3.93 0-1.886 1.515-3.41 3.373-3.41.816 0 1.565.293 2.149.782a3.338 3.338 0 0 1 2.149-.783c1.858 0 3.374 1.524 3.374 3.41 0 1.336-.805 2.749-1.841 3.93-1.388 1.58-3.123 2.752-3.123 2.752a.998.998 0 0 1 -1.118 0zm.559-2.066c.553-.425 1.426-1.147 2.18-2.006.702-.8 1.344-1.706 1.344-2.61 0-.775-.612-1.41-1.375-1.41-.55 0-1.023.332-1.244.805a.999.999 0 0 1 -1.81 0 1.376 1.376 0 0 0 -1.244-.805c-.763 0-1.376.635-1.376 1.41 0 .904.643 1.81 1.344 2.61.755.86 1.627 1.581 2.18 2.006zm-12.517-5.027a6 6 0 0 1 0 12 6 6 0 0 1 0-12zm0 2a4 4 0 0 0 0 8 4 4 0 0 0 0-8zm4.996 12a5.002 5.002 0 0 1 4.996 5v3a3.002 3.002 0 0 1 -2.998 3h-13.988a2.996 2.996 0 0 1 -2.997-3v-3a4.994 4.994 0 0 1 4.996-5zm0 2h-9.991a2.996 2.996 0 0 0 -2.998 3v3a1.001 1.001 0 0 0 1 1h13.987a1 1 0 0 0 .999-1v-3a2.997 2.997 0 0 0 -2.997-3z" fill="#07499e"></path>
																		</svg>
																	</div>
																	<div>
																		<p className="title-desc mb-1.5 font-semibold">{item.cusDescTitle3 || "Customer Praise"}</p>
																		<span>{item.cusDescContent3}</span>
																	</div>
																</div>
															)}
														</div>
													) : (
														processDescription(item.description)?.length > 0 && (
															<ul>
																{processDescription(item.description).map((desc: any, index: any) => (
																	<li key={index}>{desc}</li>
																))}
															</ul>
														)
													)}
												</div>
											)}

											<div className="bg-animate absolute bottom-0 left-0 right-0 h-6"
												style={{ background: "linear-gradient(to top, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.7) 0, rgba(255, 255, 255, 0) 100%)" }}>
											</div>
										</div>

										<button className="toggle-button w-full text-base m-auto md:w-fit flex items-center gap-1 mt-2.5 mb-2.5 md:mt-2 py-2 justify-center md:justify-start">
											Show More
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
												<path fillRule="evenodd" clipRule="evenodd" d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z" fill="#1575d4" />
											</svg>
										</button>
									</div>

									<div className="col-span-1 md:col-span-3 flex flex-col sec-3 items-center pr-0 md:pr-5 mb-2 justify-between">
										<div className="heading-poligon">
											<h2 className="font-bold tracking-wider">{calculateRating(counter)[1].toFixed(1)}</h2>
											<p className="font-semibold text-sm my-1 mt-0">{calculateRating(counter)[0]}</p>
											{renderRating(calculateRating(counter)[1])}
										</div>

										<div className="w-full">
											<p className="text-sm text-[#6d6d6d] hidden lg:block">View offer on:</p>
											<div className="box-action pb-3">
												<div className="flex flex-row md:flex-col lg:flex-row justify-between gap-2 items-center pb-2 pt-8 md:pt-2">
													<div className="flex justify-start md:justify-center lg:justify-start text-center lg:text-left">
														{/* Amazon SVG Logo */}
														<svg xmlns="http://www.w3.org/2000/svg" width="70" height="25" viewBox="0 0 59 25" className="mt-5">
															<path fill-rule="evenodd" clip-rule="evenodd" d="M34.4458 5.46043V4.08679C34.4446 4.0408 34.4524 3.99503 34.4688 3.95229C34.4851 3.90955 34.5096 3.87072 34.5409 3.83819C34.5721 3.80565 34.6093 3.78009 34.6503 3.76306C34.6913 3.74604 34.7352 3.7379 34.7794 3.73915H40.6795C40.8686 3.73915 41.0205 3.88123 41.0205 4.08679V5.26273C41.0182 5.45982 40.8581 5.71799 40.5762 6.12609L37.5194 10.6763C38.6563 10.6472 39.8547 10.8238 40.8848 11.429C41.1168 11.5656 41.1748 11.7657 41.198 11.9635V13.4296C41.198 13.6291 40.9857 13.8637 40.763 13.7428C38.9475 12.7512 36.5363 12.6424 34.5294 13.7531C34.3246 13.8691 34.11 13.637 34.11 13.4375V12.0451C34.11 11.8214 34.1123 11.4405 34.3269 11.1001L37.8692 5.80505H34.7921C34.603 5.80505 34.4511 5.66599 34.4511 5.46043H34.4458ZM12.9213 14.0324H11.1267C10.955 14.0191 10.8193 13.8849 10.8059 13.7138V4.11037C10.8059 3.91811 10.9602 3.76575 11.1516 3.76575H12.8256C12.9996 3.77361 13.1388 3.91327 13.1516 4.08618V5.34132H13.1847C13.6214 4.1279 14.4422 3.562 15.5477 3.562C16.6713 3.562 17.3731 4.1279 17.8783 5.34132C18.3133 4.1279 19.2994 3.562 20.358 3.562C21.1103 3.562 21.9333 3.88546 22.4356 4.61218C23.0041 5.41992 22.8881 6.59404 22.8881 7.62306L22.884 13.6847C22.884 13.877 22.7297 14.0324 22.5383 14.0324H20.7402C20.5662 14.0191 20.4171 13.8691 20.4171 13.6847V8.588C20.4171 8.18292 20.4519 7.17204 20.3667 6.78812C20.2332 6.14362 19.8313 5.96164 19.311 5.96164C18.876 5.96164 18.4224 6.26394 18.2379 6.74882C18.0535 7.23371 18.0715 8.04386 18.0715 8.5886V13.6793C18.0715 13.8716 17.9172 14.0269 17.7258 14.0269H15.9276C15.7461 14.0136 15.6046 13.8637 15.6046 13.6793L15.6023 8.5886C15.6023 7.51726 15.7716 5.94048 14.4961 5.94048C13.2061 5.94048 13.2566 7.47736 13.2566 8.5886V13.6793C13.2566 13.8716 13.1023 14.0269 12.9109 14.0269L12.9213 14.0324ZM46.1005 3.56986C48.764 3.56986 50.206 5.95438 50.206 8.98582C50.206 11.9151 48.6126 14.2385 46.1005 14.2385C43.4903 14.2385 42.0605 11.854 42.0605 8.88304C42.0605 5.89332 43.5025 3.56261 46.1005 3.56261V3.56986ZM46.1156 5.52331C44.7931 5.52331 44.709 7.40239 44.709 8.57349C44.709 9.74459 44.6916 12.2524 46.0999 12.2524C47.4908 12.2524 47.5569 10.2313 47.5569 8.99973C47.5569 8.18957 47.5239 7.2204 47.2901 6.45196C47.0883 5.78328 46.6863 5.52331 46.1156 5.52331ZM53.6607 14.0324H51.873C51.699 14.0191 51.5499 13.8691 51.5499 13.6847L51.5476 4.07893C51.5627 3.90239 51.7117 3.76575 51.8933 3.76575H53.558C53.7146 3.77361 53.8434 3.88425 53.8787 4.03419V5.50335H53.9118C54.4141 4.19017 55.1183 3.56382 56.3584 3.56382C57.1704 3.56382 57.9488 3.86611 58.4541 4.69562C58.9181 5.46345 58.9181 6.75608 58.9181 7.68534V13.7313C58.8978 13.9006 58.7487 14.0336 58.5724 14.0336H56.7754C56.6113 14.0203 56.475 13.8945 56.4576 13.7313V8.51545C56.4576 7.46526 56.5736 5.92778 55.3341 5.92778C54.8973 5.92778 54.4959 6.2331 54.29 6.69562C54.0377 7.28207 54.0046 7.86672 54.0046 8.51424V13.6859C54.0023 13.8782 53.8457 14.0336 53.6537 14.0336L53.6607 14.0324ZM29.7418 9.43866C29.7418 10.1678 29.7592 10.7688 29.4053 11.4229C29.12 11.9489 28.6658 12.273 28.1629 12.273C27.4738 12.273 27.0695 11.7258 27.0695 10.9175C27.0695 9.32258 28.4407 9.03298 29.7406 9.03298L29.7418 9.43866ZM31.5503 13.9991C31.4314 14.1098 31.2603 14.1176 31.1269 14.0439C30.5312 13.5281 30.4227 13.2881 30.0967 12.7966C29.1118 13.8437 28.4129 14.1569 27.1374 14.1569C25.6253 14.1569 24.4507 13.1859 24.4507 11.241C24.4507 9.72222 25.2384 8.68836 26.3648 8.18292C27.3393 7.73552 28.7 7.65692 29.7406 7.53298V7.29114C29.7406 6.84616 29.7737 6.32016 29.5202 5.93564C29.3033 5.59102 28.8839 5.44894 28.5127 5.44894C27.8282 5.44894 27.2192 5.81472 27.0707 6.57349C27.0405 6.74277 26.9216 6.90783 26.7575 6.91569L25.0174 6.72101C24.8712 6.68655 24.7071 6.56381 24.7506 6.32802C25.1496 4.1273 27.0591 3.46466 28.7644 3.46466C29.6379 3.46466 30.7794 3.7065 31.4685 4.39574C32.3421 5.2458 32.2585 6.38002 32.2585 7.6146V10.5306C32.2585 11.4072 32.6065 11.7911 32.9354 12.2657C33.0491 12.435 33.0746 12.637 32.9279 12.7633L31.5555 14.0112L31.5532 14.0052L31.5503 13.9991ZM6.20801 9.44471C6.20801 10.1739 6.22541 10.7748 5.87159 11.429C5.58621 11.955 5.13494 12.279 4.62915 12.279C3.94007 12.279 3.53869 11.7319 3.53869 10.9235C3.53869 9.32863 4.90989 9.03903 6.20685 9.03903L6.20801 9.44471ZM8.01656 14.0052C7.89765 14.1158 7.72654 14.1237 7.59313 14.0499C6.99743 13.5342 6.89709 13.2942 6.56299 12.8026C5.57809 13.8498 4.88089 14.163 3.60365 14.163C2.0944 14.1636 0.918091 13.1926 0.918091 11.2482C0.918091 9.72947 1.7081 8.69562 2.83221 8.19017C3.80666 7.74277 5.16743 7.66418 6.20801 7.54024V7.2984C6.20801 6.85341 6.24107 6.32742 5.99108 5.9429C5.77066 5.59828 5.35304 5.4562 4.98355 5.4562C4.29911 5.4562 3.68834 5.82198 3.53347 6.58074C3.50331 6.75003 3.3844 6.91508 3.22315 6.92294L1.48072 6.72826C1.33456 6.6938 1.17331 6.57107 1.21391 6.33528C1.61529 4.13455 3.52245 3.47192 5.22775 3.47192C6.10128 3.47192 7.24279 3.71375 7.93187 4.40299C8.8054 5.25305 8.72188 6.38727 8.72188 7.62186V10.5378C8.72188 11.4145 9.0699 11.7984 9.39878 12.273C9.51479 12.4423 9.54031 12.6442 9.39298 12.7706L8.0241 14.0112L8.0183 14.0052" fill="#221F1F"></path>
															<path fill-rule="evenodd" clip-rule="evenodd" d="M42.3501 17.4925C38.9859 20.0819 34.0939 21.4647 29.8874 21.4647C23.9896 21.4647 18.6794 19.1914 14.6627 15.409C14.3471 15.1116 14.6296 14.7065 15.0084 14.9375C19.3436 17.5674 24.7037 19.1485 30.2401 19.1485C33.9744 19.1485 38.0822 18.3431 41.8594 16.672C42.4301 16.4193 42.9069 17.0614 42.3489 17.4931L42.3501 17.4925ZM43.7515 15.822C43.3222 15.2476 40.9093 15.5511 39.8176 15.6853C39.487 15.7277 39.4366 15.4272 39.7341 15.2113C41.6598 13.7978 44.821 14.2059 45.1905 14.6793C45.56 15.1527 45.0948 18.458 43.2845 20.0348C43.0061 20.2766 42.7416 20.1478 42.8652 19.8268C43.2712 18.7688 44.183 16.3975 43.7515 15.8214" fill="#FF9900"></path>
														</svg>
													</div>
													<div className="flex justify-end lg:justify-end w-full">
														<button className="check-price-button text-base flex flex-nowrap items-center gap-2 bg-[#ff6b00] hover:bg-[#e06308] transition-all text-white px-2.5 rounded-xl font-medium">
															<span>Check Price</span>
															<svg height="16" viewBox="0 -6.5 38 38" width="16" xmlns="http://www.w3.org/2000/svg">
																<path d="m187.812138 38.5802109 10.513086 10.4240604.087896.0815708c.351763.3488153.55642.8088476.58688 1.3523806l-.001752.1827201c-.025518.4305489-.190058.84187-.514308 1.2104549l-.12268.1266231-10.549122 10.4617683c-.78015.7736145-2.041567.7736145-2.821717 0-.784816-.778241-.784816-2.0435318-.000063-2.8217102l7.283906-7.2241696-29.274794.0007198c-1.102402 0-1.99947-.8895527-1.99947-1.9910973s.897068-1.9910973 1.999445-1.9910973l29.039758-.0007193-7.048782-6.9897315c-.784816-.778241-.784816-2.0435318 0-2.8217728.78015-.7736145 2.041567-.7736145 2.821717 0z" fill="#fff" transform="translate(-161 -38)" />
															</svg>
														</button>
													</div>
												</div>
											</div>
											<div className="text-sm font-semibold text-[#ff6b00] text-center more-deals-btn flex justify-center items-center mb-3">
												More Deals (1)
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
													<path fillRule="evenodd" clipRule="evenodd" d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z" fill="#ff6b00" />
												</svg>
											</div>

											<div>
												<button className="toggle-button mob text-base w-full m-auto md:w-fit flex items-center gap-1 mt-0 mb-0.5 md:mb-2.5 md:mt-2 py-2 justify-center md:justify-start">
													Show More
													<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
														<path fillRule="evenodd" clipRule="evenodd" d="M3.98043 5.64645C4.17569 5.45118 4.49228 5.45118 4.68754 5.64645L8.33398 9.29289L11.9804 5.64645C12.1757 5.45118 12.4923 5.45118 12.6875 5.64645C12.8828 5.84171 12.8828 6.15829 12.6875 6.35355L8.68754 10.3536C8.49228 10.5488 8.17569 10.5488 7.98043 10.3536L3.98043 6.35355C3.78517 6.15829 3.78517 5.84171 3.98043 5.64645Z" fill="#1575d4" />
													</svg>
												</button>
											</div>
										</div>
									</div>
								</a>

								{counter === 1 && (
									<div className="how-it-work">
										<span className="text-sm text-center block text-[#444]">
											Wondering how we select the best products for you?
											<strong className="relative font-normal ml-1 text-sm underline underline-offset-2 cursor-pointer select-none" id="learnMoreBtn">
												<span>Learn More</span>
												<span id="learnMoreContent" className="hidden absolute z-20 max-[350px]:-right-[35%] max-[490px]:-right-[100%] right-0 pt-2 mt-6 p-4 bg-white text-xs text-left font-normal leading-5 border border-gray-300 shadow-lg rounded-md w-64 md:w-72">
													Our rankings come from analyzing thousands of customer reviews, looking at factors like product quality, brand reputation, and merchant service. These rankings aim to help guide your shopping choices. By using our recommendations, you'll find the best available prices. We may receive a commission on purchases, at no extra cost to you, which supports our work.
												</span>
											</strong>
										</span>
									</div>
								)}
							</div>
						))}
					</div>
				)}

				<ScrollTop />
				{router.query.gclid != undefined && (
					<SinglePopup prod={amzData[0]} />
				)}
			</div>

			{headings && headings?.length > 0 && (
				<div className={`large-width p-5 grid grid-cols-1 ${headings?.length === 1 && amzData?.length > 0
					? 'lg-grid-cols-1'
					: 'lg:grid-cols-12'
					} mt-20`}>
					{((headings?.length > 1 && amzData?.length > 0) ||
						(headings?.length > 1 && amzData?.length === 0)) && (
							<div className='article_menu col-span-3 mb-10 lg:mb-0 flex flex-col lg:block justify-between lg:sticky top-0 h-fit p-5 md:p-2 md:pt-0 rounded lg:shadow-none'>
								{headings?.length > 0 && (
									<p className='pb-0 lg:pb-4 border-0 lg:border-b border-[#999] uppercase font-semibold'>
										On This Page
									</p>
								)}

								<ul className='mt-4 flex-col gap-6 hidden lg:flex'>
									{headings?.map((heading) => (
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
									{headings?.map((heading) => (
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

					{(headings?.length > 0 && amzData?.length == 0 || headings?.length > 1 && amzData?.length > 0) && (
						<div></div>
					)}

					<div className='col-span-8' ref={cRef}>
						{amzData?.length > 0 && (
							<>
								<h2 className='mb-10' id='toc-related-deal'>Related deals you might like</h2>
								<div className='related-products mb-14 pr-0 lg:pr-4' ref={relatedRef}>
									<div className={`grid grid-cols-1 ${headings?.length === 1 && amzData?.length > 0
										? 'md:grid-cols-3 md:gap-7'
										: 'md:grid-cols-2 md:gap-10'
										} gap-6`}>
										{amzData?.slice(NoT, 50).map((item: any, index: number) => (
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

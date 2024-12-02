'use client'

import { FC, useEffect, useRef, useState, memo, useCallback } from 'react'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import Link from 'next/link'
import ScrollTop from '@/components/ScrollTop'
import debounce from 'lodash/debounce'
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
	// Refs
	const contentRef = useRef(null)
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
	const [activeHeading, setActiveHeading] = useState<string>('')
	const cRef = useRef<HTMLDivElement>(null) as any
	const relatedRef = useRef(null)

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


	useEffect(() => {
		const handleScroll = debounce(() => {
			const sections = cRef.current?.querySelectorAll('h2');
			const btn_link = cRef.current?.querySelectorAll('.amz-link-content a');

			if (Array.from(btn_link).length > 0) {
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

	const LearnMore = memo(() => {
		const [show, setShow] = useState(false)
		const contentRef = useRef() as any
		const btnRef = useRef() as any

		useEffect(() => {
			const handleClick = (e: any) => {
				if (!contentRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) {
					setShow(false)
				}
			}

			document.addEventListener('click', handleClick, { passive: true })
			return () => document.removeEventListener('click', handleClick)
		}, [])

		return (
			<div className="how-it-work">
				<span className="text-sm text-center block text-[#444]">
					Wondering how we select the best products for you?
					<strong
						ref={btnRef}
						onClick={(e) => {
							e.stopPropagation()
							setShow(true)
						}}
						className="relative font-normal ml-1 text-sm underline underline-offset-2 cursor-pointer select-none"
					>
						<span>Learn More</span>
						<span
							ref={contentRef}
							className={`${show ? 'block' : 'hidden'} absolute z-20 max-[350px]:-right-[35%] max-[490px]:-right-[100%] right-0 pt-2 mt-6 p-4 bg-white text-xs text-left font-normal leading-5 border border-gray-300 shadow-lg rounded-md w-64 md:w-72`}
						>
							Our rankings come from analyzing thousands of customer reviews, looking at factors like product quality, brand reputation, and merchant service. These rankings aim to help guide your shopping choices. By using our recommendations, you'll find the best available prices. We may receive a commission on purchases, at no extra cost to you, which supports our work.
						</span>
					</strong>
				</span>
			</div>
		)
	})

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

	const ProductImage = memo(({ img, title, manufacturer }: any) => {
		const imageRef = useRef<HTMLImageElement>(null);

		const handleImageIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && imageRef.current) {
					const img = imageRef.current;

					parseImageUrl(img.dataset.src || '').then((data) => {
						img.src = data;
						img.dataset.src = data;
						img.style.opacity = "1";
						img.parentElement?.classList.add("loaded");
						img.parentElement?.classList.remove("prod-image-container");

						img.onerror = handleImageError(img);
					});
				}
			});
		}, []);

		const handleImageError = useCallback((img: HTMLImageElement) => () => {
			if (img.src.includes('c_scale')) {
				const retryUrl = img.src.replace(/c_scale,w_160,h_160/g, 'w_160,h_160');
				img.src = retryUrl;

				img.onerror = () => {
					img.src = img.dataset.src || '/';
					img.parentElement?.classList.add("loaded");
					img.parentElement?.classList.remove("prod-image-container");
				};
			}
		}, []);

		useEffect(() => {
			const observer = new IntersectionObserver(handleImageIntersection, {
				threshold: 0.1,
			});

			const currentImage = imageRef.current;
			if (currentImage) {
				observer.observe(currentImage);
			}

			return () => {
				if (currentImage) {
					observer.unobserve(currentImage);
				}
				observer.disconnect();
			};
		}, [handleImageIntersection]);

		return (
			<div className="prod-feature col-span-1 md:col-span-3 p-4 pt-10 pb-0 md:pb-10 flex justify-center items-center flex-col">
				<div className="prod-image-container">
					<img
						ref={imageRef}
						className="lazy-load-prod prod-image opacity-0 transition-opacity duration-300"
						data-src={img}
						src="/"
						alt={title}
					/>
				</div>
				<p className="mt-4 text-sm text-center text-[#615b5b]">{manufacturer}</p>
			</div>
		);
	});

	const ProductRating = memo(({ rating, counter }: any) => (
		<div className="heading-poligon">
			<h2 className="font-bold tracking-wider">{calculateRating(counter)[1].toFixed(1)}</h2>
			<p className="font-semibold text-sm my-1 mt-0">{calculateRating(counter)[0]}</p>
			{renderRating(calculateRating(counter)[1])}
		</div>
	))

	const ProductHighlights = memo(({ item }: any) => {
		if (!item?.cusDescContent1 && !item?.cusDescContent2 &&
			!item?.cusDescContent3 && !item?.description) {
			return null;
		}

		return (
			<div className="prod-content mt-4">
				<h2 className="mb-3 text-[#333] text-base">Main highlights</h2>
				{(item.cusDescContent1 || item.cusDescContent2 || item.cusDescContent3) ? (
					<div className="grid gap-4">
						{item.cusDescContent1 && (
							<div className="main-highlight-item col-span-1 flex items-start gap-2 border-b border-[#e2e2e2] pb-4">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" fill-rule="evenodd" width="20" height="24" viewBox="0 0 32 32">
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
									<svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" fill-rule="evenodd" width="24" height="24" viewBox="0 0 32 32">
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
		)
	});

	
	const ProductList = ({ amzData, NoT }: any) => {
		let counter = 0

		if (!amzData?.length) return null

		return (
			<div className="product-list">
				{amzData.slice(0, NoT).map((item: any, index: any) => (
					// <ProductItem
					// 	key={index}
					// 	item={item}
					// 	index={index}
					// 	counter={++counter}
					// />
					1
				))}
			</div>
		)
	}

	let counter = 0;

	return (
		<>
			<div className='container'>
				{renderAlert()}
				{/* html */}
				{/* <ProductList amzData={amzData} NoT={NoT} /> */}

				<ScrollTop />
				{/* {router.query.gclid != undefined && (
					<SinglePopup prod={amzData[0]} />
				)} */}
			</div>

			{/* {headings && headings?.length > 0 && (
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
			)} */}
		</>
	);
};

export default SingleContent;

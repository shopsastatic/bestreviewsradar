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

export interface SingleContentProps {
	post: GetPostSiglePageQuery['post']
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	//
	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
	//

	const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
		threshold: 0,
		root: null,
		rootMargin: '0%',
		freezeOnceVisible: false,
	})

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
		postData
	} = getPostDataFromPostFragment(post || {})

	const products = postData?.products

	//
	const [showMoreStore, setShowMoreStore] = useState(false);
	const ctRef = useRef(null) as any;
	const contentRef = useRef(null);
	const [maxHeights, setMaxHeights] = useState<number[]>([]);
	const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [formVisible, setFormVisible] = useState(true);
	const [thanksVisible, setThanksVisible] = useState(false);

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
				const [point, ...labelParts] = item.trim().split(' ');
				const label = labelParts.join(' ');
				return {
					point: parseFloat(point),
					label: label
				};
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

	return (
		<div className='container'>
			{renderAlert()}
			{/* content */}

			<div className='prod-item mt-12'>
				{products && products?.length > 0 && products?.map((item: any, index: any) => (
					<div className={`prod-child prod-item-${++index} grid grid-cols-1 md:grid-cols-10 bg-white gap-3 md:gap-7 px-4 md:px-0`} key={index}>
						{(index == 1 || index == 2) && (
							<div className='flex items-center absolute -top-[16px] -left-[7px]'>
								<div className='w-[42px] h-[32px] flex justify-center items-center prod-heading-tag relative'>
									{index == 1 && (
										<svg xmlns="http://www.w3.org/2000/svg" className='mr-2' viewBox="0 0 576 512" width="16" height="16"><path d="M226.5 168.8L287.9 42.3l61.4 126.5c4.6 9.5 13.6 16.1 24.1 17.7l137.4 20.3-99.8 98.8c-7.4 7.3-10.8 17.8-9 28.1l23.5 139.5L303 407.7c-9.4-5-20.7-5-30.2 0L150.2 473.2l23.5-139.5c1.7-10.3-1.6-20.7-9-28.1L65 206.8l137.4-20.3c10.5-1.5 19.5-8.2 24.1-17.7zM424.9 509.1c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2z" fill="#FFFFFF" /></svg>

									)}
									{index == 2 && (
										<svg xmlns="http://www.w3.org/2000/svg" className='mr-2' height="16" viewBox="0 0 512.007 512.007" width="16"><g fill="#fff"><path d="m510.025 139.609-85.333-102.4a8.547 8.547 0 0 0 -6.554-3.063h-324.267a8.524 8.524 0 0 0 -6.554 3.063l-85.333 102.4a8.512 8.512 0 0 0 -1.178 9.079 8.55 8.55 0 0 0 7.731 4.915h494.933a8.55 8.55 0 0 0 7.731-4.915 8.53 8.53 0 0 0 -1.176-9.079zm-483.268-3.072 71.108-85.333h316.271l71.108 85.333z"></path><path d="m263.898 39.402a8.535 8.535 0 0 0 -7.885-5.265h-162.133c-3.055 0-5.871 1.63-7.398 4.284s-1.519 5.905.026 8.55l59.733 102.4a8.541 8.541 0 0 0 6.272 4.164c.367.043.734.068 1.092.068a8.539 8.539 0 0 0 6.042-2.5l102.4-102.4a8.532 8.532 0 0 0 1.851-9.301zm-108.501 91.81-46.669-80.008h126.677z"></path><path d="m511.109 141.281a8.527 8.527 0 0 0 -7.646-4.753h-494.933a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267c1.613 2.116 4.122 3.362 6.784 3.362s5.171-1.246 6.767-3.362l247.467-324.267a8.54 8.54 0 0 0 .87-8.96zm-255.104 313.993-230.221-301.67h460.442z"></path><path d="m264.146 466.76-102.4-324.267a8.538 8.538 0 0 0 -8.141-5.965h-145.067a8.536 8.536 0 0 0 -7.646 4.753 8.537 8.537 0 0 0 .87 8.96l247.467 324.267a8.517 8.517 0 0 0 6.784 3.362 8.297 8.297 0 0 0 3.925-.973 8.53 8.53 0 0 0 4.208-10.137zm-238.362-313.156h121.566l85.811 271.736zm399.753-115.183a8.52 8.52 0 0 0 -7.398-4.284h-162.134a8.53 8.53 0 0 0 -6.033 14.566l102.4 102.4a8.503 8.503 0 0 0 6.033 2.5c.367 0 .734-.026 1.101-.068a8.531 8.531 0 0 0 6.272-4.164l59.733-102.4a8.55 8.55 0 0 0 .026-8.55zm-68.924 92.791-80.009-80.008h126.677z"></path><path d="m511.126 141.299a8.527 8.527 0 0 0 -7.646-4.753h-145.067a8.53 8.53 0 0 0 -8.141 5.965l-102.4 324.267a8.539 8.539 0 0 0 4.207 10.138 8.493 8.493 0 0 0 3.925.956 8.574 8.574 0 0 0 6.784-3.345l247.467-324.267a8.54 8.54 0 0 0 .871-8.961zm-232.277 284.04 85.811-271.736h121.566z"></path></g></svg>
									)}
								</div>
								<div className='bg-white heading-tag-text py-1'>
									<span className='font-semibold px-4 text-black'>{index == 1 ? "Best Choice" : "Value for Money"}</span>
								</div>
							</div>
						)}
						<div className='count-num absolute top-20 -left-[28px]'>
							<div className='hex-wrap'>
								<span className='hex-num'>{index}</span>
							</div>
						</div>
						<div className='col-span-1 md:col-span-3 p-4 pt-10 pb-0 md:pb-10 flex justify-center items-center flex-col'>
							<img className='max-w-[140px] min-[400px]:max-w-[180px]' src={item?.box?.visuals?.productImage?.node?.sourceUrl ?? "/"} alt={item?.box?.visuals?.productImage?.node?.altText} />
							<p className='mt-4 text-sm text-[#615b5b]'>{item?.box?.visuals?.brand}</p>
						</div>

						<div className='col-span-1 md:col-span-4 pt-5 pb-0 md:pb-5'>
							<h2 className='text-[#3e434a] text-base font-semibold line-clamp-2'>{item?.box?.informations?.productName}</h2>
							<p className='bg-[#f13549] w-fit text-sm text-white p-2 py-1 mt-2 rounded'>{item?.box?.informations?.discount}</p>
							<div ref={(el: any) => (contentRefs.current[index] = el)} className='overflow-hidden' style={{
								maxHeight: `${expandedItems[index] ? maxHeights[index] || 335 : 335}px`,
								transition: 'max-height 0.7s ease',
								willChange: 'max-height'
							}}>
								{parseSP(item?.box?.informations?.specifications)?.length > 0 && (
									<div className='min-h-5 my-5 rounded-lg md:rounded-2xl p-4 bg-[#ffefe5] grid grid-cols-1 gap-2'>
										{parseSP(item?.box?.informations?.specifications)?.map((itemSP: any, indexSP: any) => (
											<div className='flex items-center gap-2 col-span-1' key={"sp"+indexSP}>
												<span className='bg-white py-0.5 px-2.5 rounded text-[#3a95ee] font-medium min-w-11 flex justify-center'>{itemSP?.point?.toFixed(1)}</span>
												<span className='text-[#615b5b]'>{itemSP?.label}</span>
											</div>
										))}
									</div>
								)}

								{item?.box?.informations?.features && (
									<div>
										<h6>Why we love it</h6>
										<div className='mt-2 grid grid-cols-1 gap-1.5'>
											{transToArray(item?.box?.informations?.features)?.map((itemF: any, indexF: any) => (
												<div className='col-span-1 flex items-start gap-2' key={"F"+indexF}>
													<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className='min-w-[20px] md:min-w-[22px] mt-0 md:mt-0.5' viewBox="0 0 20 20" fill="none">
														<path d="M9.99992 1.04166C7.52633 1.04166 5.2859 2.04504 3.66542 3.66549C2.84062 4.4903 2.17569 5.47573 1.72156 6.57077C1.15266 7.73153 0.833252 9.03679 0.833252 10.4167C0.833252 15.2491 4.75076 19.1667 9.58325 19.1667C10.9631 19.1667 12.2684 18.8472 13.4292 18.2783C14.5242 17.8242 15.5096 17.1593 16.3344 16.3345C17.9549 14.714 18.9583 12.4736 18.9583 9.99999C18.9583 7.5264 17.9549 5.28597 16.3344 3.66549C14.7139 2.04504 12.4735 1.04166 9.99992 1.04166Z" fill="#d6e5f5" />
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
									{item?.box?.informations?.productDescription && (
										<>
											<h5 className='mb-2 text-[#333]'>Main highlights</h5>
											<ul>
												{transToArray(item?.box?.informations?.productDescription)?.map((itemM: any, indexM: any) => (
													<li key={"M"+indexM}>{itemM}</li>
												))}
											</ul>
										</>
									)}
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

						<div className='col-span-1 md:col-span-3 flex flex-col justify-end items-center pr-0 md:pr-5'>
							<div className='heading-poligon'>
								<h2 className='font-bold tracking-wider'>{calculateRating(index)?.point.toFixed(1)}</h2>
								<p className='font-semibold text-sm my-2'>{calculateRating(index)?.tag}</p>
								<Rating rating={calculateRating(index)?.point}></Rating>
							</div>
							<div className='w-full'>
								{item?.box?.additionals?.actions?.length > 0 && (
									<>
										<p className='text-sm text-[#6d6d6d] hidden lg:block'>View offer on:</p>

										<div className='box-action pb-3'>
											{item?.box?.additionals?.actions?.slice(0, 3)?.map((itemS: any, indexS: any) => (
												<div key={"S"+indexS} className={`grid grid-cols-2 md:grid-cols-1 gap-2 lg:grid-cols-2 items-center py-4 ${indexS !== itemS?.length ? 'border-b' : ''}`}>
													<div className='col-span-1 flex justify-start md:justify-center lg:justify-start text-center lg:text-left'>
														<RenderStore storename={itemS?.brandImage?.[0]}></RenderStore>
													</div>
													<div className='col-span-1 flex justify-end md:justify-center lg:justify-end'>
														<Link href={itemS?.actionLink ?? "/"} className='bg-[#117fec] text-white py-1.5 px-2.5 rounded-xl font-medium'>
															<button>Check Price</button>
														</Link>
													</div>
												</div>
											))}

											{item?.box?.additionals?.actions?.length > 3 && (
												<div className='more-store relative'>
													<p onClick={() => toggleStores(index)} className='flex items-center justify-center cursor-pointer select-none text-center mt-4 text-base text-[#666]'>
														More stores ({item?.box?.additionals?.actions?.length - 3})
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
														{item?.box?.additionals?.actions?.slice(3, 100)?.map((itemT: any, indexT: any) => (
															<div className='grid grid-cols-2 md:grid-cols-1 gap-2 lg:grid-cols-2 items-center py-4 border-b' key={"T"+indexT}>
																<div className='col-span-1 flex justify-start md:justify-center lg:justify-start text-center lg:text-left'>
																	<RenderStore storename={itemT?.brandImage?.[0]}></RenderStore>
																</div>
																<div className='col-span-1 flex justify-end md:justify-center lg:justify-end'>
																	<Link href={itemT?.actionLink ?? "/"} className='bg-[#117fec] text-white py-1.5 px-2.5 rounded-xl font-medium'>
																		<button>Check Price</button>
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
				))}
			</div>

			<div className="flex flex-col items-center space-y-4 w-full">
				<h3 className="font-bold text-2xl text-gray-700 text-center">Sign up and get exclusive special deals</h3>

				<div className={`w-full flex justify-center transition-all duration-1000 ${!formVisible ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}>
					<form onSubmit={handleSignUp} className="w-full flex justify-center overflow-hidden transition-all duration-1000">
						<div className="flex flex-col items-center space-x-2 w-full max-w-md">
							<input
								type="text"
								placeholder="Email Address..."
								className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-0"
								required
							/>
							<button className="bg-blue-500 text-white px-10 mt-3 font-bold py-2 rounded-full w-fit m-auto hover:bg-blue-600">
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
		</div>
	)
}

export default SingleContent

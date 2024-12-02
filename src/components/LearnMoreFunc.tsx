import { useEffect, useRef, useState } from 'react'

const LearnMore = () => {
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
}

export default LearnMore
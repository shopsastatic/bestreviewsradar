import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const SinglePopup = (prod: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hours: 11,
        minutes: 56,
        seconds: 28
    });
    const popupRef = useRef(null) as any;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const newSeconds = prev.seconds - 1;
                const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
                const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

                return {
                    hours: newHours < 0 ? 0 : newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseLeave = (event: MouseEvent) => {
            if (event.clientY <= 0) {
                setIsVisible(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div ref={popupRef} className="bg-white rounded-xl overflow-hidden max-w-[767px] w-full relative my-8">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row gap-2">
                    {/* Product section */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-4 md:p-10">
                        <Link href={prod?.prod?.url}>
                            <img
                                src={prod?.prod?.img ?? "/"}
                                alt="Product"
                                className="w-full object-contain max-h-[150px] md:max-h-[200px]"
                            />
                            <h3 className='text-sm line-clamp-2 text-center mt-3'>{prod?.prod?.title}</h3>
                            <div className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-md w-fit block mt-3 mb-4 text-center">
                                Save £5
                            </div>
                        </Link>
                    </div>

                    {/* Timer section */}
                    <div className="w-full md:w-2/3 p-6 md:p-24 bg-[#f1f6ff]">
                        <Link href={prod?.prod?.url}>
                            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-4">Today's Best Deal</h2>

                            <p className="text-sm text-gray-600 mb-2">This offer ends in:</p>

                            <div className="flex justify-between gap-4 mb-6 mt-4">
                                <div className="text-center bg-white p-2 flex-1 rounded-lg">
                                    <div className="text-xl md:text-2xl font-bold text-blue-900">{String(timeLeft.hours).padStart(2, '0')}</div>
                                    <div className="text-xs md:text-sm text-blue-900">Hours</div>
                                </div>

                                <div className="text-center bg-white p-2 flex-1 rounded-lg">
                                    <div className="text-xl md:text-2xl font-bold text-blue-900">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                    <div className="text-xs md:text-sm text-blue-900">Minutes</div>
                                </div>

                                <div className="text-center bg-white p-2 flex-1 rounded-lg">
                                    <div className="text-xl md:text-2xl font-bold text-blue-900">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                    <div className="text-xs md:text-sm text-blue-900">Seconds</div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://amazon.com', '_blank')}
                                className="w-full bg-blue-500 text-white text-base py-3 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                View Deal
                            </button>

                            <div className="flex justify-center mt-4">
                                <img
                                    src="https://oneclearwinner.co.uk/images/amazon-logo.png"
                                    alt="Amazon Logo"
                                    className="h-6 md:h-8 object-contain max-w-[50px] md:max-w-[60px]"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SinglePopup;

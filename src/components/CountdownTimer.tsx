import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const initialTime = {
        hours: 9,
        minutes: 3,
        seconds: 14
    };

    const getInitialTimeState = () => {
        const savedTime = localStorage.getItem('countdownTime');
        const savedTimestamp = localStorage.getItem('countdownTimestamp');
        
        if (savedTime && savedTimestamp) {
            const parsedTime = JSON.parse(savedTime);
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
            
            const totalSeconds = parsedTime.hours * 3600 + parsedTime.minutes * 60 + parsedTime.seconds - elapsedSeconds;
            
            if (totalSeconds <= 0) {
                return initialTime;
            }
            
            return {
                hours: Math.floor(totalSeconds / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60
            };
        }
        
        return initialTime;
    };

    const [time, setTime] = useState(getInitialTimeState);

    useEffect(() => {
        const saveTimeToStorage = () => {
            localStorage.setItem('countdownTime', JSON.stringify(time));
            localStorage.setItem('countdownTimestamp', Date.now().toString());
        };

        saveTimeToStorage();

        const timer = setInterval(() => {
            setTime(prev => {
                const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;
                
                if (totalSeconds <= 1) {
                    return initialTime;
                }
                
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return {
                        ...prev,
                        minutes: prev.minutes - 1,
                        seconds: 59
                    };
                } else if (prev.hours > 0) {
                    return {
                        hours: prev.hours - 1,
                        minutes: 59,
                        seconds: 59
                    };
                }
                
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="rounded-lg">
                <div className="flex items-start space-x-1 mt-2">
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <div className="flex space-x-1">
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {Math.floor(time.hours / 10)}
                            </div>
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {time.hours % 10}
                            </div>
                        </div>
                        <span className="text-gray-500 text-xs mt-1">Hours</span>
                    </div>

                    <span className="text-base text-gray-400">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <div className="flex space-x-1">
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {Math.floor(time.minutes / 10)}
                            </div>
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {time.minutes % 10}
                            </div>
                        </div>
                        <span className="text-gray-500 text-xs mt-1">Min</span>
                    </div>

                    <span className="text-base text-gray-400">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <div className="flex space-x-1">
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {Math.floor(time.seconds / 10)}
                            </div>
                            <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
                                {time.seconds % 10}
                            </div>
                        </div>
                        <span className="text-gray-500 text-xs mt-1">Sec</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
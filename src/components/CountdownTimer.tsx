import React, { useState, useEffect, useCallback, memo } from 'react';

interface TimeState {
    hours: number;
    minutes: number;
    seconds: number;
}

const INITIAL_TIME: TimeState = {
    hours: 9,
    minutes: 3,
    seconds: 14
};

// Component hiển thị số đếm
const TimeDigit = memo(({ value }: { value: number }) => (
    <div className="flex space-x-1">
        <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
            {value < 10 ? '0' : String(Math.floor(value / 10))}
        </div>
        <div className="bg-orange-200 rounded px-2 text-base font-mono text-red-600">
            {value < 10 ? String(value) : String(value % 10)}
        </div>
    </div>
));

TimeDigit.displayName = 'TimeDigit';

const CountdownTimer = () => {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState<TimeState>(INITIAL_TIME);

    const getInitialTimeState = useCallback((): TimeState => {
        try {
            if (typeof window === 'undefined') return INITIAL_TIME;

            const savedTime = localStorage.getItem('countdownTime');
            const savedTimestamp = localStorage.getItem('countdownTimestamp');

            if (!savedTime || !savedTimestamp) return INITIAL_TIME;

            const parsedTime = JSON.parse(savedTime) as TimeState;
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
            const totalSeconds = parsedTime.hours * 3600 + parsedTime.minutes * 60 + parsedTime.seconds - elapsedSeconds;

            if (totalSeconds <= 0) return INITIAL_TIME;

            return {
                hours: Math.floor(totalSeconds / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60
            };
        } catch (error) {
            console.error('Error loading saved time:', error);
            return INITIAL_TIME;
        }
    }, []);

    // Initialize client-side state after mount
    useEffect(() => {
        setMounted(true);
        setTime(getInitialTimeState());
    }, [getInitialTimeState]);

    const saveTimeToStorage = useCallback((currentTime: TimeState) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('countdownTime', JSON.stringify(currentTime));
                localStorage.setItem('countdownTimestamp', Date.now().toString());
            }
        } catch (error) {
            console.error('Error saving time:', error);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const updateTime = () => {
            setTime(prev => {
                const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;

                if (totalSeconds <= 1) {
                    const newTime = { ...INITIAL_TIME };
                    saveTimeToStorage(newTime);
                    return newTime;
                }

                const newTime = {
                    hours: Math.floor((totalSeconds - 1) / 3600),
                    minutes: Math.floor(((totalSeconds - 1) % 3600) / 60),
                    seconds: (totalSeconds - 1) % 60
                };

                saveTimeToStorage(newTime);
                return newTime;
            });
        };

        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [mounted, saveTimeToStorage]);

    // Return empty div for SSR
    if (!mounted) {
        return <div className="flex flex-col items-center justify-center" />;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="rounded-lg">
                <div className="flex items-start space-x-1 mt-2">
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <TimeDigit value={time.hours} />
                        <span className="text-gray-500 text-xs mt-1">Hours</span>
                    </div>

                    <span className="text-base text-gray-400">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <TimeDigit value={time.minutes} />
                        <span className="text-gray-500 text-xs mt-1">Min</span>
                    </div>

                    <span className="text-base text-gray-400">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <TimeDigit value={time.seconds} />
                        <span className="text-gray-500 text-xs mt-1">Sec</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
import { useState, useEffect } from 'react';

export const ThirdPartyScripts = () => {
    const [mainContentLoaded, setMainContentLoaded] = useState(false);

    useEffect(() => {
        // Đợi main content load xong
        if (document.readyState === 'complete') {
            setMainContentLoaded(true);
        } else {
            window.addEventListener('load', () => {
                // Thêm delay nhỏ sau khi main content đã load
                setTimeout(() => {
                    setMainContentLoaded(true);
                }, 500);
            });
        }
    }, []);

    if (!mainContentLoaded) return null;

    return (
        <>
            {/* Google Analytics với strategy lazyOnload */}
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                    onLoad={() => {
                        window.dataLayer = window.dataLayer || [];
                        // Định nghĩa function gtag
                        window.gtag = function (...args: any[]) {
                            window.dataLayer!.push(arguments);
                        };
                        // Sử dụng gtag
                        window.gtag('js', new Date());
                        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
                    }}
                />
            )}

            {/* Google Tag Manager */}
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <script
                    async
                    src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                    onLoad={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js'
                        });
                    }}
                />
            )}
        </>
    );
};
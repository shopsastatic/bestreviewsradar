import Script from 'next/script';
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
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `
                        }}
                    />
                </>
            )}
        </>
    );
};
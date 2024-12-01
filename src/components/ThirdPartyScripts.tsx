import Script from 'next/script';
import { useState, useEffect } from 'react';

export const ThirdPartyScripts = () => {
    const [mainContentLoaded, setMainContentLoaded] = useState(false);

    useEffect(() => {
        const loadScripts = () => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    setMainContentLoaded(true);
                });
            } else {
                setTimeout(() => {
                    setMainContentLoaded(true);
                }, 5000);
            }
        };

        if (document.readyState === 'complete') {
            loadScripts();
        } else {
            window.addEventListener('load', loadScripts);
        }

        return () => window.removeEventListener('load', loadScripts);
    }, []);

    if (!mainContentLoaded) return null;

    return (
        <>
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                        async
                        defer
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                                send_page_view: false  // Disable automatic page views
                            });
                        `
                        }}
                    />
                </>
            )}
        </>
    );
};
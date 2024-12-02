import Script from 'next/script';
import { useState, useEffect } from 'react';

export const ThirdPartyScripts = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        performance.mark('third-party-scripts-start');

        const loadScripts = () => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(
                            () => {
                                setIsReady(true);
                                performance.mark('third-party-scripts-end');
                                performance.measure(
                                    'third-party-scripts-loading',
                                    'third-party-scripts-start',
                                    'third-party-scripts-end'
                                );
                            },
                            { timeout: 5000 } // Fallback timeout
                        );
                    } else {
                        setTimeout(() => {
                            setIsReady(true);
                        }, 5000);
                    }
                    observer.disconnect();
                }
            });

            const footer = document.querySelector('footer');
            if (footer) {
                observer.observe(footer);
            } else {
                setTimeout(() => setIsReady(true), 5000);
            }
        };

        if (document.readyState === 'complete') {
            loadScripts();
        } else {
            window.addEventListener('load', loadScripts);
            return () => window.removeEventListener('load', loadScripts);
        }
    }, []);

    if (!isReady) return null;

    return (
        <>
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <>
                    <Script
                        id="gtm-script"
                        strategy="worker"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                    />
                    <Script
                        id="gtm-config"
                        strategy="worker"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){
                                    dataLayer.push(arguments);
                                }
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                                    send_page_view: false,
                                    transport_type: 'beacon',
                                    transport_url: '/collect'
                                });
                            `
                        }}
                    />
                </>
            )}
        </>
    );
};

export const nextConfig = {
    experimental: {
        optimizePackageImports: ['@next/third-parties'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Connection',
                        value: 'keep-alive'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
        ];
    }
};
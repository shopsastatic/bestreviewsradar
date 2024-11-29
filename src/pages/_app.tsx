import "../../faust.config";
import React, { useState, useEffect } from "react";
import { Inter, Noto_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import dynamic from 'next/dynamic';
import { GoogleAnalytics } from '@next/third-parties/google'

// Styles
import "@/styles/globals.css";
import "@/styles/index.scss";

// Types
import type { AppProps } from "next/app";

// Providers & Config
import { WordPressBlocksProvider, fromThemeJson } from "@faustwp/blocks";
import blocks from "@/wp-blocks";
import themeJson from "../../theme.json";

// Font configurations
const inter = Inter({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--inter-font",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

const noto_san = Noto_Sans({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--noto-font",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

// Dynamic imports with ssr: false to avoid hydration issues
const SiteWrapperProvider = dynamic(() => import("@/container/SiteWrapperProvider"), {
  ssr: true
});

const Toaster = dynamic(() => import("react-hot-toast").then(mod => mod.Toaster), {
  ssr: false
});

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false
});

// WordPress blocks configuration
const wpBlocksConfig = {
  blocks,
  theme: fromThemeJson(themeJson),
};

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const faustConfig = {
    preload: false,
    caching: true,
    ttl: 3600
  };

  const DeferredAnalytics = () => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 100);

      return () => clearTimeout(timer);
    }, []);

    if (!shouldLoad) return null;

    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    ) : null;
  };

  return (
    <FaustProvider pageProps={{
      ...pageProps,
      config: faustConfig
    }}>
      <SiteWrapperProvider {...pageProps}>
        <style jsx global>{`
            :root {
              --inter-font: ${inter.style.fontFamily};
              --noto-font: ${noto_san.style.fontFamily};
            }
            html {
              font-family: var(--inter-font);
            }
            html, body, .large-width, .prod-child {
              font-family: var(--inter-font);
            }
            .heading-tag-text {
              font-family: var(--noto-font);
            }
          `}</style>

        <main className={`${inter.variable} ${noto_san.variable}`}>
          <Component {...pageProps} key={router.asPath} />


          {/* Wrap client-side only components */}
          <ClientOnly>
            <NextNProgress color="#818cf8" />
            <Toaster
              position="bottom-left"
              toastOptions={{
                style: {
                  fontSize: "14px",
                  borderRadius: "0.75rem",
                },
              }}
              containerClassName="text-sm"
            />
            <DeferredAnalytics />
          </ClientOnly>
        </main>
      </SiteWrapperProvider>
    </FaustProvider>
  );
}
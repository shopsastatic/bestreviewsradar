import "../../faust.config";
import React, { useCallback, useEffect } from "react";
import { Inter, Noto_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import dynamic from 'next/dynamic';

// Styles
import "@/styles/globals.css";
import "@/styles/index.scss";

// Types
import type { AppProps } from "next/app";

// Providers & Config
import { WordPressBlocksProvider, fromThemeJson } from "@faustwp/blocks";
import blocks from "@/wp-blocks";
import themeJson from "../../theme.json";

// Dynamic imports
const SiteWrapperProvider = dynamic(() => import("@/container/SiteWrapperProvider"));
const Toaster = dynamic(() => import("react-hot-toast").then(mod => mod.Toaster));
const NextNProgress = dynamic(() => import("nextjs-progressbar"));
const GoogleAnalytics = dynamic(() => 
  import("nextjs-google-analytics").then(mod => mod.GoogleAnalytics)
);

// Font configurations
const inter = Inter({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--inter-font",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI'],
});

const noto_san = Noto_Sans({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--noto-font",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI'],
});

// WordPress blocks configuration
const wpBlocksConfig = {
  blocks,
  theme: fromThemeJson(themeJson),
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Preload critical components
  const preloadComponents = useCallback(() => {
    import("@/container/SiteWrapperProvider");
    import("react-hot-toast");
    import("nextjs-progressbar");
  }, []);

  useEffect(() => {
    preloadComponents();
  }, [preloadComponents]);

  return (
    <>
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

      <GoogleAnalytics trackPageViews />
      <FaustProvider pageProps={pageProps}>
        <WordPressBlocksProvider config={wpBlocksConfig}>
          <SiteWrapperProvider {...pageProps}>
            <main className={`${inter.variable} ${noto_san.variable}`}>
              <NextNProgress color="#818cf8" />
              <Component {...pageProps} key={router.asPath} />
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
            </main>
          </SiteWrapperProvider>
        </WordPressBlocksProvider>
      </FaustProvider>
    </>
  );
}
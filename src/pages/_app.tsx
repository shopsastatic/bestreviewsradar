import "../../faust.config";
import React from "react";
import { Inter, Noto_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@/styles/globals.css";
import "@/styles/index.scss";
import { AppProps } from "next/app";
import { WordPressBlocksProvider, fromThemeJson } from "@faustwp/blocks";
import blocks from "@/wp-blocks";
import SiteWrapperProvider from "@/container/SiteWrapperProvider";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import themeJson from "../../theme.json";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const inter = Inter({
  weight: ["400", "600", "700", "800"],
  preload: true,
  subsets: ["latin"],
  variable: "--inter-font",
});

export const noto_san = Noto_Sans({
  weight: ["400", "600", "700", "800"],
  preload: true,
  subsets: ["latin"],
  variable: "--noto-font",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <FaustProvider pageProps={pageProps}>
        <WordPressBlocksProvider
          config={{
            blocks,
            theme: fromThemeJson(themeJson),
          }}
        >
          <SiteWrapperProvider {...pageProps}>
          <style jsx global>{`
              html, body, .large-width, .prod-child {
                font-family: ${inter.style.fontFamily};
              }
              .heading-tag-text {
                font-family: ${noto_san.style.fontFamily};
              }
            `}</style>

            {/* Apply the font classes to the main wrapper */}
            <main>
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

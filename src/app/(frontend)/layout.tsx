import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Montserrat } from 'next/font/google'
import React from 'react'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Banner } from '@/Banner/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const metaPixelID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(inter.variable, montserrat.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="google-site-verification" content="BVcKwadrBDHmmI-t-qSFfYfsL581BgenCw_NqSa09QM" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-970922599"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-970922599');
            gtag('config', 'G-6GVGKSGY2F');
            gtag('config', 'G-BWZ3SGKXF2');
            gtag('config', 'G-XLYRJVCV31');
          `}
        </Script>
        {metaPixelID ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </head>
      <body>
        {metaPixelID ? (
          <noscript>
            <img
              height="1"
              src={`https://www.facebook.com/tr?id=${metaPixelID}&ev=PageView&noscript=1`}
              style={{ display: 'none' }}
              width="1"
            />
          </noscript>
        ) : null}
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Banner />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

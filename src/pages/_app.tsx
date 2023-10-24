import type { AppProps } from "next/app";
import viVN from "antd/lib/locale/vi_VN";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import "@/styles/global.css";
import { ConfigProvider } from "antd";
export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <ConfigProvider locale={viVN}>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#476055" />
        <meta name="title" content="VCare" />
        <meta name="description" content="VCare" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logo-vcare.png"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no"
        />
        <title>VCare</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ConfigProvider>
  );
}

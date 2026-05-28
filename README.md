import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "一念入江湖",
  description: "笨狐狸的個人詩詞集",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        {/* 引入金梅繁簡轉換插件 */}
        <Script
          src="https://cdn.jsdelivr.net/gh/subal/translate@master/tw_cn.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        {/* 在網頁加載完成後，強制將全站所有文本校對並轉化為繁體 */}
        <Script id="force-traditional-script" strategy="afterInteractive">
          {`
            (function() {
              function convertToTraditional() {
                if (typeof defaultJSConvert === 'function') {
                  // 1 代表繁體模式
                  defaultJSConvert(1); 
                }
              }
              // 立刻執行一次
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', convertToTraditional);
              } else {
                convertToTraditional();
              }
              // 針對 Next.js 異步加載數據（如詩詞標題）的動態監聽
              const observer = new MutationObserver(function(mutations) {
                if (typeof defaultJSConvert === 'function') {
                  defaultJSConvert(1);
                }
              });
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}

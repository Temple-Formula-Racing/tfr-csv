import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "@/styles/globals.css";
import styles from "@/styles/homepage.module.css";
import { CSVStoreProvider } from "@/providers/csv-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSV Viewer | Temple Formula Racing",
  description: "Because somehow TFR doesn't speak a common programming language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <CSVStoreProvider>
          <AppRouterCacheProvider>
            <main className={styles.main}>
              <div className={styles.description}>
                <div>
                  <a
                    href="https://sites.temple.edu/templeformularacing/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/cropped-TFR-black-300x139.png"
                      alt="TFR Logo"
                      className={styles.tfrLogo}
                      width={100}
                      height={46}
                      priority
                    />
                  </a>
                </div>
              </div>

              {children}
              
            </main>

          </AppRouterCacheProvider>
        </CSVStoreProvider>
      </body>
    </html>
  );
}

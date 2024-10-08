// src/app/layout.js
import { AuthProvider } from "./Providers";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

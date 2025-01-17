import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "../context/Context";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Toastd",
  description: "Get Toasted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}

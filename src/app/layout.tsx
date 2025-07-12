import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/lib/react-query";
import ErrorBoundary from "@/components/ErrorBoundary";

// Disable caching for the entire website
export const dynamic = "force-dynamic";
export const revalidate = 0;

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Riverflow - Modern Q&A Platform | StackOverflow Clone",
  description:
    "Riverflow is a modern Q&A platform inspired by StackOverflow. Ask questions, share knowledge, and collaborate with developers worldwide.",
  keywords: [
    "Q&A",
    "StackOverflow Clone",
    "Next.js",
    "Appwrite",
    "TypeScript",
    "Tailwind CSS",
    "Developer Community",
    "Ask Questions",
    "Programming Help",
    "Open Source",
  ],
  openGraph: {
    title: "Riverflow - Modern Q&A Platform",
    description:
      "A StackOverflow-inspired Q&A platform for developers. Built with Next.js and Appwrite.",
    url: "https://riverflows.vercel.app",
    siteName: "Riverflow",
    images: [
      {
        url: "/public/riverflow-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Riverflow Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riverflow - Modern Q&A Platform",
    description:
      "A StackOverflow-inspired Q&A platform for developers. Built with Next.js and Appwrite.",
    images: ["/public/riverflow-screenshot.png"],
  },
  metadataBase: new URL("https://riverflows.vercel.app"),
  alternates: {
    canonical: "https://riverflows.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <QueryProvider>
          <ErrorBoundary>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#1e1e1e",
                  color: "#fff",
                },
              }}
            />
          </ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
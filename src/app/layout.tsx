import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import KeyboardShortcutsModal from "@/components/KeyboardShortcutsModal";
import SearchModal from "@/components/SearchModal";
import Glossary from "@/components/Glossary";
import AchievementBadge from "@/components/AchievementBadge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quantum Learning Platform | NEP 2020 Aligned Interactive Course",
  description: "An interactive, visually rich quantum computing course aligned with NEP 2020. Learn qubits, superposition, gates, entanglement, circuits, and algorithms.",
  keywords: ["Quantum Computing", "Education", "NEP 2020", "Interactive Learning", "Qubits", "Physics Simulator", "React Three Fiber"],
  openGraph: {
    title: "Quantum Learning Platform",
    description: "Learn Quantum Computing from zero physics background interactively.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:font-bold">
          Skip to main content
        </a>
        <ErrorBoundary>
          <ToastProvider>
            {children}
            <KeyboardShortcutsModal />
            <SearchModal />
            <Glossary />
            <AchievementBadge />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

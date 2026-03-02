import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}

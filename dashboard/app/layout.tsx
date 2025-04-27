import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSI Hackathon Hub",
  description: "Hackathon management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4 bg-white">
            <div className="mb-3 w-full flex items-center flex-row justify-between">
              <Image src={"https://i.ibb.co/XxpsvQLP/Black-White-Blue-Neon-Intro.png"} alt="csi"  height={100} width={200} className="w-20 h-full"/>
              {/* <h2 className="text-lg font-medium mb-6">Hackathon Hub</h2> */}
            </div>
            <nav className="space-y-0 border-t">
              <Link href="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fff2cc] transition-colors duration-200 group">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-white group-hover:bg-[#ffbd00] group-hover:text-black transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                </div>
                <span className="font-medium">Overview</span>
              </Link>
              
              <Link href="/actions" className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fff2cc] transition-colors duration-200 group">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-white group-hover:bg-[#ffbd00] group-hover:text-black transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="font-medium">Actions</span>
              </Link>
              
              <Link href="/participants" className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fff2cc] transition-colors duration-200 group">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-white group-hover:bg-[#ffbd00] group-hover:text-black transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="font-medium">Participants</span>
              </Link>
              
              <Link href="/feedback" className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fff2cc] transition-colors duration-200 group">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-white group-hover:bg-[#ffbd00] group-hover:text-black transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="font-medium">Feedback</span>
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

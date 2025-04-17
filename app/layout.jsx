import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "HireLyft - Job Portal",
  description:
    "Connect job seekers and employers with our modern job portal platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

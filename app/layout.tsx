import { Beiruti } from "next/font/google";
import "./globals.css";

const beiruti = Beiruti({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-beiruti",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className={beiruti.variable}>{children}</body>
    </html>
  );
}

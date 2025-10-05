import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tonik Carting Leaderboard",
  description: "Track karting lap times and leaderboards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

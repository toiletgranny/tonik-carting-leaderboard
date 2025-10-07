import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { NavigationProvider } from "@/components/NavigationContext";

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
      <body>
        <NavigationProvider>
          {children}
          <Navigation />
        </NavigationProvider>
      </body>
    </html>
  );
}

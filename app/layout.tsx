import "./globals.css";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "@/components/NavBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Swapss",
  description: "An online bartering mediator for autonomous organisations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen overflow-hidden ${poppins.className}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { CssBaseline, Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Book Collection",
  description: "Manage and explore a collection of books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Toaster position="top-center" />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}

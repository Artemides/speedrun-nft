import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/components/app-provider";
import { getMetadata } from "@/utils/scaffold-eth/getMetadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = getMetadata({
  title: "edm.eth",
  description: "smart contract developer portfolio",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

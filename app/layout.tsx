import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "learning app",
  description: "A learning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white flex",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar */}
          <Sidebar />
          {/* Main Page */}
          <div className="p-8 w-full bg-background text-foreground">
            <div className="flex justify-between items-center mb-4">
              <a href="/">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight xl:text-4xl dark:text-white">
                  QuizBot 🤖
                </h1>
              </a>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
              </div>
            </div>
            <Separator />
            <div className="mt-4 p-4">
              <Toaster position="top-center" richColors/>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

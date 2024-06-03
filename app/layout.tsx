import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/AuthProvider";
import UserButton from "@/components/UserButton";
import QueryProvider from "@/contexts/QueryProvider";
import { Bot } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizBot",
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
        className={cn("min-h-screen w-full bg-white flex", inter.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <AuthProvider>
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
                  <div className="flex items-center justify-center gap-4">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
                      QuizBot
                    </h1>
                    <Bot size={48} />
                  </div>
                </a>
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <ThemeToggle />
                </div>
              </div>
              <Separator />
              <Toaster position="top-center" richColors />
              <QueryProvider>
                <div className="mt-2 p-4">{children}</div>
              </QueryProvider>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

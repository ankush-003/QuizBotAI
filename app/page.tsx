import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <main className="text-center mt-12 w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to QuizBot 
       
      </h1>
      <Bot size={50} />
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        A learning app that gamifies the learning experience.
      </p>
      <Link href="/signin" className="mt-6">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}

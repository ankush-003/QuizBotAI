"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Chapter {
    _id: string;
    index: number;
    title: string;
    content: string;
}

export default function Page({ params }: { params: { id: string } }) {
    const { data: session, update } = useSession();
    const {
        data: Module,
        isPending: isPending,
        isSuccess: isSuccess,
      } = useQuery({
        queryKey: ["currentModule", params.id],
        queryFn: async () => {
          const response = await fetch(`/api/modules/${params.id}`);
          const data = await response.json();
          return data;
        },
      });
      console.log(Module);
    //   console.log(session);
    const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);

    useEffect(() => {
        if (Module) {
            setCurrentChapter((prevChapter: Chapter | null) => (Module.chapters as Chapter[])[currentChapterIndex]);
        }
    }, [Module, currentChapterIndex]);

  return (
    <div>
        {isPending ? (
            <div className="font-semibold">Loading...</div>
        ) : (
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl">{Module.topic}</CardTitle>
                    <CardDescription>
                        <div className="font-semibold text-2xl">
                        <h1>{currentChapter?.title}</h1>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>{currentChapter?.content}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="flex gap-2 items-center justify-around">
                    <Button onClick={() => setCurrentChapterIndex((prevIndex) => {
                        if (prevIndex === 0) {
                            return prevIndex;
                        }
                        return prevIndex - 1;
                    })}>Previous</Button>
                    <Button className="hover:bg-green-500">
                        Mark as Completed
                    </Button>
                    <Button onClick={() => setCurrentChapterIndex((prevIndex) => {
                        if (prevIndex === Module.chapters.length - 1) {
                            return prevIndex;
                        }
                        if(prevIndex >= 0) {
                            toast.success("Hooraay! You've completed a chapter!");
                        }
                        return prevIndex + 1;
                    })}>Next</Button>
                    </div>
                    <div className="text-gray-500 font-semibold">
                        {currentChapterIndex + 1} / {Module.chapters.length}
                    </div>
                </CardFooter>
            </Card>
        )}
    </div>
  );
}

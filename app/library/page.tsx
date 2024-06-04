"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createModule from "@/actions/createModule";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Page() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    data: allModules,
    isPending: isAllPending,
    isSuccess: allSuccess,
  } = useQuery({
    queryKey: ["allModules"],
    queryFn: async () => {
      const response = await fetch(`/api/modules`);
      const data = await response.json();
      return data;
    },
  });

  const {
    data: myModules,
    isPending: ismyPending,
    isSuccess: mySuccess,
  } = useQuery({
    queryKey: ["myModules"],
    queryFn: async () => {
      const response = await fetch(`/api/modules?userId=${session?.user._id}`);
      const data = await response.json();
      return data;
    },
  });
  if (allSuccess && mySuccess) {
    toast.success("Modules loaded successfully");
  }
  console.log(myModules);
  console.log(allModules);
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Genrate a Learning Module!
          </CardTitle>
          <CardDescription className="text-lg">
            {/* quote related to reading */}
            Welcome to the library! What would you like to learn today?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center mt-6 p-4 mx-auto">
          <form
            action={async (formData: FormData) => {
              const topic = formData.get("topic") as string;

              if (!topic) {
                toast.error("Please enter a topic");
                return;
              }
              const toast_id = toast.info("Creating a learning module...");
              const module_id: any = await createModule(topic);

              if ("error" in module_id) {
                // toast.error("Failed to create module", { id: toast_id });
                return;
              }
              // toast.success("Module created successfully", { id: toast_id });
              router.push(`/library/${module_id.id}`);
            }}
          >
            <div className="flex w-full w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter a topic"
                name="topic"
                required
              />
              <Button type="submit">Generate</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        <Tabs defaultValue="myModules" className="w-full">
          <TabsList>
            <TabsTrigger value="allModules">All Modules</TabsTrigger>
            <TabsTrigger value="myModules">My Modules</TabsTrigger>
          </TabsList>
          <TabsContent value="allModules">
            {isAllPending ? (
              <div>Loading...</div>
            ) : (
              <div className="grid lg:grid-cols-3  gap-4 w-full">
                {(allModules as any[])?.map((module: any) => (
                  <div
                    key={module._id}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center flex items-center gap-3 justify-around"
                  >
                    <h3 className="text-4xl font-bold mb-2 text-center">
                      {module.topic}
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{module.topic}</DialogTitle>
                          <DialogDescription>
                            Read by {module.readBy.length} people
                          </DialogDescription>
                        </DialogHeader>
                        <div className="p-2 flex flex-col gap-4">
                          <h3 className="font-bold">Chapters</h3>
                          <ol className="grid gap-2">
                            {module.chapters.map((chapter: any) => (
                              <li key={chapter.index}>
                                <Label>{chapter.title}</Label>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <DialogFooter>
                          <Link href={`/library/${module._id}`}>
                            <Button>Go to Module</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="myModules">
            {ismyPending ? (
              <div>Loading...</div>
            ) : (
              <div className="grid lg:grid-cols-3  gap-4">
                {(myModules as any[])?.map((history: any) => (
                  <div
                    key={history.module._id}
                    className={cn(
                      "rounded-lg p-4 text-center flex flex-col items-center gap-3",
                      history.completed
                        ? "bg-green-300 dark:bg-green-600"
                        : "bg-gray-100 dark:bg-gray-700"
                    )}
                  >
                    <div className="flex items-center justify-around gap-3 text-center w-full">
                      <h3 className="text-4xl font-bold mb-2">
                        {history.module.topic}
                      </h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{history.module.topic}</DialogTitle>
                            <DialogDescription>
                              Read by {history.module.readBy.length} people
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-2 flex flex-col gap-4">
                            <h3 className="font-bold">Chapters</h3>
                            <ol className="grid gap-2">
                              {history.module.chapters.map((chapter: any) => (
                                <li key={chapter.index}>
                                  <Label>{chapter.title}</Label>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <DialogFooter>
                            <Link href={`/library/${history.module._id}`}>
                              <Button>Go to Module</Button>
                            </Link>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Progress
                      value={
                        history.completed
                          ? 100
                          : Number(
                              (history.numChaptersRead /
                                history.module.chapters.length) *
                                100
                            )
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

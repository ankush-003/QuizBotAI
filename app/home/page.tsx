"use client";
import { useState } from "react";
// import { auth } from '@/auth'
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface UserParams {
  numQuizes: number;
  numWins: number;
  numPractices: number;
}

export default function Home() {
  const { data: session, update } = useSession();
  // console.log(session);
  const userParams: UserParams = {
    numQuizes: session?.user?.numQuizes as number,
    numWins: session?.user?.numWins as number,
    numPractices: session?.user?.numPractices as number,
  };
  const [Params, setParams] = useState<UserParams>(userParams);
  const { data: allAchievements, isPending } = useQuery({
    queryKey: ["allAchievements"],
    queryFn: async () => {
      const response = await fetch(`/api/achievements`);
      const data = await response.json();
      return data;
    },
  });
  const { data: myAchievements, isPending: isPendingMyAchievements } = useQuery(
    {
      queryKey: ["myAchievements"],
      queryFn: async () => {
        const response = await fetch(
          `/api/achievements?userId=${session?.user?._id}`
        );
        const data = await response.json();
        console.log(data);
        return data;
      },
    }
  );

  // console.log(allAchievements);
  // console.log(myAchievements);

  const checkThreshold = (threshold: any, params: UserParams) => {
    if (threshold.numQuizes) {
      return (params.numQuizes / threshold.numQuizes) * 100;
    } else if (threshold.numWins) {
      return (params.numWins / threshold.numWins) * 100;
    } else if (threshold.numPractices) {
      return (params.numPractices / threshold.numPractices) * 100;
    } else {
      return 0;
    }
  };

  return (
    <div className="w-full mx-auto">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                <h3 className="text-4xl font-bold mb-2">{Params.numQuizes}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Quizzes Completed
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                <h3 className="text-4xl font-bold mb-2">{Params.numWins}</h3>
                <p className="text-gray-500 dark:text-gray-400">Quizzes Won</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                <h3 className="text-4xl font-bold mb-2">
                  {Params.numPractices}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Practice Quizzes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="allAchievements" className="w-full">
          <TabsList>
            <TabsTrigger value="allAchievements">All Achievements</TabsTrigger>
            <TabsTrigger value="myAchievements">My Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="allAchievements">
            {isPending ? (
              <div>Loading...</div>
            ) : (
              <div className="grid lg:grid-cols-3  gap-4">
                {(allAchievements as any[])?.map((achievement: any) => (
                  <div
                    key={achievement._id}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center flex flex-col items-center gap-3"
                  >
                    <h3 className="text-4xl font-bold mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 h-[30px]">
                      {achievement.description}
                    </p>
                    <Progress
                      value={
                        // check if achievement.threshold has numQuizs, numWins, or numPractices key
                        // if it does, then check if the value is greater than or equal to the threshold
                        checkThreshold(achievement.threshold, Params)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="myAchievements">
            {isPendingMyAchievements ? (
              <div>Loading...</div>
            ) : (
              <div className="grid lg:grid-cols-3  gap-4">
                {(myAchievements as any[])?.map((achievement: any) => (
                  <div
                    key={achievement.achievement._id}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center flex flex-col items-center gap-3"
                  >
                    <h3 className="text-4xl font-bold mb-2">
                      {achievement.achievement.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 h-[30px]">
                      {achievement.achievement.description}
                    </p>
                    <Button>{achievement.receivedAt}</Button>
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

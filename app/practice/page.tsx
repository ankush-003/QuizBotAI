"use client";
import { Button } from "@/components/ui/button";
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

function Practice() {
  const { data: session, update } = useSession();
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Play a Practice Quiz!
          </CardTitle>
          <CardDescription className="text-lg">
            Practice makes perfect! What are you waiting for? Start practicing
            now!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center mt-6 p-4 mx-auto">
          <form
            action={async (formData: FormData) => {
              const topic = formData.get("topic") as string;
              console.log(`selected topic: ${topic}`);
              const data = await fetch("/api/quiz/practice", {
                method: "POST",
                body: JSON.stringify({ topic }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const questions = await data.json();
              
            }}
          >
            <div className="flex w-full w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter a topic"
                name="topic"
                required
              />
              <Button type="submit">Play</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Practice;

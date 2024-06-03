import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSession } from "next-auth/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@/auth";

export default async function Profile() {
  const session = await auth();
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{`Hello! ${session?.user?.username}`}</CardTitle>
          <CardDescription>
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input disabled id="name" value={session?.user?.username} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input disabled id="email" value={session?.user?.email} />
              </div>
              <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="numQuizes">Number of Quizzes</Label>
                <Input disabled id="numQuizes" value={session?.user?.numQuizes} />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="numQuizes">Number of Wins</Label>
                <Input disabled id="numQuizes" value={session?.user?.numWins} />
                </div><div className="flex flex-col space-y-1.5">
                <Label htmlFor="numQuizes">Number of Practice Quizzes</Label>
                <Input disabled id="numQuizes" value={session?.user?.numPractices} />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

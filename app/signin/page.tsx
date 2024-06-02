import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"


export default function page() {
  const handleSignIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if(!email || !password) 
      throw new Error("Please fill in all fields")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
      });
      redirect("/home")
    } catch (error: any) {
      const err = error as CredentialsSignin
      return err.message
    }
  }
  return (
    <form action={handleSignIn} className="flex justify-center items-center mt-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Don &apos; t have an account?{" "}
            <Link href="/signup" className="underline" prefetch={false}>
                Sign up 
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="me@example.com" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div> */}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
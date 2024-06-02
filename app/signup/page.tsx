import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/userModel"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"


export default function page() {
  const signup = async (formData: FormData) => {
    "use server"

    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if(!username || !email || !password) 
      // return new Error("Please fill in all fields")
      redirect("/signup")

    await dbConnect()
    const user = await User.findOne({ email })
    if (user) {
      // return new Error("User already exists")
      redirect("/signup")
    }

    const hashedPassword = await hash(password, 10)
    const newUser = User.create({
      username,
      email,
      password: hashedPassword
    })

    redirect("/signin")
  }
  return (
    <form action={signup} className="flex justify-center items-center mt-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link href="/signin" className="underline" prefetch={false}>
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" name="username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
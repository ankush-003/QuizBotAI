"use server";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from 'next/navigation';

const credentialsLogin = async (email: string, password: string) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: "/home",
    });
    redirect("/home");
    return res;
  } catch (error: any) {
    const err = error as CredentialsSignin;
    return "Invalid email or password"
  }
};


export default credentialsLogin;
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function page() {
  const session = await auth();
  if (session) {
    redirect("/home");
  }
  return (
    <>
    <LoginForm />
    </>
  );
}

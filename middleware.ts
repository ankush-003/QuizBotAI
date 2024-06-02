import { NextResponse, NextRequest } from "next/server";
// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { request } from "http";
import { auth } from "@/auth";
// export { auth as middleware } from "@/auth"
export async function middleware(req: NextRequest) {
    const session = await auth();
    const url = req.nextUrl;
    
    if (session && (
        url.toString().startsWith("/sign-in") ||
        url.toString().startsWith("/sign-up") ||
        url.toString().startsWith("/")
    )) {
        console.log("redirecting to /home");
        return NextResponse.redirect("/home");
    }
    if (!session) 
        return NextResponse.redirect(new URL("/signin", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/sign-in',
        // '/sign-up',
        '/home',
        '/quiz',
        '/profile',
        '/history',
    ]
}
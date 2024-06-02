// import { NextResponse, NextRequest } from "next/server";
// export { default } from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";
export { auth as middleware } from "@/auth"
// export async function middleware(req: NextRequest) {
//     const token = await getToken({ req });
//     const url = req.nextUrl;
//     console.log(token);
//     if (token && (
//         url.toString().startsWith("/sign-in") ||
//         url.toString().startsWith("/sign-up") ||
//         url.toString().startsWith("/")
//     )) {
//         console.log("redirecting to /home");
//         return NextResponse.redirect("/home");
//     }
//     if (!token) 
//         return NextResponse.redirect(new URL("/sign-in", req.url));

//     return NextResponse.next();
// }

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
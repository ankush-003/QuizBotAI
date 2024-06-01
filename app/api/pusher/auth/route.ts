import { getPusherInstance } from "@/lib/pusher/server";
import { NextRequest, NextResponse } from "next/server";

const pusherServer = getPusherInstance();

export async function POST(req: NextRequest) {
  console.log("authenticating pusher perms...");
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  // logic to check user permissions

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);

  return NextResponse.json(authResponse);
}

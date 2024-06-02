import NextAuth, { CredentialsSignin } from "next-auth"
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/userModel";
import { compare } from "bcryptjs";
// import clientPromise from "@/lib/db";
import dbConnect from "@/lib/dbConnect";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        try {
          await dbConnect();
          const user: any = await User.findOne({
            $or: [{ email: email }],
          });
          if (!user) {
            throw new Error("No user found");
          }
          const isPasswordCorrect = await compare(password, user.password);
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          } else {
            console.table(user);
            return user;
          }
        } catch (error: any) {
          throw new CredentialsSignin(`Failed to sign in: ${error.message}`);
          // return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt callback");
        if (user) {
            token._id = user._id?.toString()
            token.history = user?.history
            token.numQuizes = user?.numQuizes
            token.numGames = user?.numGames
            token.achievements = user?.achievements
            token.username = user?.username
        }
        return token
    },
    async session({ session, token }) {
        console.log("session callback");
        if (token) {
            session.user._id = token._id as string | undefined
            session.user.history = token.history as string | undefined
            session.user.numQuizes = token.numQuizes as number | undefined
            session.user.numGames = token.numGames as number | undefined
            session.user.achievements = token.achievements as any | undefined
            session.user.username = token.username as string | undefined
        }

        return session
    }
  },

  pages: {
    // signIn: "/signin",
    // signOut: "/signout",
    // error: "/error",
    // newUser: "/new-user",
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "dark",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
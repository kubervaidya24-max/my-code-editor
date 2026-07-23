import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/generated/db";


export const {auth, handlers, signIn, signOut} = NextAuth({
  callbacks:{
//user creation and account linking logic
    async signIn({user, account, profile}) {
      // PrismaAdapter handles user creation and account linking automatically
      return true;
    },

    async jwt({token, user, account}) {
      if(!token.sub) return token;

      const existingUser = await db.user.findUnique({ where: { id: token.sub } });
      if(!existingUser) return token;

      const existingAccount = await db.account.findFirst({ where: { userId: token.sub } });

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
    
      return token;
    },

    async session({session, token}) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.sub && session.user) {
        session.user.role = token.role;
      }

      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  ...authConfig
});
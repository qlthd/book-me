import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

// const MAX_AGE = 1 * 24 * 60 * 60;
const MAX_AGE = 10;
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  jwt: {
    maxAge: MAX_AGE,
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error("Token is required for encoding");
      }

      const { sub, ...tokenProps } = token;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expirationTimestamp = nowInSeconds + MAX_AGE;

      const jwtToken = jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: "HS256",
        },
      );
      return jwtToken;
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error("Token is undefined");
      }
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decodedToken as JWT;
      } catch (error) {
        console.error("JWT decode error", error);
        return null;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };

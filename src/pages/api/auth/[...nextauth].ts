import { AuthFetch } from "@/model/sanityFetchTypings";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { groq } from "next-sanity";
import { sanityClient } from "../../../../sanity";
import { postToSanity } from "@/utils/postToSanity";
import { comparePasswords, hashPassword } from "@/utils/authUtils/hashUtil";

const LOGIN_CREDENTIAL_NAME = "credentials";

/**
 * Handles login with credentials and sign up with providers
 * For configuring session and jwt, go to https://github.com/nextauthjs/next-auth/discussions/536
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: LOGIN_CREDENTIAL_NAME,
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Check if user exists
        const query = groq`
          *[_type == 'auth' && username == "" || email == "${email}"]
        `;
        const auths: AuthFetch[] = await sanityClient.fetch(query);
        if (
          auths.length > 0 &&
          (await comparePasswords(password, auths[0].password))
        ) {
          const user = auths[0];
          return {
            id: user._id,
            name: user.name,
            email: email,
          };
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      // When log in with credentials
      if (account?.provider === LOGIN_CREDENTIAL_NAME && user) {
        return true;
      }

      // From this point on, we are logging in with a provider
      if (!profile?.email || !account?.provider) {
        throw new Error("No profile found...");
      }

      // Check if user exists
      const query = groq`
        *[_type == 'auth' && username == "${profile.name}" || email == "${profile.email}"]
      `;
      const auths: AuthFetch[] = await sanityClient.fetch(query);
      if (auths.length > 0) {
        return true;
      }

      // Create user if it does not exist
      const hashedPassword = await hashPassword(account.provider);
      const mutations = [
        {
          create: {
            _type: "auth",
            name: profile.name,
            username: profile.name,
            email: profile.email,
            password: hashedPassword,
            category: [],
          },
        },
      ];
      await postToSanity(mutations)
        .then((response) => response.json())
        .then((data) => {
          console.log("Create user data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export default handler;
export { handler as GET, handler as POST };

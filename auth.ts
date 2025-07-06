import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const{handlers,auth,signIn,signOut}= 
NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }: {
      user: { name?: string | null; email?: string | null; image?: string | null };
      profile: { id: string; login: string; bio?: string | null };
    }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: { [key: string]: any };
      account?: any;
      profile?: { id?: string };
    }) {
      if (account && profile?.id) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

        token.id = user?._id;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: { [key: string]: any };
      token: { [key: string]: any };
    }) {
      session.id = token.id;
      return session;
    },
  },
});


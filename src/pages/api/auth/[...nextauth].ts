// import { UserSignUpParams, UserSignUpResponse } from '@/share/d/apis/user';
import NextAuth, { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import TwitterProvider from "next-auth/providers/twitter";
import { JWT } from "next-auth/jwt";
// import { userSignUp } from '@/shared/apis/user';

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      TwitterProvider({
        clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID || "",
        clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET || "",
        version: "2.0",
      }),
    ],
    callbacks: {
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token.sub) {
          session.accessToken = token.sub;
        }

        return session;
      },
      signIn: async ({ profile, account }) => {
        if (profile && account && account.access_token) {
          // const params: UserSignUpParams = {
          //   id: profile?.data.id,
          //   username: profile?.data.username,
          //   profile_image_url: profile?.data.profile_image_url,
          // };
          // const res = await userSignUp(params);

          // const { data }: { data: UserSignUpResponse } = res;

          // return res.status === 200 || res.status === 201 ? true : false;
          return true;
        }
        return false;
      },
    },
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
  });

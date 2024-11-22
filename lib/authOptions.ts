import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "./mongodb";
import  bcrypt  from 'bcryptjs'
import User from "@/models/user";



export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials){
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email})
                    if(!user){
                        throw new Error('user does not exist')
                    }
                    
                    const isPasswordValid = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    );

                    if(!isPasswordValid){
                        throw new Error("")
                    }

                    return user;
                } catch  {
                    return null
                }
            }

        })
      ],
      callbacks: {
        async signIn({account, profile }){
            if(account?.provider === 'github'){
                await connectToDatabase();
                const existingUser = User.findOne({email: profile?.email})

                if(!existingUser){
                    await User.create({
                        name: profile?.name,
                        email: profile?.email
                    })
                }
            }
            return true;
        },

        async jwt( { token, user }){
            if(user){
                token.id  = user.id;
                token.email  = user.email
            }

            return token
        },
        async session( { session, token } ){
            if(token){
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                }
                
            }
            return session
          }
      },
      pages: {
        signIn: '/sign-in'
      },
      secret: process.env.NEXTAUTH_SECRET
      
     
}
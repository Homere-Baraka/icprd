import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    image: user.image,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.image = user.image;
                token.role = user.role;
                token.username = user.name;
            }

            if (trigger === 'update' && session?.user) {
                return { ...token, ...session.user };
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.image = token.image as string;
                session.user.name = token.name as string;
                session.user.first_name = token.first_name as string;
                session.user.last_name = token.last_name as string;
            }
            return session;
        },

        async signIn({ user, account, profile }) {
            return true;
        },
    },
};

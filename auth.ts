import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/types';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM ventanita.users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export const { auth, signIn, signOut } = NextAuth({
...authConfig,
providers: [
  Credentials({
      async authorize(credentials) {
        console.log("ENTRANDO")
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);
 
          console.log("PUNTO MEDIO")

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          console.log("USER FOUND!")

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;

        } else {
          console.log("FALLO EN PARSED CREDENTIALS")
        }
 
        return null;
      },
    }),
  ],
});
// src/app/api/auth/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '../../../../lib/mysql'; 
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {

                // Extract phone and password from credentials
                const { phone, password } = credentials;

                try {
                    // เชื่อมต่อกับฐานข้อมูล MySQL และค้นหาผู้ใช้ตามเบอร์โทรศัพท์
                    const [rows] = await pool.query('SELECT * FROM login WHERE phone = ?', [phone]);
                    const user = rows[0];

                    if (!user) {
                        return null;
                    }

                    // Check if the password matches
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    console.log(user);
                    return user;

                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }

            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                return {
                    ...token,
                    id: user.id, // ใช้ id จาก MySQL ซึ่งเป็นค่าจำนวนเต็ม
                    role: user.role // ถ้ามี role อยู่ในข้อมูล user
                };
            }

            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            };
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

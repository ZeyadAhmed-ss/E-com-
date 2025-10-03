"use server"
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export default async function getMyToken() {
    try {
        const cookieStore = await cookies();
        const decodedToken = 
        cookieStore.get("next-auth.session-token")?.value ||
        cookieStore.get("_Secure-next-auth.session-token")?.value;
        
        if (!decodedToken) {
            return null;
        }
        
        const token = await decode({
            token: decodedToken,
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        return token;
    } catch (err) {
        return null;
    }
}
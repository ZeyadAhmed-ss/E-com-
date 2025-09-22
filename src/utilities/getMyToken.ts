// utilities/getMyToken.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../app/interface/Token.interface";

export default async function getMyToken(): Promise<UserToken | null> {
  try {
    const tokenValue =
      (await cookies()).get("next-auth.session-token")?.value ||
      (await cookies()).get("_Secure-next-auth.session-token")?.value;

    if (!tokenValue) return null;

    const decoded = jwtDecode(tokenValue) as { id: string; name?: string; email?: string; role?: string };
    if (!decoded || !decoded.id) return null;

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      token: tokenValue,
    };
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

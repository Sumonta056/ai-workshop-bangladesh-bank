import { cookies } from "next/headers";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session?.value) return null;
  try {
    return JSON.parse(session.value) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

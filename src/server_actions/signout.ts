"use server";
import { lucia } from "@/lib/auth";
import { sleep } from "@/lib/utils";
import { checkAuth } from "@/utils/server_utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  await sleep(3000);
  const { session } = await checkAuth();
  if (session) {
    await lucia.invalidateSession(session.id);
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}

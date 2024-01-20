import { httpClient } from "../lib/axios";

interface SignInBody {
  email: string;
}

export async function signIn(body: SignInBody) {
  await httpClient.post("/authenticate", body);
}

export async function signOut() {
  await httpClient.post("/sign-out");
}

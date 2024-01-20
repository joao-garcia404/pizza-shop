import { httpClient } from "../lib/axios";

interface SignInBody {
  email: string;
}

export async function signIn(body: SignInBody) {
  await httpClient.post("/authenticate", body);
}

interface RegisterRestaurantBody {
  email: string;
  restaurantName: string;
  managerName: string;
  phone: string;
}

export async function registerRestaurant(body: RegisterRestaurantBody) {
  await httpClient.post("/restaurants", body);
}

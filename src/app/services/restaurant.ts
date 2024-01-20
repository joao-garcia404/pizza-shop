import { httpClient } from "../lib/axios";

interface RegisterRestaurantBody {
  email: string;
  restaurantName: string;
  managerName: string;
  phone: string;
}

export async function registerRestaurant(body: RegisterRestaurantBody) {
  await httpClient.post("/restaurants", body);
}

export interface GetManagedRestaurantRes {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export async function getManagedRestaurant() {
  const response = await httpClient.get<GetManagedRestaurantRes>(
    "/managed-restaurant",
  );

  return response.data;
}

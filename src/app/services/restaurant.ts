import { httpClient } from "../lib/axios";

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

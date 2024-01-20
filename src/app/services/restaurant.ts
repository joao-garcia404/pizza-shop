import { httpClient } from "../lib/axios";

interface GetManagedRestaurant {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export async function getManagedRestaurant() {
  const response = await httpClient.get<GetManagedRestaurant>('/managed-restaurant');

  return response.data;
}

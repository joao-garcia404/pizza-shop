import { httpClient } from "../lib/axios";

export interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'manager' | 'customer'
  createdAt: Date
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await httpClient.get<GetProfileResponse>('/me');

  return response.data;
}

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


interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export async function updateProfile(body: UpdateProfileBody) {
  await httpClient.put('/profile', body);
}


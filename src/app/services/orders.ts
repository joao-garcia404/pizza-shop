import { httpClient } from "../lib/axios";

interface GetOrdersRes {
  orders: Array<{
    orderId: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
    createdAt: string;
  }>;
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  }
}

export async function getOrders() {
  const response = await httpClient.get<GetOrdersRes>('/orders', {
    params: {
      pageIndex: 0,
    }
  });

  return response.data;
}

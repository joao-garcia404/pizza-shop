import { httpClient } from "../lib/axios";

interface GetOrdersQuery {
  pageIndex?: number | null;

}

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

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await httpClient.get<GetOrdersRes>('/orders', {
    params: {
      pageIndex
    }
  });

  return response.data;
}

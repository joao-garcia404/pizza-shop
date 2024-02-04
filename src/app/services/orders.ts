import { httpClient } from "../lib/axios";

export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  status?: string | null;
  customerName?: string | null;
}

export interface GetOrdersRes {
  orders: Array<{
    orderId: string;
    status: OrderStatus;
    customerName: string;
    total: number;
    createdAt: string;
  }>;
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await httpClient.get<GetOrdersRes>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });

  return response.data;
}

interface GetOrderDetailsParams {
  orderId: string;
}

interface GetOrderDetailsRes {
  id: string;
  status: OrderStatus;
  totalInCents: number;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: Array<{
    id: string;
    name: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }>;
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await httpClient.get<GetOrderDetailsRes>(
    `/orders/${orderId}`,
  );

  return response.data;
}

interface CancelOrderParams {
  orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  const response = await httpClient.patch<null>(`/orders/${orderId}/cancel`);

  return response.data;
}

interface ApproveOrderParams {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  const response = await httpClient.patch<null>(`/orders/${orderId}/approve`);

  return response.data;
}

interface DeliverOrderParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  const response = await httpClient.patch<null>(`/orders/${orderId}/deliver`);

  return response.data;
}

interface DispatchOrderParams {
  orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderParams) {
  const response = await httpClient.patch<null>(`/orders/${orderId}/dispatch`);

  return response.data;
}

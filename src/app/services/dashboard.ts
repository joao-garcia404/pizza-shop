import { httpClient } from "../lib/axios";

interface GetDaysOrdersAmountRes {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await httpClient.get<GetDaysOrdersAmountRes>(
    "/metrics/day-orders-amount",
  );

  return response.data;
}

interface GetMonthRevenueRes {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await httpClient.get<GetMonthRevenueRes>(
    "/metrics/month-receipt",
  );

  return response.data;
}

interface GetMonthOrdersAmountRes {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await httpClient.get<GetMonthOrdersAmountRes>(
    "/metrics/month-orders-amount",
  );

  return response.data;
}

interface GetMonthCanceledOrdersAmountRes {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await httpClient.get<GetMonthCanceledOrdersAmountRes>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}

type GetPopularProductsRes = Array<{
  product: string;
  amount: number;
}>;

export async function getPopularProducts() {
  const response = await httpClient.get<GetPopularProductsRes>(
    "/metrics/popular-products",
  );

  return response.data;
}

type GetDailyRevenueInPeriodRes = Array<{
  date: string;
  receiptw: number;
}>

export async function getDailyRevenueInPeriod() {
  const response = await httpClient.get<GetDailyRevenueInPeriodRes>(
    "/metrics/daily-receipt-in-period",
  );

  return response.data;
}

import {
  DowngradeSubscriptionApiResponse,
  GetCurrentSubscriptionApiResponse,
  GetSubscriptionsListApiResponse,
  UpgradeSubscriptionApiResponse,
} from "@/types";
import { api } from "./client";

export const fetchAllSubscriptions =
  async (): Promise<GetSubscriptionsListApiResponse> => {
    const res = await api.get("/subscriptions");
    return res.data;
  };

export const fetchCurrentSubscription =
  async (): Promise<GetCurrentSubscriptionApiResponse> => {
    const res = await api.get("/subscriptions/current");
    return res.data;
  };

export const upgradeSubscription = async (
  code: string
): Promise<UpgradeSubscriptionApiResponse> => {
  const res = await api.post("/subscriptions/upgrade", { code });
  return res.data;
};

export const downgradeSubscription = async (
  code: string
): Promise<DowngradeSubscriptionApiResponse> => {
  const res = await api.post("/subscriptions/downgrade", { code });
  return res.data;
};

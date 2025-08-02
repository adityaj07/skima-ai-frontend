export interface SubscriptionDataType {
  price: number | string;
  code: string;
  tag: string;
  currency: string;
}

export type ApiFailureType = {
  status: "failure";
  error: string;
};

export type GetSubscriptionsListApiResponse =
  | {
      status: "success";
      data: SubscriptionDataType[];
    }
  | ApiFailureType;

export type GetCurrentSubscriptionApiResponse =
  | {
      status: "success";
      data: SubscriptionDataType;
    }
  | ApiFailureType;

export type UpgradeSubscriptionApiResponse =
  | {
      status: "success";
      subscription: SubscriptionDataType;
      message: string;
    }
  | ApiFailureType;

export type DowngradeSubscriptionApiResponse =
  | {
      status: "success";
      subscription: SubscriptionDataType;
      message: string;
    }
  | ApiFailureType;

export type LoadingType = {
  fetch: boolean;
  upgrade: boolean;
  downgrade: boolean;
};

export type ErrorType = {
  fetch: string;
  upgrade: string;
  downgrade: string;
};

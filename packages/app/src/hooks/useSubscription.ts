import {
  downgradeSubscription,
  fetchAllSubscriptions,
  fetchCurrentSubscription,
  upgradeSubscription,
} from "@/api/subscription";
import { SubscriptionDataType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useSubscriptions = () => {
  const [plans, setPlans] = useState<SubscriptionDataType[]>([]);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionDataType | null>(
    null
  );
  const [loading, setLoading] = useState({
    fetch: false,
    upgrade: false,
    downgrade: false,
  });
  const [error, setError] = useState({
    fetch: "",
    upgrade: "",
    downgrade: "",
  });

  // function to fetch all subscriptions and current sub
  const fetchAllSubs = async () => {
    // init the loading and error state
    setLoading((l) => ({
      ...l,
      fetch: true,
    }));
    setError((e) => ({
      ...e,
      fetch: "",
    }));

    try {
      // fetch here
      const [subs, current] = await Promise.all([
        fetchAllSubscriptions(),
        fetchCurrentSubscription(),
      ]);

      // handlling success and error
      if (subs.status === "success") {
        setPlans(subs.data);
      } else {
        throw new Error(subs.error);
      }

      if (current.status === "success") {
        setCurrentPlan(current.data);
      } else {
        throw new Error(current.error);
      }
    } catch (error) {
      const errMessage =
        "Failed to refresh subscription data. Please try again.";

      setError((e) => ({
        ...e,
        fetch: errMessage,
      }));
    } finally {
      setLoading((l) => ({ ...l, fetch: false }));
    }
  };

  // func to upgrade the sub
  const upgradeSub = async (code: string) => {
    if (loading.upgrade) return; // early return

    // init the loading and error state
    setLoading((l) => ({
      ...l,
      upgrade: true,
    }));
    setError((e) => ({
      ...e,
      upgrade: "",
    }));

    try {
      const res = await upgradeSubscription(code);

      if (res.status === "success") {
        // we update the current plan immediately to show an immediate update to the user
        const prevPlan = currentPlan;
        setCurrentPlan(res.subscription);

        toast.success("Plan upgraded successfully!");

        // then we try to refresh the data silently
        try {
          await refreshDataSilently();
        } catch (error) {
          setCurrentPlan(prevPlan); // silent rollback if the sync fails
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Upgrade failed";

      setError((e) => ({ ...e, upgrade: errorMessage }));
      toast.error("Failed to upgrade plan");
    } finally {
      setLoading((l) => ({ ...l, upgrade: false }));
    }
  };

  // func to downgrade the sub
  const downgradeSub = async (code: string) => {
    if (loading.downgrade) return; // early return

    // init the loading and error state
    setLoading((l) => ({
      ...l,
      downgrade: true,
    }));
    setError((e) => ({
      ...e,
      downgrade: "",
    }));

    try {
      const res = await downgradeSubscription(code);

      if (res.status === "success") {
        // we update the UI optimistically
        const prevPlan = currentPlan;
        setCurrentPlan(res.subscription);

        toast.success("Plan downgraded successfully!");

        // then we try to refresh the data silently
        try {
          await refreshDataSilently();
        } catch (error) {
          setCurrentPlan(prevPlan); // silent rollback if the sync fails
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Downgrade failed";

      setError((e) => ({ ...e, downgrade: errorMessage }));
      toast.error("Failed to downgrade plan");
    } finally {
      setLoading((l) => ({ ...l, downgrade: false }));
    }
  };

  // function to refresh silently
  const refreshDataSilently = async () => {
    const [subs, current] = await Promise.all([
      fetchAllSubscriptions(),
      fetchCurrentSubscription(),
    ]);

    if (subs.status === "success") {
      setPlans(subs.data);
    }
    if (current.status === "success") {
      setCurrentPlan(current.data);
    }
  };

  useEffect(() => {
    fetchAllSubs();
  }, []);

  return {
    plans,
    currentPlan,
    loading,
    error,
    upgradeSub,
    downgradeSub,
    refetch: fetchAllSubs,
  };
};

import { cn } from "@/lib/utils";
import { LoadingType, SubscriptionDataType } from "@/types";
import { getPlanData } from "@/utils/getPlanData";
import { motion } from "framer-motion";
import { FC } from "react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface PlanCardProps {
  plan: SubscriptionDataType;
  currentPlan: SubscriptionDataType | null;
  onUpgradeSub: () => void;
  onDowngradeSub: () => void;
  loading: LoadingType;
}

const PlanCard: FC<PlanCardProps> = ({
  plan,
  currentPlan,
  loading,
  onUpgradeSub,
  onDowngradeSub,
}) => {
  const { isCurrent, sameTier, canUpgrade, canDowngrade } = getPlanData(
    currentPlan?.code,
    plan.code
  );

  return (
    <motion.div
      className={cn(
        "relative border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300",
        isCurrent
          ? "border-primary-400 bg-white/95 shadow-lg shadow-primary-500/25"
          : "border-gray-600/50 bg-white/90 hover:border-primary-400/70 hover:bg-white/95 hover:shadow-lg hover:shadow-primary-500/10",
        !isCurrent && "ring-2 ring-primary-400/40"
      )}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <CardHeader className="pb-4">
        <CardTitle
          className={cn(
            "text-xl font-instrument font-semibold",
            isCurrent ? "text-gray-900" : "text-gray-800"
          )}
        >
          {plan.tag}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="mb-4">
          <span
            className={cn(
              "text-3xl font-instrument font-bold",
              isCurrent ? "text-primary-600" : "text-gray-900"
            )}
          >
            {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
          </span>
          {typeof plan.price === "number" && (
            <span className="text-gray-600 text-sm font-instrument ml-1">
              /{plan.currency === "USD" ? "month" : plan.currency}
            </span>
          )}
        </div>

        {isCurrent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-full py-2 px-4 bg-primary-500 text-white font-instrument font-semibold rounded-xl shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Current Plan
          </motion.div>
        )}
      </CardContent>

      {!isCurrent && (
        <CardFooter className="flex gap-3 pt-0">
          {/* We show a upgrade button only if user can upgrade to this plan */}
          {canUpgrade && (
            <motion.button
              onClick={onUpgradeSub}
              disabled={loading.upgrade}
              className={cn(
                canDowngrade ? "flex-1" : "w-full",
                "py-3 px-4 rounded-xl font-instrument font-semibold transition-all duration-200",
                "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
                "text-white shadow-lg shadow-primary-500/25",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transform hover:scale-105 active:scale-95"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Upgrade"
              )}
            </motion.button>
          )}

          {/* We show the downgrade button only if user can downgrade to this plan */}
          {canDowngrade && (
            <motion.button
              onClick={onDowngradeSub}
              disabled={loading.downgrade}
              className={cn(
                canUpgrade ? "flex-1" : "w-full",
                "py-3 px-4 rounded-xl font-instrument font-semibold transition-all duration-200",
                "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Downgrade
            </motion.button>
          )}

          {/* We will show a message if neither upgrade nor downgrade is possible */}
          {!canUpgrade && !canDowngrade && !isCurrent && (
            <div className="w-full py-3 px-4 text-center text-gray-500 font-instrument">
              {sameTier ? "Current Plan" : "Not Available"}
            </div>
          )}
        </CardFooter>
      )}
    </motion.div>
  );
};

export default PlanCard;

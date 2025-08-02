import { cn } from "@/lib/utils";
import { SubscriptionDataType } from "@/types";
import { motion } from "framer-motion";
import { FC } from "react";
import { CardContent } from "../ui/card";

interface PlanCardContentProps {
  isCurrent: boolean;
  plan: SubscriptionDataType;
}

const PlanCardContent: FC<PlanCardContentProps> = ({ isCurrent, plan }) => {
  return (
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
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
  );
};

export default PlanCardContent;

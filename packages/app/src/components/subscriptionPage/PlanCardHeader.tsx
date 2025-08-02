import { cn } from "@/lib/utils";
import { SubscriptionDataType } from "@/types";
import { FC } from "react";
import { CardHeader, CardTitle } from "../ui/card";

interface PlanCardHeaderProps {
  isCurrent: boolean;
  plan: SubscriptionDataType;
}

const PlanCardHeader: FC<PlanCardHeaderProps> = ({ isCurrent, plan }) => {
  return (
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
  );
};

export default PlanCardHeader;

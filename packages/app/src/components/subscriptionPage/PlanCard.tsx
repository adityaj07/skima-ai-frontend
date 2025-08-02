import { cn } from "@/lib/utils";
import { LoadingType, SubscriptionDataType } from "@/types";
import { getPlanData } from "@/utils/getPlanData";
import { motion } from "framer-motion";
import { FC } from "react";
import PlanCardActions from "./PlanCardActions";
import PlanCardContent from "./PlanCardContent";
import PlanCardHeader from "./PlanCardHeader";

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
          ? "border-primary-400 bg-white/95 shadow-lg shadow-primary-500/25 ring-2 ring-primary-400/40"
          : "border-gray-600/50 bg-white/90 hover:border-primary-400/70 hover:bg-white/95 hover:shadow-lg hover:shadow-primary-500/10"
      )}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <PlanCardHeader isCurrent={isCurrent} plan={plan} />

      <PlanCardContent isCurrent={isCurrent} plan={plan} />

      <PlanCardActions
        loading={loading}
        isCurrent={isCurrent}
        sameTier={sameTier}
        canUpgrade={canUpgrade}
        canDowngrade={canDowngrade}
        onUpgradeSub={onUpgradeSub}
        onDowngradeSub={onDowngradeSub}
      />
    </motion.div>
  );
};

export default PlanCard;

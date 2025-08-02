import { containerVariants, itemVariants } from "@/page/SubscriptionPage";
import { LoadingType, SubscriptionDataType } from "@/types";
import { motion } from "framer-motion";
import { FC } from "react";
import PlanCard from "./PlanCard";

interface PlanCardsSectionProps {
  plans: SubscriptionDataType[];
  currentPlan: SubscriptionDataType | null;
  upgradeSub: (code: string) => void;
  downgradeSub: (code: string) => void;
  loading: LoadingType;
}

const PlanCardsSection: FC<PlanCardsSectionProps> = ({
  plans,
  currentPlan,
  upgradeSub,
  downgradeSub,
  loading,
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.code}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <PlanCard
            plan={plan}
            currentPlan={currentPlan}
            onUpgradeSub={() => upgradeSub(plan.code)}
            onDowngradeSub={() => downgradeSub(plan.code)}
            loading={loading}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlanCardsSection;

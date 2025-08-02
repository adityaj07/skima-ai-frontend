import { ErrorBanner } from "@/components/subscriptionPage/ErrorBanner";
import Header from "@/components/subscriptionPage/Header";
import PlanCardsSection from "@/components/subscriptionPage/PlanCardsSection";
import { useSubscriptions } from "@/hooks/useSubscription";
import { motion, Variants } from "framer-motion";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SubscriptionPage = () => {
  const {
    plans,
    currentPlan,
    loading,
    error,
    upgradeSub,
    downgradeSub,
    refetch,
  } = useSubscriptions();

  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      {error.fetch && (
        <motion.div variants={itemVariants}>
          <ErrorBanner message={error.fetch} onRetry={refetch} />
        </motion.div>
      )}

      <PlanCardsSection
        loading={loading}
        currentPlan={currentPlan}
        plans={plans}
        upgradeSub={upgradeSub}
        downgradeSub={downgradeSub}
      />
    </motion.div>
  );
};

export default SubscriptionPage;

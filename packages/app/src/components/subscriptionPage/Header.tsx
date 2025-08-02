import { itemVariants } from "@/page/SubscriptionPage";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div variants={itemVariants} className="text-center mb-12">
      <motion.h1
        className="text-5xl md:text-6xl font-instrument font-bold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-white via-primary-200 to-primary-300 bg-clip-text text-transparent">
          Subscription
        </span>{" "}
        <span className="text-white">Management</span>
      </motion.h1>
      <motion.p
        className="text-xl text-gray-200 font-instrument max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Manage you subscriptions flawlessly.
      </motion.p>
    </motion.div>
  );
};

export default Header;

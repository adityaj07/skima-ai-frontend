//utility containing the logic about whether the plan can be upgraded or downgraded along with current and sameTier booleans

import { PLAN_TIERS } from "@/constants/subscription";

export const getPlanData = (
  currentCode: string | undefined,
  targetCode: string
) => {
  const currentIndex = currentCode ? PLAN_TIERS.indexOf(currentCode) : -1;
  const targetIndex = PLAN_TIERS.indexOf(targetCode);

  return {
    isCurrent: currentCode === targetCode,
    canUpgrade: currentIndex < targetIndex,
    canDowngrade: currentIndex > targetIndex,
    sameTier: currentIndex === targetIndex,
  };
};

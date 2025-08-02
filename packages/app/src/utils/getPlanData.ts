//utility containing the logic about whether the plan can be upgraded or downgraded along with current and sameTier booleans

export const getPlanData = (
  currentCode: string | undefined,
  targetCode: string
) => {
  const tiers = ["Free", "T1", "T2", "Enterprise"];
  const currentIndex = currentCode ? tiers.indexOf(currentCode) : -1;
  const targetIndex = tiers.indexOf(targetCode);

  return {
    isCurrent: currentCode === targetCode,
    canUpgrade: currentIndex < targetIndex,
    canDowngrade: currentIndex > targetIndex,
    sameTier: currentIndex === targetIndex,
  };
};

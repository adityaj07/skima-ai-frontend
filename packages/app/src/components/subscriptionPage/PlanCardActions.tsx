import { LoadingType } from "@/types";
import { FC } from "react";
import { CardFooter } from "../ui/card";
import PlanCardButton from "./PlanCardButton";

interface PlanCardActionsProps {
  isCurrent: boolean;
  canUpgrade: boolean;
  canDowngrade: boolean;
  sameTier: boolean;
  loading: LoadingType;
  onUpgradeSub: () => void;
  onDowngradeSub: () => void;
}

const PlanCardActions: FC<PlanCardActionsProps> = ({
  isCurrent,
  canUpgrade,
  canDowngrade,
  sameTier,
  loading,
  onUpgradeSub,
  onDowngradeSub,
}) => {
  return (
    <>
      {!isCurrent && (
        <CardFooter className="flex gap-3 pt-0">
          {/* We show a upgrade button only if user can upgrade to this plan */}
          {canUpgrade && (
            <PlanCardButton
              label="Upgrade"
              variant="upgrade"
              loading={loading.upgrade}
              onClick={onUpgradeSub}
            />
          )}

          {/* We show the downgrade button only if user can downgrade to this plan */}
          {canDowngrade && (
            <PlanCardButton
              label="Downgrade"
              variant="downgrade"
              loading={loading.downgrade}
              onClick={onDowngradeSub}
            />
          )}

          {/* We will show a message if neither upgrade nor downgrade is possible */}
          {!canUpgrade && !canDowngrade && (
            <div className="w-full py-3 px-4 text-center text-gray-500 font-instrument">
              {sameTier ? "Current Plan" : "Not Available"}
            </div>
          )}
        </CardFooter>
      )}
    </>
  );
};

export default PlanCardActions;

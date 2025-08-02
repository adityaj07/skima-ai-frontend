import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper";

import BackgroundWrapper from "./components/ui/backgroundWrapper";
import { Toaster } from "./components/ui/sonner";
import SubscriptionPage from "./page/subscriptionPage";

export default function App() {
  return (
    <BackgroundWrapper>
      <MaxWidthWrapper>
        <SubscriptionPage />
      </MaxWidthWrapper>
      <Toaster />
    </BackgroundWrapper>
  );
}

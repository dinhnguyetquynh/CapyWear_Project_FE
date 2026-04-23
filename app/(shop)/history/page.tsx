import { Suspense } from "react";
import HistoryOrderContainer from "./history-container";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryOrderContainer/>
    </Suspense>
  );
}
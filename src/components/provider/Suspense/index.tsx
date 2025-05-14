import type { FC, SuspenseProps } from "react";
import { Suspense as ReactSuspense } from "react";

export const Suspense: FC<SuspenseProps> = ({
  children,
  fallback = "Loading...",
}) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};

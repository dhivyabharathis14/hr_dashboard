import type { FC, ReactNode } from "react";
import React from "react";
import { AppFallback } from "../../components/provider/ErrorBoundary/AppFallBack/AppFallBack";
import { ErrorBoundary } from "../../components/provider/ErrorBoundary";

import { Suspense } from "../../components/provider/Suspense";
import { ReactRouterProvider } from "../../shared/providers/ReactRouterProvider";

type Props = {
  children: ReactNode;
};

const contextProviders: React.ElementType[] = [ReactRouterProvider];

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <Suspense>
        {contextProviders.reduceRight(
          (memo, ContextProvider) => (
            <ContextProvider>{memo}</ContextProvider>
          ),
          children
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

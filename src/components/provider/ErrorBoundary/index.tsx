import type { FC, ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { AppFallback } from "./AppFallBack/AppFallBack";

type ErrorFallbackProps = {
  error: Error | null;
  resetErrorBoundary: () => void;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  onReset?: () => void;
  FallbackComponent?: FC<ErrorFallbackProps>;
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  onReset,
  FallbackComponent,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent || AppFallback}
      onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
};

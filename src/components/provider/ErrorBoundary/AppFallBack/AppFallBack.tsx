import type { FC } from "react";

type ErrorFallbackProps = {
  error?: Error | null;
  resetErrorBoundary: () => void;
};

/**
 * Application Fallback component.
 *
 * @param {Error} error - Error thrown anywhere in the app.
 */
export const AppFallback: FC<ErrorFallbackProps> = ({ error }) => {
  console.error("An error occurred: " + (error?.message || ""));

  const onReload = () => {
    window.location.assign(window.location.origin + "/dashboard/");
  };

  return (
    <div
      role="alert"
      className="flex h-screen max-w-screen-lg -translate-x-10 -translate-y-20 items-center justify-center gap-10">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">Uh oh!</h1>
        <p>
          Something went wrong, We’ll get the error fixed. <br />
          You may also reload the page or try again later.
        </p>
        <p>For help contact </p>
        <button
          onClick={onReload}
          className="mt-5 rounded-md bg-primary px-3 py-1 text-sm font-medium text-white">
          Reload page
        </button>
      </div>
    </div>
  );
};

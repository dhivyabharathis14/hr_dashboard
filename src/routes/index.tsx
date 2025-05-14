import { Suspense } from "../components/provider/Suspense";
import { Loader } from "../shared/Loader";

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      }>
      Route
    </Suspense>
  );
};

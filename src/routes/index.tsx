import { privateRoutes } from "../routes/private";
import { Suspense } from "../components/provider/Suspense";
import { Loader } from "../shared/Loader";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
  const element = useRoutes([...privateRoutes]);
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      }>
      {element}
    </Suspense>
  );
};

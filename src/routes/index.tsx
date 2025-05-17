import { privateRoutes } from "../routes/private";
import { Suspense } from "../components/provider/Suspense";
// import { Loader } from "../shared/Loader";
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "../routes/public";
import { useAuth } from "../shared/providers/auth";

export const AppRoutes = () => {
  const { userRole } = useAuth();
  const routes = userRole ? privateRoutes : publicRoutes;
  const element = useRoutes([...routes]);
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }>
      {element}
    </Suspense>
  );
};

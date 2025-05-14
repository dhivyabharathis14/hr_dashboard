import { Link } from "../../lib/router/Link";
import { ROUTES } from "../../constants/routes";
import { useTranslation } from "react-i18next";
/**
 * @package
 */
export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div
      role="alert"
      className="flex h-screen max-w-screen-lg flex-col items-center justify-center gap-10 px-5 text-center sm:-translate-x-10 sm:-translate-y-20 sm:flex-row sm:text-left">
      <div>
        <h1 className="py-5 text-4xl font-bold">404</h1>
        <p>Page Not Found</p>
        <p>{t("We couldn't find the page you were looking for")}</p>
        <Link to={ROUTES.BASE_URL}>
          <button className="mt-5 rounded-md bg-primary px-3 py-1 text-sm font-medium text-white">
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
};

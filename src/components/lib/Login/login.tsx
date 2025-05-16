import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../components/constants/routes";
import { useAuth } from "../../../shared/providers/auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!role) return;

    setIsLoading(true);

    setTimeout(() => {
      login(role === "admin" ? "admin" : "employee");

      // Navigate based on role
      if (role === "admin") {
        navigate(ROUTES.BASE_URL);
      } else if (role === "employee" && employeeId.trim()) {
        navigate(`${ROUTES.EMPLOYEES}${employeeId.trim()}`);
      }

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 text-white p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md shadow-xl border border-purple-300/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-purple-200">Sign in to continue</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Login as:</h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                role === "admin"
                  ? "bg-purple-500 border-2 border-white shadow-lg scale-105"
                  : "bg-purple-700/60 hover:bg-purple-600/70"
              }`}
              onClick={() => setRole("admin")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="font-medium">Admin</span>
            </button>

            <button
              className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                role === "employee"
                  ? "bg-purple-500 border-2 border-white shadow-lg scale-105"
                  : "bg-purple-700/60 hover:bg-purple-600/70"
              }`}
              onClick={() => setRole("employee")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">Employee</span>
            </button>
          </div>
        </div>

        {/* Show employee ID input if role is employee */}
        {role === "employee" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full bg-purple-800/30 border border-purple-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300"
              />
            </div>
            <button
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                !employeeId.trim() || isLoading
                  ? "bg-purple-400/50 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-400 active:bg-purple-600"
              }`}
              onClick={handleLogin}
              disabled={!employeeId.trim() || isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login as Employee"
              )}
            </button>
          </div>
        )}

        {/* Admin can confirm login directly */}
        {role === "admin" && (
          <button
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              isLoading
                ? "bg-purple-400/50 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-400 active:bg-purple-600"
            }`}
            onClick={handleLogin}
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </div>
            ) : (
              "Continue as Admin"
            )}
          </button>
        )}

        {/* Security note */}
        <div className="mt-8 text-center text-purple-300 text-sm">
          <p>This is a secure, role-based authentication system.</p>
          <p>Your session will be protected.</p>
        </div>
      </div>

      {/* Company branding */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold">Company Portal</h2>
        <p className="text-purple-300 text-sm">Employee Management System</p>
      </div>
    </div>
  );
};

export default Login;

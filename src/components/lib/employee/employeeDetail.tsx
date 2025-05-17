import { useSelector } from "react-redux";
import {
  Legend,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { RootState } from "~/store";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
// import GoalSuggestion from "../../../components/lib/SuggestionBot.tsx/suggestion";

const EmployeeDetail = () => {
  const { id } = useParams();
  const employeeId = parseInt(id || "", 10);
  const employee = useSelector((state: RootState) =>
    state.employee.employees.find((e) => e.id === employeeId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [designation, setDesignation] = useState(employee?.designation || "");
  const [reportingManager, setReportingManager] = useState(
    employee?.reportingManager || ""
  );
  const [functionalManager, setFunctionalManager] = useState(
    employee?.functionalManager || ""
  );
  const [grantedLeave, setGrantedLeave] = useState(
    employee?.grantedLeave || 48
  );

  const availableBalance =
    grantedLeave - employee?.availedLeave + employee?.openingBalance;
  const leaveData = [
    { name: "Available", AvailableBalance: availableBalance },
    { name: "Opening", OpeningBalance: employee?.openingBalance || 0 },
    { name: "Granted", GrantedLeave: grantedLeave },
    { name: "Availed", AvailedLeave: employee?.availedLeave || 0 },
  ];
  if (!employee)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-red-600">
            Employee Not Found
          </h3>
          <p className="text-red-500 mt-2">
            The requested employee profile could not be found.
          </p>
        </div>
      </div>
    );

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-0 bg-gray-50 rounded-xl shadow-lg mt-8 overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-300 p-6 text-white">
        <h2 className="text-3xl font-bold">{employee.name}'s Profile</h2>
        <p className="opacity-90 mt-1">
          {designation || employee.designation || "Employee"}
        </p>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left column - Avatar and quick info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={`https://randomuser.me/api/portraits/men/${employee.id}.jpg`}
                  alt={employee.name}
                  className="h-40 w-40 rounded-full border-4 border-white shadow-md"
                />
                <span
                  className={`absolute bottom-2 right-2 h-6 w-6 border-4 border-white rounded-full ${
                    employee.status === "active"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}></span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {employee.name}
              </h3>
              <p className="text-gray-600 mb-4">{employee.department}</p>

              {/* Social Icons */}
              <div className="flex gap-4 text-xl text-gray-700 mt-2">
                {employee.linkedinUrl && (
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                )}
                {employee.githubUrl && (
                  <a href="https://github.com/dhivyabharathis14">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                )}
                {employee.facebookUrl && (
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                )}
              </div>
            </div>

            {/* Upcoming Events Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 my-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Upcoming Events
              </h3>
              {employee.upcomingEvents?.length ? (
                <div className="space-y-2">
                  {employee.upcomingEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-700">{event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                  <p>No upcoming events scheduled.</p>
                </div>
              )}
            </div>

            {/* Message Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Message from {employee.name}
              </h3>
              {employee.message ? (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 italic">{employee.message}</p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                  <p>No message has been shared.</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 my-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Performance & Recognition
              </h3>

              <div className="space-y-6">
                {/* Star Rating */}
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-32">
                    Star Rating:
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          i < (employee.starRating || 0) ? "#fbbf24" : "#e5e7eb"
                        }
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-6 h-6">
                        <path d="M12 .587l3.668 7.57L24 9.748l-6 5.848 1.416 8.268L12 19.896l-7.416 3.968L6 15.596 0 9.748l8.332-1.591z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      {employee.starRating || 0}/5
                    </span>
                  </div>
                </div>
                {/* Performance Review */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Performance Review:
                  </h4>
                  {employee.performanceReview ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {employee.performanceReview}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No performance reviews available.
                    </p>
                  )}
                </div>

                {/* Awards */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Awards Received:
                  </h4>
                  {employee.awards && employee.awards.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {employee.awards.map((award, idx) => (
                        <div
                          key={idx}
                          className="flex items-center bg-yellow-50 p-3 rounded-lg">
                          <div className="mr-3 text-yellow-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700">{award}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No awards received yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Employee Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
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
                  Employee Information
                </h3>
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                    isEditing
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      Designation
                    </label>
                    {isEditing ? (
                      <input
                        className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Enter designation"
                      />
                    ) : (
                      <p className="font-medium">
                        {designation || employee.designation || "Not Specified"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      Department
                    </label>
                    <p className="font-medium">{employee.department}</p>
                  </div>

                  <div className="flex gap-5">
                    <label className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                      Status
                    </label>
                    <div className="">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${
                          employee.status === "active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}>
                        {employee.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      Reporting Manager
                    </label>
                    {isEditing ? (
                      <input
                        className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={reportingManager}
                        onChange={(e) => setReportingManager(e.target.value)}
                        placeholder="Enter reporting manager"
                      />
                    ) : (
                      <p className="font-medium">
                        {reportingManager ||
                          employee.reportingManager ||
                          "Not Assigned"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      Functional Manager
                    </label>
                    {isEditing ? (
                      <input
                        className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={functionalManager}
                        onChange={(e) => setFunctionalManager(e.target.value)}
                        placeholder="Enter functional manager"
                      />
                    ) : (
                      <p className="font-medium">
                        {functionalManager ||
                          employee.functionalManager ||
                          "Not Assigned"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Leave Balance
                </h3>
                {isEditing && (
                  <button
                    className="px-4 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
                    onClick={() => {}}>
                    Update Leave
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 p-1 rounded-lg text-center">
                  <h4 className="text-sm font-medium text-gray-600">
                    Available Balance
                  </h4>
                  <p className="text-2xl font-bold text-blue-700 mt-1">
                    {availableBalance}
                  </p>
                </div>
                <div className="bg-yellow-50 p-1 rounded-lg text-center">
                  <h4 className="text-sm font-medium text-gray-600">
                    Opening Balance
                  </h4>
                  <p className="text-2xl font-bold text-yellow-700 mt-1">
                    {employee?.openingBalance}
                  </p>
                </div>
                <div className="bg-green-50 p-1 rounded-lg text-center">
                  <h4 className="text-sm font-medium text-gray-600">Granted</h4>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-20 text-center border border-gray-300 rounded p-1 mt-1 text-lg font-bold"
                      value={grantedLeave}
                      onChange={(e) =>
                        setGrantedLeave(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  ) : (
                    <p className="text-2xl font-bold text-green-700 mt-1">
                      {grantedLeave}
                    </p>
                  )}
                </div>
                <div className="bg-red-50 p-1 rounded-lg text-center">
                  <h4 className="text-sm font-medium text-gray-600">Availed</h4>
                  <p className="text-2xl font-bold text-red-700 mt-1">
                    {employee?.availedLeave}
                  </p>
                </div>
              </div>
              {/* Leave Balance Card */}
              <div className="flex w-96">
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Leave Summary (Bar View)
                  </h4>
                  <ResponsiveContainer width={500} height={300}>
                    <BarChart
                      data={leaveData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="GrantedLeave"
                        stackId="a"
                        fill="pink"
                        radius={[3, 3, 0, 0]}
                      />
                      <Bar
                        dataKey="AvailedLeave"
                        stackId="a"
                        fill="pink"
                        radius={[3, 3, 0, 0]}
                      />
                      <Bar
                        dataKey="AvailableBalance"
                        stackId="a"
                        fill="pink"
                        radius={[3, 3, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* <GoalSuggestion employee={employee.name} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

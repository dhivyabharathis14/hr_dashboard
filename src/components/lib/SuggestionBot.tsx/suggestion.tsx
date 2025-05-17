// import { useState } from "react";
// import { Ollama } from "ollama";
// import { AlertCircle, Loader, Target } from "lucide-react";

// const GoalSuggestion = ({ employee }) => {
//   const [goals, setGoals] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const ollama = new Ollama();

//   const fetchGoals = async () => {
//     setLoading(true);
//     setError("");
//     setGoals("");

//     const prompt = `
// You are an HR assistant. Suggest exactly 3 SMART goals for this employee, each goal no longer than 20 words.

// Employee details:
// - Name: ${employee.name}
// - Role: ${employee.role || "Software Developer"}
// - Experience: 2 years
// - Strengths: ${
//       employee.strengths || "Consistent performance, technical proficiency"
//     }
// - Areas for Improvement: ${
//       employee.weaknesses || "Communication, cross-team collaboration"
//     }

// Format the goals as a numbered list.
// Make sure the goals are Specific, Measurable, Achievable, Relevant, and Time-bound.
// Respond only with the 3 goals, no extra text.
// `.trim();

//     try {
//       const response = await ollama.generate({
//         model: "llama2",
//         prompt: prompt,
//       });

//       console.log("Ollama response:", response);

//       setGoals(response.response.trim());
//     } catch (err) {
//       console.error("Error generating goals:", err);
//       setError("Failed to generate goals.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full">
//       <div className="flex justify-between">
//         <div className="flex items-center mb-4">
//           <Target className="h-5 w-5 text-blue-600 mr-2" />
//           <h2 className="text-lg font-semibold text-gray-800">
//             Development Goals
//           </h2>
//         </div>

//         <div className="mb-6">
//           <button
//             className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
//             onClick={fetchGoals}
//             disabled={loading}>
//             {loading ? (
//               <>
//                 <Loader className="h-4 w-4 mr-2 animate-spin" />
//                 Generating goals...
//               </>
//             ) : (
//               "Generate SMART Goals"
//             )}
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
//             <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}
//       </div>
//       {goals && (
//         <div className="mt-4 relative">
//           <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//             <div className="whitespace-pre-wrap text-sm text-gray-700 mb-2">
//               {goals}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoalSuggestion;

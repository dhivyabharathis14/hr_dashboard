// Enhanced mock API with filtering support
import { EmployeeFilters } from "../store/employee/employeeSlice";

// Create more diverse mock data for better filtering demo
const allMockData = {
  companyA: [
    ...new Array(20).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Alice A${i + 1}`,
      department: "Engineering",
      designation: "Developer",
      status: i % 2 === 0 ? "active" : "on leave",
      reportingManager: "Rithik",
      functionalManager: "Sundar",
      availableLeaves: 10,
      usedLeaves: 5,
      linkedinUrl: "https://linkedin.com/in/dhivya",
      githubUrl: "https://github.com/dhivyabharathis14",
      facebookUrl: "https://facebook.com/dhivya",
      message: "Excited to be part of the new HR Dashboard initiative!",
      upcomingEvents: ["Team Outing - May 25", "Performance Review - June 3"],
      availedLeave: 38,
      openingBalance: 0,
    })),
    ...new Array(15).fill(null).map((_, i) => ({
      id: i + 21,
      name: `Mike A${i + 21}`,
      department: "Engineering",
      designation: "Senior Developer",
      status: i % 3 === 0 ? "on leave" : "active",
      reportingManager: "Rithik",
      functionalManager: "Sundar",
      availableLeaves: 15,
      usedLeaves: 3,
      linkedinUrl: "https://linkedin.com/in/mike",
      githubUrl: "https://github.com/mike",
      facebookUrl: "https://facebook.com/mike",
      message: "Working on the new feature set!",
      upcomingEvents: ["Code Review - May 20", "Team Building - June 10"],
      availedLeave: 22,
      openingBalance: 0,
    })),
    ...new Array(15).fill(null).map((_, i) => ({
      id: i + 36,
      name: `Sarah A${i + 36}`,
      department: "Product",
      designation: "Product Manager",
      status: "active",
      reportingManager: "Jane",
      functionalManager: "David",
      availableLeaves: 12,
      usedLeaves: 8,
      linkedinUrl: "https://linkedin.com/in/sarah",
      githubUrl: "https://github.com/sarah",
      facebookUrl: "https://facebook.com/sarah",
      message: "Planning Q3 roadmap!",
      upcomingEvents: ["Product Review - May 28", "Strategy Session - June 5"],
      availedLeave: 17,
      openingBalance: 0,
    })),
  ],
  companyB: [
    ...new Array(10).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Bob B${i + 1}`,
      department: "Sales",
      designation: "Manager",
      status: i % 3 === 0 ? "on leave" : "active",
      reportingManager: "Rithik",
      functionalManager: "Sundar",
      availableLeaves: 10,
      usedLeaves: 5,
      linkedinUrl: "https://linkedin.com/in/bob",
      githubUrl: "https://github.com/bob",
      facebookUrl: "https://facebook.com/bob",
      message: "Closing Q2 deals!",
      upcomingEvents: ["Sales Meeting - May 22", "Client Pitch - June 1"],
      availedLeave: 38,
      openingBalance: 0,
    })),
    ...new Array(10).fill(null).map((_, i) => ({
      id: i + 11,
      name: `Lisa B${i + 11}`,
      department: "Sales",
      designation: "Representative",
      status: "active",
      reportingManager: "Bob",
      functionalManager: "Sundar",
      availableLeaves: 8,
      usedLeaves: 7,
      linkedinUrl: "https://linkedin.com/in/lisa",
      githubUrl: "https://github.com/lisa",
      facebookUrl: "https://facebook.com/lisa",
      message: "Hit 120% of quota this month!",
      upcomingEvents: ["Training - May 24", "Team Call - June 2"],
      availedLeave: 24,
      openingBalance: 0,
    })),
    ...new Array(10).fill(null).map((_, i) => ({
      id: i + 21,
      name: `Tom B${i + 21}`,
      department: "Marketing",
      designation: "Specialist",
      status: i % 4 === 0 ? "on leave" : "active",
      reportingManager: "Kate",
      functionalManager: "David",
      availableLeaves: 12,
      usedLeaves: 4,
      linkedinUrl: "https://linkedin.com/in/tom",
      githubUrl: "https://github.com/tom",
      facebookUrl: "https://facebook.com/tom",
      message: "Working on campaign analytics",
      upcomingEvents: [
        "Campaign Review - May 26",
        "Strategy Planning - June 7",
      ],
      availedLeave: 31,
      openingBalance: 0,
    })),
  ],
  companyC: [
    ...new Array(15).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Charlie C${i + 1}`,
      department: "HR",
      designation: "Executive",
      status: "active",
      reportingManager: "Maya",
      functionalManager: "Sundar",
      availableLeaves: 10,
      usedLeaves: 5,
      linkedinUrl: "https://linkedin.com/in/charlie",
      githubUrl: "https://github.com/charlie",
      facebookUrl: "https://facebook.com/charlie",
      message: "Reviewing hiring plans for Q3",
      upcomingEvents: ["Hiring Committee - May 25", "Review Session - June 3"],
      availedLeave: 38,
      openingBalance: 0,
    })),
    ...new Array(15).fill(null).map((_, i) => ({
      id: i + 16,
      name: `Diane C${i + 16}`,
      department: "HR",
      designation: "Manager",
      status: i % 5 === 0 ? "on leave" : "active",
      reportingManager: "Sam",
      functionalManager: "Chris",
      availableLeaves: 14,
      usedLeaves: 2,
      linkedinUrl: "https://linkedin.com/in/diane",
      githubUrl: "https://github.com/diane",
      facebookUrl: "https://facebook.com/diane",
      message: "Updating employee handbook",
      upcomingEvents: ["Policy Meeting - May 21", "Training - June 8"],
      availedLeave: 25,
      openingBalance: 0,
    })),
    ...new Array(10).fill(null).map((_, i) => ({
      id: i + 31,
      name: `Frank C${i + 31}`,
      department: "Finance",
      designation: "Analyst",
      status: "active",
      reportingManager: "Victoria",
      functionalManager: "George",
      availableLeaves: 11,
      usedLeaves: 6,
      linkedinUrl: "https://linkedin.com/in/frank",
      githubUrl: "https://github.com/frank",
      facebookUrl: "https://facebook.com/frank",
      message: "Preparing Q2 financial reports",
      upcomingEvents: [
        "Budget Review - May 30",
        "Financial Planning - June 12",
      ],
      availedLeave: 29,
      openingBalance: 0,
    })),
  ],
};

/**
 * Gets all unique departments across all employees in a company
 */
export async function fetchDepartments(company: string) {
  await new Promise((r) => setTimeout(r, 300));
  const data = allMockData[company] || [];
  const departments = Array.from(
    new Set(data.map((employee) => employee.department))
  );
  return departments;
}

/**
 * Gets all unique designations across all employees in a company
 */
export async function fetchDesignations(company: string) {
  await new Promise((r) => setTimeout(r, 300));
  const data = allMockData[company] || [];
  const designations = Array.from(
    new Set(data.map((employee) => employee.designation))
  );
  return designations;
}

/**
 * Enhanced fetch employees function with filtering support
 */
export async function fetchEmployees(
  company: string,
  page: number,
  filters?: EmployeeFilters,
  pageSize = 10
) {
  await new Promise((r) => setTimeout(r, 500)); // Simulate network delay

  // Get data for the selected company
  let data = allMockData[company] || [];

  // Apply department filter if provided
  if (filters?.department) {
    data = data.filter(
      (employee) => employee.department === filters.department
    );
  }

  // Apply designation filter if provided
  if (filters?.designation) {
    data = data.filter(
      (employee) => employee.designation === filters.designation
    );
  }

  // Calculate pagination
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  // Extract unique departments and designations for filter dropdowns
  const departments = Array.from(
    new Set(allMockData[company]?.map((e) => e.department) || [])
  );
  const designations = Array.from(
    new Set(allMockData[company]?.map((e) => e.designation) || [])
  );

  return {
    data: paginated,
    hasMore: page < totalPages,
    totalPages,
    departments,
    designations,
  };
}

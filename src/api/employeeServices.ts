const allMockData = {
  companyA: new Array(50).fill(null).map((_, i) => ({
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
    githubUrl: "https://github.com/dhivya",
    facebookUrl: "https://facebook.com/dhivya",
    message: "Excited to be part of the new HR Dashboard initiative!",
    upcomingEvents: ["Team Outing - May 25", "Performance Review - June 3"],
    availedLeave: 38,
    openingBalance: 0,
  })),
  companyB: new Array(30).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Bob B${i + 1}`,
    department: "Sales",
    designation: "Manager",
    status: i % 3 === 0 ? "on leave" : "active",
    reportingManager: "Rithik",
    functionalManager: "Sundar",
    availableLeaves: 10,
    usedLeaves: 5,
    linkedinUrl: "https://linkedin.com/in/dhivya",
    githubUrl: "https://github.com/dhivya",
    facebookUrl: "https://facebook.com/dhivya",
    message: "Excited to be part of the new HR Dashboard initiative!",
    upcomingEvents: ["Team Outing - May 25", "Performance Review - June 3"],
    availedLeave: 38,
    openingBalance: 0,
  })),
  companyC: new Array(40).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Charlie C${i + 1}`,
    department: "HR",
    designation: "Executive",
    status: "active",
    reportingManager: "Rithik",
    functionalManager: "Sundar",
    availableLeaves: 10,
    usedLeaves: 5,
    linkedinUrl: "https://linkedin.com/in/dhivya",
    githubUrl: "https://github.com/dhivya",
    facebookUrl: "https://facebook.com/dhivya",
    message: "Excited to be part of the new HR Dashboard initiative!",
    upcomingEvents: ["Team Outing - May 25", "Performance Review - June 3"],
    availedLeave: 38,
    openingBalance: 0,
  })),
};

export async function fetchEmployees(
  company: string,
  page: number,
  pageSize = 10
) {
  await new Promise((r) => setTimeout(r, 500));
  const data = allMockData[company] || [];
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    data: paginated,
    hasMore: page < totalPages,
    totalPages,
  };
}

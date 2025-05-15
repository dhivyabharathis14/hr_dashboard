const allMockData = {
  companyA: new Array(50).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Alice A${i + 1}`,
    department: "Engineering",
    designation: "Developer",
    status: i % 2 === 0 ? "active" : "on leave",
  })),
  companyB: new Array(30).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Bob B${i + 1}`,
    department: "Sales",
    designation: "Manager",
    status: i % 3 === 0 ? "on leave" : "active",
  })),
  companyC: new Array(40).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Charlie C${i + 1}`,
    department: "HR",
    designation: "Executive",
    status: "active",
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

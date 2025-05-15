import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#34d399", "#f87171"];

const LeaveBalanceChart = ({
  available,
  used,
}: {
  available: number;
  used: number;
}) => {
  const data = [
    { name: "Available", value: available },
    { name: "Used", value: used },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Leave Balance Summary
      </h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label>
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default LeaveBalanceChart;

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaWorkersData {
  name: string;
  workers: number;
  color: string;
}

interface AreaWorkersChartProps {
  data: AreaWorkersData[];
}

export function AreaWorkersChart({ data }: AreaWorkersChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}명`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
            formatter={(value: number) => [`${value}명`, "인원수"]}
          />
          <Bar
            dataKey="workers"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-blue-500"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RiskGaugeProps {
  value: number;
}

export function RiskGauge({ value }: RiskGaugeProps) {
  const data = [
    {
      name: "위험도",
      value: value,
      fill: "#22c55e",
    },
    {
      name: "최대",
      value: 100,
      fill: "#ef4444",
    },
  ];

  return (
    <>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="value"
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4">
        <span className="text-2xl font-bold text-green-500">{value}%</span>
        <p className="text-sm text-muted-foreground">현재 위험도</p>
      </div>
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface RiskData {
  name: string;
  "가스 농도": number;
  온도: number;
  소음: number;
  분진: number;
}

interface RiskTableProps {
  data: RiskData[];
}

export function RiskTable({ data }: RiskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">구역</th>
            <th className="text-center py-2">가스 농도</th>
            <th className="text-center py-2">온도</th>
            <th className="text-center py-2">소음</th>
            <th className="text-center py-2">분진</th>
          </tr>
        </thead>
        <tbody>
          {data.map((area) => (
            <tr key={area.name} className="border-b">
              <td className="py-2">{area.name}</td>
              <td className="text-center">
                <div className="inline-flex items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      area["가스 농도"] > 40
                        ? "bg-red-500"
                        : area["가스 농도"] > 30
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                  {area["가스 농도"]}%
                </div>
              </td>
              <td className="text-center">
                <div className="inline-flex items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      area["온도"] > 50
                        ? "bg-red-500"
                        : area["온도"] > 35
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                  {area["온도"]}°C
                </div>
              </td>
              <td className="text-center">
                <div className="inline-flex items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      area["소음"] > 35
                        ? "bg-red-500"
                        : area["소음"] > 25
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                  {area["소음"]}dB
                </div>
              </td>
              <td className="text-center">
                <div className="inline-flex items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      area["분진"] > 30
                        ? "bg-red-500"
                        : area["분진"] > 20
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                  {area["분진"]}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

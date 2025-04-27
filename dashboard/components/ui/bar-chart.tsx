"use client";

import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface BarChartProps {
  data: {
    name: string;
    value: number;
    [key: string]: any;
  }[];
  xAxisDataKey?: string;
  colors?: string[];
  height?: number;
  className?: string;
}

export function BarChart({
  data,
  xAxisDataKey = "name",
  colors = ["#9333ea"],
  height = 350,
  className,
}: BarChartProps) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`h-${height} w-full bg-gray-50 rounded-md animate-pulse`} />;
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 189, 0, 0.1)" }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar
            dataKey="value"
            fill={colors[0]}
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
} 
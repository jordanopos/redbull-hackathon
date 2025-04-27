"use client";

import * as React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

interface PieChartProps {
  data: {
    name: string;
    value: number;
    [key: string]: any;
  }[];
  colors?: string[];
  height?: number;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
}

export function PieChart({
  data,
  colors = ["#9333ea", "#c084fc", "#a855f7", "#d8b4fe", "#f3e8ff"],
  height = 350,
  className,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true,
}: PieChartProps) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    // Force a re-render after component is mounted
    const timer = setTimeout(() => {
      setMounted(prev => prev);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  // If we have more data items than colors, cycle through colors
  const getColor = (index: number) => {
    return colors[index % colors.length];
  };

  if (!mounted) {
    return <div style={{ height: `${height}px` }} className="w-full bg-gray-50 rounded-md animate-pulse" />;
  }

  return (
    <div className={className} style={{ height: `${height}px`, width: '100%', position: 'relative' }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
            ))}
          </Pie>
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ bottom: 0 }}
            />
          )}
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
} 
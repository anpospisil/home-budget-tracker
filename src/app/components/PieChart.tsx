"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#facc15', '#a855f7'];

export default function CategoryPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

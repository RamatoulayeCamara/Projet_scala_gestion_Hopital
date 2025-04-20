"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    patients: 40,
    consultations: 24,
    hospitalisations: 12,
  },
  {
    name: "Fév",
    patients: 30,
    consultations: 18,
    hospitalisations: 10,
  },
  {
    name: "Mar",
    patients: 45,
    consultations: 28,
    hospitalisations: 15,
  },
  {
    name: "Avr",
    patients: 50,
    consultations: 32,
    hospitalisations: 18,
  },
  {
    name: "Mai",
    patients: 35,
    consultations: 22,
    hospitalisations: 14,
  },
  {
    name: "Juin",
    patients: 55,
    consultations: 35,
    hospitalisations: 20,
  },
  {
    name: "Juil",
    patients: 48,
    consultations: 30,
    hospitalisations: 16,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="patients" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="consultations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="hospitalisations" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

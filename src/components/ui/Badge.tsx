import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "indigo" | "emerald" | "amber" | "red" | "slate" | "violet" | "sky";
}

const colors = {
  indigo: "bg-indigo-100 text-indigo-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-600",
  violet: "bg-violet-100 text-violet-700",
  sky: "bg-sky-100 text-sky-700",
};

export default function Badge({ children, color = "indigo" }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
}
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl ${hover ? "transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-slate-100 hover:border-slate-200" : ""} ${className}`}>
      {children}
    </div>
  );
}
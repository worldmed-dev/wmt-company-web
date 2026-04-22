import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={["rounded-3xl border border-black/10 bg-white", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label?: string;
}

export default function IconButton({
  icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center gap-2",
        "rounded-xl",
        "border border-white/10",
        "bg-[#1A1D24]",
        "px-3 py-2",
        "text-slate-300",
        "transition-all duration-200",
        "hover:border-cyan-500/30",
        "hover:bg-cyan-500/10",
        "hover:text-cyan-300",
        className
      )}
    >
      {icon}
      {label && (
        <span className="text-xs font-semibold">
          {label}
        </span>
      )}
    </button>
  );
}

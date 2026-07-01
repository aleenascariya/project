import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export default function Card({
  title,
  icon,
  children,
  className,
  headerAction,
}: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl",
        "border border-white/10",
        "bg-[#14171D]/90",
        "backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
        "transition-all",
        "duration-300",
        "hover:border-cyan-500/20",
        "hover:shadow-cyan-500/10",
        className
      )}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div className="flex items-center gap-2">
            {icon}

            {title && (
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-200">
                {title}
              </h2>
            )}
          </div>

          {headerAction}
        </div>
      )}

      <div className="p-5">{children}</div>
    </section>
  );
}

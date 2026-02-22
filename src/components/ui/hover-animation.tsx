
import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "scale" | "lift" | "glow" | "border" | "underline";
  delay?: number;
}

const variantStyles = {
  scale: "transition-transform duration-300 hover:scale-105",
  lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
  glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,113,255,0.5)]",
  border: "transition-all duration-300 hover:border-primary/70 border border-transparent",
  underline: "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
};

const HoverAnimation = React.forwardRef<
  HTMLDivElement,
  HoverAnimationProps
>(({ className, variant = "scale", children, delay = 0, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(variantStyles[variant], className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
});
HoverAnimation.displayName = "HoverAnimation";

export { HoverAnimation };

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "border-4 border-primary/20 border-t-primary rounded-full animate-spin",
        sizeClasses[size]
      )} />
      <div className={cn(
        "absolute inset-0 border-4 border-transparent border-r-secondary/40 rounded-full animate-spin",
        sizeClasses[size]
      )} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
    </div>
  );
};
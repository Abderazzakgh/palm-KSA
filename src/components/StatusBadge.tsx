import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "success" | "error" | "warning" | "pending";
  text: string;
  className?: string;
}

export const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
  const config = {
    success: {
      icon: CheckCircle,
      className: "bg-success/10 text-success border-success/30",
      iconClassName: "text-success"
    },
    error: {
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/30",
      iconClassName: "text-destructive"
    },
    warning: {
      icon: AlertCircle,
      className: "bg-accent/10 text-accent border-accent/30",
      iconClassName: "text-accent"
    },
    pending: {
      icon: Clock,
      className: "bg-muted/10 text-muted-foreground border-muted/30",
      iconClassName: "text-muted-foreground animate-pulse"
    }
  };

  const { icon: Icon, className: statusClassName, iconClassName } = config[status];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium",
      statusClassName,
      className
    )}>
      <Icon className={cn("w-4 h-4", iconClassName)} />
      <span>{text}</span>
    </div>
  );
};
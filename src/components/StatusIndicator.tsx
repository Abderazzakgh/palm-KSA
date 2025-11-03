import { Badge } from "@/components/ui/badge";
import { Activity, Wifi } from "lucide-react";

export const StatusIndicator = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="animate-pulse-glow bg-background/80 backdrop-blur-sm border border-border/50">
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
          <Activity className="w-3 h-3 mr-1" />
          النظام متصل
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border border-border/50">
          <Wifi className="w-3 h-3 mr-1" />
          استقرار الشبكة: 99%
        </Badge>
      </div>
    </div>
  );
};
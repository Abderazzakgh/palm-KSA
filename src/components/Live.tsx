import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Users, 
  Scan, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  RefreshCw
} from "lucide-react";

export const Live = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const liveStats = [
    { title: "مسح نشط", value: "24", status: "success", icon: Scan },
    { title: "مستخدمين متصلين", value: "156", status: "success", icon: Users },
    { title: "معدل النجاح", value: "99.8%", status: "success", icon: CheckCircle },
    { title: "حالة النظام", value: "مستقر", status: "success", icon: Activity }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20 mb-6">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground">مباشر الآن</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              النظام يعمل بكامل طاقته
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            متابعة مباشرة لأداء النظام والعمليات الجارية في الوقت الفعلي
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {liveStats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-muted/50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs animate-pulse">
                  مباشر
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">حالة الخدمات</h3>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLastUpdate(new Date())}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                تحديث
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">خادم المسح</span>
              </div>
              <Badge variant="secondary">تشغيل</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">قاعدة البيانات</span>
              </div>
              <Badge variant="secondary">تشغيل</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">API Gateway</span>
              </div>
              <Badge variant="secondary">تشغيل</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">التحليلات</span>
              </div>
              <Badge variant="outline">صيانة</Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
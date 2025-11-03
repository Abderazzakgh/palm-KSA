import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Scan,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Settings
} from "lucide-react";
import { toast } from "sonner";

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("اليوم");

  const stats = [
    { title: "المسح اليوم", value: "1,247", change: "+12%", icon: Scan, color: "text-primary" },
    { title: "المستخدمين النشطين", value: "342", change: "+8%", icon: Users, color: "text-secondary" },
    { title: "معدل النجاح", value: "99.9%", change: "+0.1%", icon: CheckCircle, color: "text-success" },
    { title: "متوسط الوقت", value: "0.8s", change: "-0.1s", icon: Clock, color: "text-accent" }
  ];

  const recentScans = [
    { id: "SC001", user: "أحمد محمد", time: "10:30 ص", status: "نجح", application: "الدفع" },
    { id: "SC002", user: "فاطمة السالم", time: "10:28 ص", status: "نجح", application: "الحضور" },
    { id: "SC003", user: "محمد العتيبي", time: "10:25 ص", status: "فشل", application: "الدخول" },
    { id: "SC004", user: "نورا الأحمد", time: "10:22 ص", status: "نجح", application: "الدفع" },
    { id: "SC005", user: "عبدالله الخالد", time: "10:20 ص", status: "نجح", application: "الحضور" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
            <p className="text-muted-foreground">مراقبة سافانا في الوقت الفعلي</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="animate-pulse-glow">
              <Activity className="w-3 h-3 mr-1" />
              متصل
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("الإعدادات قيد التطوير")}
            >
              <Settings className="w-4 h-4 mr-2" />
              إعدادات
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-muted rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="scans">المسح الضوئي</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity Chart */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">نشاط المسح الضوئي</h3>
                  <div className="flex gap-2">
                    {["اليوم", "الأسبوع", "الشهر"].map((period) => (
                      <Button
                        key={period}
                        variant={selectedPeriod === period ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedPeriod(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">الدفع الإلكتروني</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">الحضور والانصراف</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">التحكم بالوصول</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </Card>

              {/* System Health */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-6">حالة النظام</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm">خادم المسح الضوئي</span>
                    </div>
                    <Badge variant="secondary">تعمل بشكل طبيعي</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm">قاعدة البيانات</span>
                    </div>
                    <Badge variant="secondary">تعمل بشكل طبيعي</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">خدمة التشفير</span>
                    </div>
                    <Badge variant="secondary">صيانة مجدولة</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm">API Gateway</span>
                    </div>
                    <Badge variant="secondary">تعمل بشكل طبيعي</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scans" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">عمليات المسح الأخيرة</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.success("جاري تحضير التقرير للتصدير")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  تصدير التقرير
                </Button>
              </div>
              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <div 
                    key={scan.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-mono text-muted-foreground">{scan.id}</div>
                      <div>
                        <div className="font-medium">{scan.user}</div>
                        <div className="text-sm text-muted-foreground">{scan.application}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">{scan.time}</div>
                      <Badge 
                        variant={scan.status === "نجح" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {scan.status === "نجح" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {scan.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">إحصائيات المستخدمين</h3>
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => toast.info("نافذة إضافة مستخدم قيد التطوير")}
                >
                  <Users className="w-4 h-4 ml-2" />
                  إضافة مستخدم
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">1,247</div>
                  <div className="text-sm text-muted-foreground">إجمالي المستخدمين</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary mb-2">342</div>
                  <div className="text-sm text-muted-foreground">نشط هذا الشهر</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">89</div>
                  <div className="text-sm text-muted-foreground">مضاف هذا الأسبوع</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
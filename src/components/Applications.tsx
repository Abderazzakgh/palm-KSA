import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Building2, 
  Clock, 
  DoorOpen, 
  ShoppingCart,
  Banknote,
  UserCheck,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Applications = () => {
  const navigate = useNavigate();
  
  const applications = [
    {
      icon: CreditCard,
      title: "الدفع الإلكتروني",
      description: "دفع آمن فوري بدون بطاقات أو كلمات مرور",
      gradient: "bg-gradient-primary",
      shadow: "hover:shadow-glow-primary",
      features: ["دفع فوري", "أمان تام", "بدون بطاقات"]
    },
    {
      icon: Building2,
      title: "العمليات البنكية",
      description: "تحقق متقدم للمعاملات المصرفية عالية الأمان",
      gradient: "bg-gradient-secondary",
      shadow: "hover:shadow-glow-secondary",
      features: ["تحويلات آمنة", "سحب نقدي", "خدمات بنكية"]
    },
    {
      icon: Clock,
      title: "الحضور والانصراف",
      description: "تتبع دقيق للوقت مع تقارير تلقائية شاملة",
      gradient: "bg-gradient-accent",
      shadow: "hover:shadow-glow-accent",
      features: ["تتبع ذكي", "تقارير فورية", "إدارة متقدمة"]
    },
    {
      icon: DoorOpen,
      title: "التحكم بالوصول",
      description: "أمان متقدم للمباني والمناطق الحساسة",
      gradient: "bg-gradient-primary",
      shadow: "hover:shadow-glow-primary",
      features: ["أمان شامل", "سجل مفصل", "صلاحيات متدرجة"]
    }
  ];

  return (
    <section id="applications" className="py-16 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              التطبيقات المتاحة
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            حلول تقنية متكاملة تتناسب مع احتياجات جميع القطاعات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {applications.map((app, index) => (
            <Card 
              key={index}
              className={`p-6 bg-gradient-card border-border/50 ${app.shadow} transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${app.gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{app.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {app.description}
                </p>
                <div className="space-y-2">
                  {app.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                حلول متكاملة للأعمال
              </span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              حلول تقنية متطورة تتكامل بسلاسة مع الأنظمة الحالية لضمان انتقال
              آمن وسريع إلى تقنية التحقق المتقدمة ببصمة الكف.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">أنظمة البيع</span>
              </div>
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">الأنظمة المصرفية</span>
              </div>
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">إدارة الموارد البشرية</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">أنظمة الأمان</span>
              </div>
            </div>

            <Button 
              variant="premium" 
              size="lg"
              onClick={() => navigate("/contact")}
            >
              طلب عرض تقني مخصص
            </Button>
          </div>

          <Card className="p-8 bg-gradient-card border-border/50">
            <div className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">دقة التحقق</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">&lt;1s</div>
                  <div className="text-sm text-muted-foreground">وقت الاستجابة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">256</div>
                  <div className="text-sm text-muted-foreground">تشفير bit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">دعم فني</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
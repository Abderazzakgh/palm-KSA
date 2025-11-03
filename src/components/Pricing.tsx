import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Zap, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Pricing = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "البداية",
      nameEn: "Starter",
      price: "299",
      period: "شهرياً",
      description: "مثالي للمتاجر الصغيرة والمكاتب",
      icon: Zap,
      gradient: "bg-gradient-primary",
      shadow: "hover:shadow-glow-primary",
      features: [
        "حتى 100 مستخدم",
        "مسح 1,000 يومياً",
        "دعم فني أساسي",
        "تشفير AES-256",
        "تقارير شهرية"
      ]
    },
    {
      name: "المتقدم",
      nameEn: "Professional", 
      price: "599",
      period: "شهرياً",
      description: "للشركات المتوسطة والمؤسسات",
      icon: Crown,
      gradient: "bg-gradient-secondary",
      shadow: "hover:shadow-glow-secondary",
      popular: true,
      features: [
        "حتى 500 مستخدم",
        "مسح غير محدود",
        "دعم فني 24/7",
        "تشفير متقدم",
        "تقارير فورية",
        "API متكامل",
        "تحليلات متقدمة"
      ]
    },
    {
      name: "المؤسسي",
      nameEn: "Enterprise",
      price: "حسب الطلب",
      period: "",
      description: "حلول مخصصة للمؤسسات الكبيرة",
      icon: Building,
      gradient: "bg-gradient-accent",
      shadow: "hover:shadow-glow-accent",
      features: [
        "مستخدمين غير محدود",
        "مسح غير محدود",
        "دعم مخصص",
        "نشر محلي",
        "تخصيص كامل",
        "تدريب الفريق",
        "SLA مضمون"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              خطط الأسعار
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الخطة المناسبة لاحتياجاتك مع إمكانية الترقية في أي وقت
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 bg-gradient-card border-border/50 ${plan.shadow} transition-all duration-300 animate-fade-in ${
                plan.popular ? 'scale-105 border-primary/50' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-secondary px-4 py-2 rounded-full text-secondary-foreground text-sm font-semibold">
                    الأكثر شعبية
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${plan.gradient} rounded-2xl mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <>
                      <span className="text-lg text-primary">ر.س</span>
                      <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "premium" : "hero"}
                size="lg"
                className="w-full"
                onClick={() => {
                  if (plan.price === "حسب الطلب") {
                    navigate("/contact");
                  } else {
                    navigate("/auth");
                  }
                }}
              >
                {plan.price === "حسب الطلب" ? "تواصل معنا" : "ابدأ الآن"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            جميع الخطط تشمل تجربة مجانية لمدة 30 يوم
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>بدون رسوم إعداد</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>إلغاء في أي وقت</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>دعم فني مجاني</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
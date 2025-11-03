import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Database, Cpu, Eye, Star, Award, Globe } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "تشفير AES-256 وحماية متعددة الطبقات",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Zap, 
      title: "أداء فائق",
      description: "معالجة فورية في أقل من ثانية",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Lock,
      title: "إدارة شاملة",
      description: "نظام متكامل لإدارة المستخدمين والصلاحيات", 
      gradient: "bg-gradient-accent"
    }
  ];

  const achievements = [
    { icon: Award, label: "معتمد ISO 27001", value: "✓" },
    { icon: Star, label: "تقييم أمني", value: "A+" },
    { icon: Globe, label: "خدمة عالمية", value: "24/7" },
  ];

  return (
    <section id="features" className="py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">الميزات الأساسية</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            تقنية متطورة تجمع بين الأمان والسرعة والدقة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 glass border-primary/20 transition-all duration-300 group cursor-pointer hover-lift"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
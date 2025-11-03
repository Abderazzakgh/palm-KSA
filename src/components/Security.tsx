import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Server, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Globe
} from "lucide-react";

export const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "تشفير AES-256",
      description: "أقوى معايير التشفير العالمية للحماية الكاملة",
      status: "محقق"
    },
    {
      icon: Lock,
      title: "عدم تخزين الصور",
      description: "قوالب مشفرة فقط، بدون صور خام قابلة للاستخراج",
      status: "محقق"
    },
    {
      icon: FileCheck,
      title: "شهادة ISO 27001",
      description: "امتثال كامل لمعايير أمن المعلومات الدولية",
      status: "معتمد"
    },
    {
      icon: Server,
      title: "مراكز بيانات آمنة",
      description: "خوادم محمية بأعلى مستويات الأمان الفيزيائي",
      status: "محقق"
    }
  ];

  const complianceStandards = [
    { name: "GDPR", description: "حماية البيانات الأوروبية" },
    { name: "PCI DSS", description: "معايير أمان الدفع" },
    { name: "SOC 2", description: "ضوابط الأمان التنظيمية" },
    { name: "NIST", description: "إطار أمان المعلومات" },
    { name: "حماية البيانات السعودي", description: "اللوائح المحلية" },
    { name: "SAMA", description: "متطلبات النقد السعودي" }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              الأمان والامتثال
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            نظام PalmSecure مصمم وفقاً لأعلى معايير الأمان العالمية مع امتثال كامل 
            للوائح المحلية والدولية لحماية البيانات
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compliance Standards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              معايير الامتثال المحققة
            </span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceStandards.map((standard, index) => (
              <Card 
                key={index}
                className="p-4 bg-gradient-card border-border/50 hover:shadow-glow-secondary transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{standard.name}</h4>
                    <p className="text-xs text-muted-foreground">{standard.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Monitoring */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                مراقبة أمنية مستمرة
              </span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              نظام مراقبة شامل مع حماية مستمرة وتسجيل مفصل لجميع الأنشطة
              وإنذارات فورية عند أي محاولة اختراق أو نشاط مشبوه.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">مراقبة فورية 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">إنذارات أمنية ذكية</span>
              </div>
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">تسجيل شامل للأنشطة</span>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-card border-border/50">
            <div className="text-center space-y-6">
              <h4 className="text-xl font-bold mb-6">إحصائيات الأمان</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-sm text-muted-foreground">انتهاكات أمنية</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">معدل الحماية</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">مراقبة مستمرة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">&lt;1min</div>
                  <div className="text-sm text-muted-foreground">زمن الاستجابة</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
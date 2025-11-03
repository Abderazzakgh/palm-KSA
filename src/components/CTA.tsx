import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-gradient-hero">
      <div className="container mx-auto">
        <Card className="relative p-12 bg-gradient-card border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="relative text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">جاهز للتشغيل في دقائق</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ابدأ رحلتك الآمنة
              </span>
              <br />
              <span className="text-foreground">مع PalmSecure اليوم</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف الشركات التي تثق في نظام PalmSecure لحماية بياناتها وتسريع عملياتها
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="animate-pulse-glow"
                onClick={() => navigate("/auth")}
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                ابدأ التجربة المجانية
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/contact")}
              >
                <Shield className="w-5 h-5 ml-2" />
                احجز عرض تقني
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>تجربة مجانية 30 يوم</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>بدون رسوم إعداد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>دعم فني مجاني</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
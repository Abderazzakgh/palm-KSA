import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Sparkles, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">تقنية معتمدة دولياً</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">سافانا</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            نظام التحقق الأكثر تطوراً في العالم
            <br />
            <span className="text-primary">بتقنية بصمة الكف المتطورة</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            <div className="text-center p-4 bg-gradient-card rounded-xl border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
              <p className="text-xs text-muted-foreground">دقة التحقق</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-xl border border-border/30">
              <div className="text-2xl font-bold text-secondary mb-1">&lt;1s</div>
              <p className="text-xs text-muted-foreground">وقت الاستجابة</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-xl border border-border/30">
              <div className="text-2xl font-bold text-accent mb-1">256</div>
              <p className="text-xs text-muted-foreground">تشفير bit</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-xl border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <p className="text-xs text-muted-foreground">دعم فني</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group" onClick={() => navigate("/auth")}>
              <ArrowLeft className="w-5 h-5 ml-2" />
              ابدأ المسح الآن
            </Button>
            <Button variant="outline" size="lg" className="group" onClick={() => {
              const scannerSection = document.getElementById('scanner');
              if (scannerSection) {
                scannerSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <Cpu className="w-5 h-5 ml-2" />
              تجربة تقنية
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: "99.9", suffix: "%", label: "دقة التحقق", delay: "0ms" },
    { number: "0.8", suffix: "s", label: "وقت الاستجابة", delay: "200ms" },
    { number: "500", suffix: "K+", label: "مستخدم نشط", delay: "400ms" },
    { number: "99.99", suffix: "%", label: "معدل التوفر", delay: "600ms" }
  ];

  return (
    <section className="py-16 px-6 bg-muted/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`p-6 bg-gradient-card border-border/50 text-center hover:shadow-glow-primary transition-all duration-500 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}<span className="text-secondary">{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
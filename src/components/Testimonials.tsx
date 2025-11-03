import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "أحمد السالم",
      position: "مدير التقنية",
      company: "البنك الأهلي",
      avatar: "أس",
      rating: 5,
      comment: "أمان وسرعة استثنائية. ثقة العملاء ازدادت بشكل ملحوظ منذ تطبيق النظام.",
      delay: "0ms"
    },
    {
      name: "فاطمة الزهراني", 
      position: "مديرة العمليات",
      company: "مجموعة العثيم",
      avatar: "فز",
      rating: 5,
      comment: "تكامل سلس مع الأنظمة الحالية. وفرنا وقتاً كبيراً وقللنا الأخطاء للصفر.",
      delay: "200ms"
    },
    {
      name: "محمد العتيبي",
      position: "مدير الأمان",
      company: "شركة أرامكو", 
      avatar: "مع",
      rating: 5,
      comment: "يلبي جميع معايير الأمان الدولية. أداء ممتاز وموثوقية عالية.",
      delay: "400ms"
    }
  ];

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              آراء عملائنا
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اكتشف كيف ساعد نظام PalmSecure الشركات والمؤسسات في تحقيق أهدافها الأمنية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow-secondary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: testimonial.delay }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                <p className="text-foreground leading-relaxed pr-6">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 p-6 bg-gradient-card rounded-2xl border border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">متوسط التقييم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">تقييم العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
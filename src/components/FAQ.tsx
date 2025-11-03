import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "كيف يعمل النظام؟",
      answer: "يحلل الخطوط والأوردة في الكف ويحولها لقالب مشفر غير قابل للعكس. المقارنة مع قاعدة البيانات تتم في أقل من ثانية."
    },
    {
      question: "هل البيانات آمنة؟",
      answer: "نعم، تشفير AES-256 بدون تخزين للصور الخام. فقط القوالب المشفرة مع معايير ISO 27001 الدولية."
    },
    {
      question: "ما دقة النظام؟",
      answer: "دقة 99.9% مع معدل خطأ 1:10,000. من أدق أنظمة التحقق الحيوي في السوق."
    },
    {
      question: "هل يتكامل مع الأنظمة الحالية؟",
      answer: "نعم، APIs سهلة للتكامل مع أنظمة البيع والبنوك وإدارة الموظفين. فريقنا يساعد في التكامل."
    },
    {
      question: "ما التكلفة؟",
      answer: "من 299 ريال شهرياً بدون رسوم إضافية. تجربة مجانية 30 يوم مع دعم فني مجاني."
    },
    {
      question: "مدة التنفيذ؟",
      answer: "1-3 أسابيع حسب حجم المؤسسة. تدريب شامل ودعم مستمر لانتقال سلس."
    }
  ];

  return (
    <section id="faq" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              الأسئلة الشائعة
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            إجابات على أكثر الأسئلة شيوعاً حول نظام PalmSecure
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gradient-card border border-border/50 rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="text-right hover:text-primary transition-colors">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            لديك سؤال آخر؟ فريق الدعم الفني متاح لمساعدتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@palmsecure.sa" 
              className="text-primary hover:text-primary-glow transition-colors"
            >
              support@palmsecure.sa
            </a>
            <span className="text-muted-foreground hidden sm:inline">|</span>
            <a 
              href="tel:+966112345678" 
              className="text-primary hover:text-primary-glow transition-colors"
            >
              +966 11 234 5678
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
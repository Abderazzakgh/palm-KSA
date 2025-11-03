import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "ما هي تقنية بصمة الكف PalmSecure؟",
      answer: "PalmSecure هو نظام تحقق متطور يستخدم أنماط الأوردة الفريدة في راحة اليد للتحقق من الهوية. هذه التقنية تعتبر الأكثر أماناً ودقة مقارنة بطرق التحقق التقليدية."
    },
    {
      question: "كيف يعمل نظام التحقق؟",
      answer: "يستخدم النظام الأشعة تحت الحمراء لمسح أنماط الأوردة في راحة اليد، والتي تعتبر فريدة لكل شخص ولا يمكن تزويرها. يتم تحليل هذه الأنماط ومقارنتها بالبيانات المخزنة بشكل مشفر."
    },
    {
      question: "هل البيانات الخاصة بي آمنة؟",
      answer: "نعم، جميع البيانات محمية بتشفير AES-256 المتقدم. لا نقوم بتخزين صور راحة اليد، بل نخزن فقط بيانات رياضية مشفرة لا يمكن إعادة بنائها أو استخدامها خارج النظام."
    },
    {
      question: "ما هي دقة النظام؟",
      answer: "نظام PalmSecure يتمتع بدقة تصل إلى 99.9% مع معدل خطأ شبه معدوم. هذا يجعله أحد أكثر أنظمة التحقق دقة في العالم."
    },
    {
      question: "كم من الوقت يستغرق المسح الضوئي؟",
      answer: "عملية المسح والتحقق تتم في أقل من ثانية واحدة، مما يجعلها سريعة ومريحة للاستخدام اليومي."
    },
    {
      question: "هل يمكن استخدام النظام في ظروف مختلفة؟",
      answer: "نعم، يعمل النظام في مختلف الظروف البيئية ولا يتأثر بحالة الجلد (جفاف، رطوبة، جروح سطحية) لأنه يعتمد على الأوردة الداخلية."
    },
    {
      question: "ما هي التطبيقات التي يمكن استخدام النظام فيها؟",
      answer: "يمكن استخدام PalmSecure في العديد من المجالات: البنوك، المستشفيات، المباني الحكومية، الشركات، المطارات، والمزيد من التطبيقات الأمنية."
    },
    {
      question: "هل يمكنني إلغاء أو تعديل بصمتي؟",
      answer: "نعم، يمكنك إدارة بصماتك بالكامل من لوحة التحكم. يمكنك إضافة بصمات جديدة، تعطيل أو حذف البصمات القديمة في أي وقت."
    },
    {
      question: "ما هي تكلفة الخدمة؟",
      answer: "نقدم خطط متعددة تناسب جميع الاحتياجات، بداية من خطة مجانية للأفراد إلى خطط مخصصة للمؤسسات. يمكنك الاطلاع على صفحة الأسعار للمزيد من التفاصيل."
    },
    {
      question: "هل هناك دعم فني متاح؟",
      answer: "نعم، نوفر دعم فني متاح 24/7 عبر البريد الإلكتروني والهاتف. كما نقدم دعم تقني مخصص لعملاء الخطط المؤسسية."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
          
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow-primary">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">الأسئلة الشائعة</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            إجابات على الأسئلة الأكثر شيوعاً حول نظام PalmSecure
          </p>
        </div>

        <div className="glass border-primary/20 rounded-2xl p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right hover:text-primary">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center glass border-primary/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-muted-foreground mb-6">
            فريق الدعم لدينا جاهز لمساعدتك في أي وقت
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>
            تواصل معنا
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
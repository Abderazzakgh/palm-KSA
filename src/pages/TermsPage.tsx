import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, FileText } from "lucide-react";

export default function TermsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "قبول الشروط",
      content: "باستخدامك لخدمات PalmSecure، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا."
    },
    {
      title: "الاستخدام المقبول",
      content: "يجب استخدام خدماتنا فقط للأغراض القانونية والمشروعة. يُحظر استخدام الخدمة لأي أنشطة غير قانونية أو احتيالية أو ضارة. يجب عليك الحفاظ على سرية بيانات حسابك ومنع الوصول غير المصرح به."
    },
    {
      title: "حساب المستخدم",
      content: "يجب أن تكون بعمر 18 عاماً على الأقل لإنشاء حساب. أنت مسؤول عن الحفاظ على سرية معلومات حسابك وجميع الأنشطة التي تحدث تحت حسابك. يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك."
    },
    {
      title: "الملكية الفكرية",
      content: "جميع حقوق الملكية الفكرية في الخدمة والتكنولوجيا المستخدمة مملوكة لـ PalmSecure. لا يحق لك نسخ أو تعديل أو توزيع أي جزء من خدماتنا دون إذن كتابي مسبق منا."
    },
    {
      title: "الدفع والفوترة",
      content: "رسوم الخدمة تُدفع وفقاً للخطة المختارة. جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك. نحتفظ بالحق في تغيير الأسعار مع إشعار مسبق مدته 30 يوماً."
    },
    {
      title: "إنهاء الخدمة",
      content: "نحتفظ بالحق في إيقاف أو إنهاء حسابك في أي وقت إذا انتهكت هذه الشروط. يمكنك إلغاء حسابك في أي وقت من خلال لوحة التحكم. عند الإنهاء، سيتم حذف جميع بياناتك وفقاً لسياسة الخصوصية."
    },
    {
      title: "إخلاء المسؤولية",
      content: "الخدمة مقدمة 'كما هي' دون أي ضمانات. لا نضمن أن الخدمة ستكون متاحة دائماً أو خالية من الأخطاء. نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الخدمة."
    },
    {
      title: "حدود المسؤولية",
      content: "لن تتجاوز مسؤوليتنا الإجمالية تجاهك، تحت أي ظرف، المبلغ الذي دفعته لنا خلال الـ 12 شهراً السابقة للحدث المسبب للمطالبة."
    },
    {
      title: "التعويض",
      content: "أنت توافق على تعويضنا والدفاع عنا ضد أي مطالبات أو خسائر أو أضرار ناتجة عن استخدامك للخدمة أو انتهاكك لهذه الشروط."
    },
    {
      title: "القانون الحاكم",
      content: "تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاعات ستُحل في المحاكم المختصة في الرياض."
    },
    {
      title: "التعديلات",
      content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية. استمرارك في استخدام الخدمة بعد التغييرات يعني موافقتك على الشروط المعدلة."
    },
    {
      title: "الاتصال",
      content: "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا عبر info@palmsecure.com أو من خلال صفحة الاتصال."
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
            <FileText className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">شروط الاستخدام</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            الشروط والأحكام التي تحكم استخدامك لخدمات PalmSecure
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="glass border-primary/20 rounded-2xl p-6 hover-lift">
              <h2 className="text-2xl font-bold gradient-text mb-4">
                {index + 1}. {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glass border-primary/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">لديك أسئلة حول شروط الاستخدام؟</h3>
          <p className="text-muted-foreground mb-6">
            فريقنا القانوني جاهز لمساعدتك في فهم هذه الشروط
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>
              تواصل معنا
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/privacy")}>
              سياسة الخصوصية
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
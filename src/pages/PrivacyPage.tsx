import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight, Shield } from "lucide-react";

export default function PrivacyPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "جمع المعلومات",
      content: "نقوم بجمع المعلومات الضرورية فقط لتقديم خدماتنا بشكل فعال. هذا يشمل بيانات بصمة الكف (المحولة إلى بيانات رياضية مشفرة)، معلومات الحساب الأساسية، وسجلات الاستخدام. لا نقوم أبداً بتخزين صور فعلية لراحة اليد."
    },
    {
      title: "استخدام المعلومات",
      content: "نستخدم المعلومات المجموعة لأغراض التحقق من الهوية، تحسين خدماتنا، ضمان أمان النظام، والامتثال للمتطلبات القانونية. لا نقوم ببيع أو مشاركة بياناتك مع أطراف ثالثة لأغراض تسويقية."
    },
    {
      title: "حماية البيانات",
      content: "نستخدم أحدث تقنيات التشفير (AES-256) لحماية بياناتك. جميع البيانات الحيوية محفوظة بشكل مشفر ولا يمكن إعادة بنائها أو استخدامها خارج نظامنا. نتبع أفضل الممارسات الأمنية العالمية ونخضع لمراجعات أمنية دورية."
    },
    {
      title: "حقوقك",
      content: "لديك الحق في الوصول إلى بياناتك، تعديلها، أو حذفها في أي وقت. يمكنك طلب نسخة من جميع البيانات المخزنة عنك. كما لديك الحق في سحب موافقتك على معالجة بياناتك في أي وقت."
    },
    {
      title: "الاحتفاظ بالبيانات",
      content: "نحتفظ بالبيانات الشخصية والحيوية طالما كان حسابك نشطاً. عند حذف حسابك، يتم حذف جميع البيانات بشكل دائم خلال 30 يوماً، باستثناء ما يتطلبه القانون للاحتفاظ به."
    },
    {
      title: "ملفات تعريف الارتباط",
      content: "نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الخدمة بشكل صحيح. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك، لكن تعطيلها قد يؤثر على وظائف بعض الميزات."
    },
    {
      title: "التغييرات على السياسة",
      content: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم إعلامك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار بارز على الموقع. ننصحك بمراجعة هذه الصفحة بشكل دوري."
    },
    {
      title: "الامتثال للقوانين",
      content: "نلتزم بجميع القوانين واللوائح المحلية والدولية المتعلقة بحماية البيانات، بما في ذلك اللائحة العامة لحماية البيانات (GDPR) وأنظمة حماية البيانات الشخصية في المملكة العربية السعودية."
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">سياسة الخصوصية</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="glass border-primary/20 rounded-2xl p-6 hover-lift">
              <h2 className="text-2xl font-bold gradient-text mb-4">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glass border-primary/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-3">لديك أسئلة حول سياسة الخصوصية؟</h3>
          <p className="text-muted-foreground mb-6">
            تواصل مع فريقنا القانوني للحصول على مزيد من المعلومات
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>
              تواصل معنا
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/faq")}>
              الأسئلة الشائعة
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
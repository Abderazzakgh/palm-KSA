import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم طويل جداً"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح").max(255, "البريد الإلكتروني طويل جداً"),
  phone: z.string().trim().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل").max(20, "رقم الهاتف طويل جداً"),
  subject: z.string().trim().min(3, "الموضوع يجب أن يكون 3 أحرف على الأقل").max(200, "الموضوع طويل جداً"),
  message: z.string().trim().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل").max(1000, "الرسالة طويلة جداً")
});

export default function ContactPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Create WhatsApp message
      const whatsappMessage = `*رسالة جديدة من موقع سافانا*%0A%0A*الاسم:* ${encodeURIComponent(validatedData.name)}%0A*البريد الإلكتروني:* ${encodeURIComponent(validatedData.email)}%0A*الهاتف:* ${encodeURIComponent(validatedData.phone)}%0A*الموضوع:* ${encodeURIComponent(validatedData.subject)}%0A%0A*الرسالة:*%0A${encodeURIComponent(validatedData.message)}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/966501234567?text=${whatsappMessage}`, '_blank');
      
      toast.success("تم فتح واتساب لإرسال رسالتك! 📱");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("يرجى تصحيح الأخطاء في النموذج");
      } else {
        toast.error("حدث خطأ أثناء الإرسال");
      }
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: "info@savanna.com",
      link: "mailto:info@savanna.com"
    },
    {
      icon: Phone,
      title: "الهاتف",
      value: "+966 50 123 4567",
      link: "tel:+966501234567"
    },
    {
      icon: MapPin,
      title: "العنوان",
      value: "الرياض، المملكة العربية السعودية",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">تواصل معنا</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاجه
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 glass border-primary/20 text-center hover-lift">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center shadow-glow-primary">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link}
                  className="text-sm text-primary hover:text-primary-glow transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">{info.value}</p>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-8 glass border-primary/20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold gradient-text mb-6">
            أرسل رسالتك
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسمك"
                  className="bg-background/50"
                />
                {errors.name && (
                  <p className="text-destructive text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="bg-background/50"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+966501234567"
                  className="bg-background/50"
                  dir="ltr"
                />
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الموضوع *</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع الرسالة"
                  className="bg-background/50"
                />
                {errors.subject && (
                  <p className="text-destructive text-xs mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الرسالة *</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب رسالتك هنا..."
                className="bg-background/50 min-h-[150px]"
              />
              {errors.message && (
                <p className="text-destructive text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              <Send className="w-4 h-4 ml-2" />
              {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
            </Button>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
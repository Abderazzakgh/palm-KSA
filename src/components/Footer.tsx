import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import savannaLogo from "@/assets/savanna-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/20 border-t border-border/30 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={savannaLogo} alt="سافانا" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold gradient-text">
                سافانا
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تقنية التحقق الأكثر تطوراً في العالم ببصمة الكف المتقدمة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#scanner" className="text-muted-foreground hover:text-primary transition-smooth">
                  المسح الضوئي
                </a>
              </li>
              <li>
                <a href="/#features" className="text-muted-foreground hover:text-primary transition-smooth">
                  الميزات
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-smooth">
                  لوحة التحكم
                </a>
              </li>
              <li>
                <a href="/auth" className="text-muted-foreground hover:text-primary transition-smooth">
                  تسجيل الدخول
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">الدعم</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  مركز المساعدة
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-smooth">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
                  شروط الاستخدام
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@savanna.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@savanna.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+966501234567" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Phone className="w-4 h-4 text-primary" />
                  <span dir="ltr">+966 50 123 4567</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center">
              © 2024 سافانا. جميع الحقوق محفوظة
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
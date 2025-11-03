import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User } from "lucide-react";
import savannaLogo from "@/assets/savanna-logo.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/");
      setIsMenuOpen(false);
    } catch (error: any) {
      toast.error("فشل تسجيل الخروج");
    }
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith("/#")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={savannaLogo} alt="سافانا" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                سافانا
              </h1>
              <p className="text-xs text-muted-foreground">التحقق بالكف</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/#scanner" className="text-foreground hover:text-primary transition-smooth">
              المسح الضوئي
            </a>
            <a href="/#features" className="text-foreground hover:text-primary transition-smooth">
              الميزات
            </a>
            
            {user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                  <User className="w-4 h-4 ml-2" />
                  لوحة التحكم
                </Button>
                <Button variant="hero" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>
                تسجيل الدخول
              </Button>
            )}
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] glass">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-3">
                    <img src={savannaLogo} alt="سافانا" className="w-10 h-10 rounded-xl" />
                    <span className="gradient-text">سافانا</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 mt-8">
                <button
                  onClick={() => handleNavClick("/#scanner")}
                  className="text-right text-foreground hover:text-primary transition-smooth py-2"
                >
                  المسح الضوئي
                </button>
                <button
                  onClick={() => handleNavClick("/#features")}
                  className="text-right text-foreground hover:text-primary transition-smooth py-2"
                >
                  الميزات
                </button>
                
                <div className="border-t border-border/30 pt-6 space-y-3">
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-end"
                        onClick={() => handleNavClick("/dashboard")}
                      >
                        <User className="w-4 h-4 ml-2" />
                        لوحة التحكم
                      </Button>
                      <Button 
                        variant="hero" 
                        className="w-full justify-end"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="hero" 
                      className="w-full justify-end"
                      onClick={() => handleNavClick("/auth")}
                    >
                      تسجيل الدخول
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
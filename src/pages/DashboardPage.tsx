import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Session } from "@supabase/supabase-js";
import { LogOut, User as UserIcon, Fingerprint, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatusBadge } from "@/components/StatusBadge";

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface PalmScan {
  id: string;
  scan_data: any;
  qr_code: string | null;
  image_url: string | null;
  status: string;
  verified_at: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [palmScans, setPalmScans] = useState<PalmScan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      const { data: scansData, error: scansError } = await supabase
        .from("palm_scans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (scansError) throw scansError;
      setPalmScans(scansData || []);
    } catch (error: any) {
      console.error("Error loading user data:", error);
      toast.error("فشل تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/");
    } catch (error: any) {
      toast.error("فشل تسجيل الخروج");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              لوحة التحكم
            </h1>
            <p className="text-muted-foreground">
              مرحباً، {profile?.full_name || user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 glass border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الملف الشخصي</p>
                <p className="text-xl font-bold">{profile?.full_name || "غير محدد"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">عدد البصمات</p>
                <p className="text-xl font-bold">{palmScans.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">البصمات النشطة</p>
                <p className="text-xl font-bold">
                  {palmScans.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 glass border-primary/20">
          <h2 className="text-2xl font-bold gradient-text mb-6">
            سجل البصمات
          </h2>

          {palmScans.length === 0 ? (
            <div className="text-center py-12">
              <Fingerprint className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">لا توجد بصمات مسجلة حتى الآن</p>
              <Button variant="hero" onClick={() => navigate("/")}>
                ابدأ بمسح بصمة يدك
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {palmScans.map((scan) => (
                <Card key={scan.id} className="p-4 bg-background/50 border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {scan.image_url ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20">
                          <img 
                            src={scan.image_url} 
                            alt="بصمة الكف" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Fingerprint className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">
                          بصمة #{scan.id.slice(0, 8)}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm text-muted-foreground">
                            {new Date(scan.created_at).toLocaleDateString('ar-SA', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(scan.created_at).toLocaleTimeString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {scan.status === 'active' && (
                        <StatusBadge status="success" text="نشط" />
                      )}
                      {scan.status === 'expired' && (
                        <StatusBadge status="warning" text="منتهي" />
                      )}
                      {scan.status === 'revoked' && (
                        <StatusBadge status="error" text="ملغي" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

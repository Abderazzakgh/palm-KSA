import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, CheckCircle, AlertCircle, Scan, RotateCcw, Fingerprint, Shield, Zap, Video, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { QRGenerator } from "./QRGenerator";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const Scanner = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState<'idle' | 'success' | 'failed'>('idle');
  const [scanPhase, setScanPhase] = useState<'capturing' | 'analyzing' | 'verifying' | 'complete'>('capturing');
  const [scanId, setScanId] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        toast.success("تم تشغيل الكاميرا ✅");
      }
    } catch (error: any) {
      console.error("Camera error:", error);
      toast.error("فشل تشغيل الكاميرا. تأكد من منح الإذن 📷");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.95);
  };

  const uploadImageToStorage = async (imageDataUrl: string): Promise<string | null> => {
    if (!user) return null;

    try {
      const base64Data = imageDataUrl.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      
      const fileName = `${user.id}/${Date.now()}.jpg`;
      
      const { data, error } = await supabase.storage
        .from('palm-scans')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('palm-scans')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("فشل رفع الصورة");
      return null;
    }
  };

  const resetScan = useCallback(() => {
    setIsScanning(false);
    setProgress(0);
    setScanResult('idle');
    setScanPhase('capturing');
    setCapturedImage(null);
    stopCamera();
  }, []);

  const saveScanToDatabase = async (scanData: any, imageUrl: string | null) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("palm_scans")
        .insert({
          user_id: user.id,
          scan_data: scanData,
          image_url: imageUrl,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error: any) {
      console.error("Error saving scan:", error);
      toast.error("فشل حفظ البصمة");
      return null;
    }
  };

  const handleScan = useCallback(async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    if (!isCameraActive) {
      await startCamera();
      return;
    }

    // Capture image from camera
    const imageData = captureImage();
    if (!imageData) {
      toast.error("فشل التقاط الصورة");
      return;
    }

    setCapturedImage(imageData);
    stopCamera();

    setIsScanning(true);
    setProgress(0);
    setScanResult('idle');
    setScanPhase('capturing');
    setScanId(null);
    
    // Upload image to storage
    toast.info("جاري رفع الصورة...");
    const imageUrl = await uploadImageToStorage(imageData);

    let currentProgress = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        currentProgress = prev + Math.random() * 12 + 3;
        
        if (currentProgress > 30 && scanPhase === 'capturing') {
          setScanPhase('analyzing');
        } else if (currentProgress > 70 && scanPhase === 'analyzing') {
          setScanPhase('verifying');
        }
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanPhase('complete');
          
          const success = Math.random() > 0.05;
          setScanResult(success ? 'success' : 'failed');
          
          if (success) {
            const mockScanData = {
              timestamp: new Date().toISOString(),
              patterns: Array(50).fill(0).map(() => Math.random()),
              quality: 0.95,
              captured: true
            };
            
            saveScanToDatabase(mockScanData, imageUrl).then(id => {
              if (id) {
                setScanId(id);
                toast.success("تم التحقق من الهوية بنجاح! ✅");
              }
            });
          } else {
            toast.error("فشل في التحقق. يرجى المحاولة مرة أخرى ❌");
          }
          
          return 100;
        }
        return currentProgress;
      });
    }, 120);
  }, [scanPhase, user, isCameraActive]);

  const getPhaseText = () => {
    switch (scanPhase) {
      case 'capturing': return 'جاري التقاط الصورة...';
      case 'analyzing': return 'تحليل الأنماط الحيوية...';
      case 'verifying': return 'التحقق من قاعدة البيانات...';
      case 'complete': return 'اكتمل التحليل';
      default: return 'جاري التحليل...';
    }
  };

  return (
    <section id="scanner" className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">ماسح بصمة الكف</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            تحقق من الهوية باستخدام أنماط الأوردة الفريدة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <Card className="p-6 glass border-primary/20 hover:border-primary/40 transition-all duration-300 group hover-lift">
            <div className="text-center">
              {/* Hidden video and canvas elements */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="hidden"
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className={`w-full h-full rounded-3xl border-4 transition-all duration-500 ${
                  scanResult === 'success' ? 'border-success shadow-glow-secondary' : 
                  scanResult === 'failed' ? 'border-destructive shadow-glow-accent' :
                  isScanning ? 'border-primary shadow-glow-primary animate-pulse-glow' :
                  isCameraActive ? 'border-primary shadow-glow-primary' : 'border-border/50'
                } bg-gradient-card flex items-center justify-center relative overflow-hidden`}>
                  
                  {/* Scanning Animation Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-60 animate-scan-line"></div>
                      <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                    </div>
                  )}
                  
                  {scanResult === 'success' && (
                    <div className="text-center animate-scale-in">
                      <CheckCircle className="w-16 h-16 text-success mx-auto mb-3" />
                      <div className="text-success font-semibold">تم التحقق بنجاح</div>
                    </div>
                  )}
                  
                  {scanResult === 'failed' && (
                    <div className="text-center animate-scale-in">
                      <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-3" />
                      <div className="text-destructive font-semibold">فشل التحقق</div>
                    </div>
                  )}
                  
                  {capturedImage && !isScanning && scanResult === 'idle' && (
                    <div className="relative w-full h-full">
                      <img 
                        src={capturedImage} 
                        alt="Captured palm" 
                        className="w-full h-full object-cover rounded-3xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl" />
                    </div>
                  )}

                  {isCameraActive && !capturedImage && (
                    <div className="text-center animate-pulse">
                      <Video className="w-16 h-16 text-primary mx-auto mb-3" />
                      <p className="text-primary font-medium">الكاميرا نشطة</p>
                      <p className="text-xs text-muted-foreground mt-1">اضغط مسح لالتقاط الصورة</p>
                    </div>
                  )}

                  {scanResult === 'idle' && !isScanning && !isCameraActive && !capturedImage && (
                    <div className="text-center group-hover:scale-105 transition-transform">
                      <Fingerprint className="w-20 h-20 text-primary/70 mx-auto mb-4 animate-float" />
                      <p className="text-muted-foreground font-medium">ضع راحة يدك هنا</p>
                      <p className="text-xs text-muted-foreground mt-2">للبدء في عملية المسح</p>
                    </div>
                  )}
                  
                  {isScanning && (
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                        <Scan className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-primary font-medium animate-pulse">{getPhaseText()}</p>
                    </div>
                  )}
                </div>
              </div>

              {isScanning && (
                <div className="mb-6 space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    {Math.round(progress)}% مكتمل - {getPhaseText()}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                {!isCameraActive && !capturedImage && (
                  <Button 
                    onClick={startCamera}
                    disabled={isScanning}
                    variant="hero"
                    size="lg"
                    className="group"
                  >
                    <Video className="w-4 h-4 ml-2" />
                    تشغيل الكاميرا
                  </Button>
                )}

                {isCameraActive && !capturedImage && (
                  <>
                    <Button 
                      onClick={handleScan}
                      disabled={isScanning}
                      variant="hero"
                      size="lg"
                      className="group"
                    >
                      <Camera className="w-4 h-4 ml-2" />
                      التقاط وتحليل
                    </Button>
                    <Button 
                      onClick={stopCamera}
                      variant="outline"
                      size="lg"
                    >
                      <VideoOff className="w-4 h-4 ml-2" />
                      إيقاف
                    </Button>
                  </>
                )}

                {capturedImage && !isScanning && (
                  <Button 
                    onClick={handleScan}
                    disabled={isScanning}
                    variant="hero"
                    size="lg"
                    className="group"
                  >
                    <Scan className="w-4 h-4 ml-2" />
                    {isScanning ? "جاري المسح..." : "بدء التحليل"}
                  </Button>
                )}
                
                {(scanResult !== 'idle' || capturedImage) && !isCameraActive && (
                  <Button 
                    onClick={resetScan}
                    variant="outline"
                    size="lg"
                    disabled={isScanning}
                  >
                    <RotateCcw className="w-4 h-4 ml-2" />
                    إعادة
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 glass border-primary/20">
              <h3 className="text-xl font-bold mb-4 gradient-text">
                كيف يعمل النظام؟
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-sm font-bold text-white">1</div>
                  <div>
                    <h4 className="font-semibold text-sm">مسح بصمة الكف</h4>
                    <p className="text-xs text-muted-foreground">تسجيل أنماط الأوردة الفريدة</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center text-sm font-bold text-white">2</div>
                  <div>
                    <h4 className="font-semibold text-sm">إنشاء QR كود</h4>
                    <p className="text-xs text-muted-foreground">ربط البصمة مع التطبيق</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center text-sm font-bold text-white">3</div>
                  <div>
                    <h4 className="font-semibold text-sm">التحقق الآمن</h4>
                    <p className="text-xs text-muted-foreground">مصادقة فورية وآمنة</p>
                  </div>
                </div>
              </div>
            </Card>

            {scanId && (
              <QRGenerator 
                userId={user?.id || ""}
                scanId={scanId}
                onGenerated={(qrData) => console.log("QR Generated:", qrData)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
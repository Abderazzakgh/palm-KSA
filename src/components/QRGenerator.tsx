import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Download, Share2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

interface QRGeneratorProps {
  userId?: string;
  scanId?: string;
  onGenerated?: (qrData: string) => void;
}

export const QRGenerator = ({ userId, scanId, onGenerated }: QRGeneratorProps) => {
  const [qrData, setQrData] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = async () => {
    if (!userId || !scanId) {
      toast.error("لا توجد بيانات بصمة متاحة");
      return;
    }
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const data = JSON.stringify({
      userId,
      scanId,
      timestamp: Date.now(),
      type: 'PALM_SCAN'
    });
    
    setQrData(data);
    setIsGenerating(false);
    
    if (onGenerated) {
      onGenerated(data);
    }
    
    toast.success("تم إنشاء QR كود بنجاح");
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `palm-qr-${scanId?.slice(0, 8)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("تم تنزيل رمز QR 📱");
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const shareQR = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'PalmSecure QR Code',
          text: 'رمز QR لبصمة الكف',
          url: window.location.href
        });
        toast.success("تم مشاركة رمز QR 📤");
      } else {
        await navigator.clipboard.writeText(qrData);
        toast.success("تم نسخ البيانات إلى الحافظة 📋");
      }
    } catch (error) {
      toast.error("فشل المشاركة");
    }
  };

  return (
    <Card className="p-6 glass border-primary/20 hover:border-primary/40 transition-all duration-300">
      <div className="text-center space-y-6">
        <div className="w-64 h-64 mx-auto border-2 border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-muted/30 p-4">
          {qrData ? (
            <div className="text-center animate-scale-in w-full">
              <div className="w-full bg-white p-4 rounded-xl mb-4 shadow-glow-primary">
                <QRCodeSVG 
                  id="qr-code-svg"
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">جاهز للاستخدام</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-3 animate-float" />
              <p className="text-muted-foreground text-sm">سيظهر رمز QR هنا</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">
            إنشاء رمز QR للربط
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            اربط بصمة الكف مع التطبيق باستخدام رمز QR فريد وآمن
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={generateQR}
            disabled={isGenerating}
            variant="hero"
            size="lg"
            className="w-full hover-lift"
          >
            <QrCode className="w-5 h-5 ml-2" />
            {isGenerating ? "جاري الإنشاء..." : "إنشاء رمز QR"}
          </Button>

          {qrData && (
            <div className="flex gap-3">
              <Button 
                onClick={downloadQR}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 ml-2" />
                تنزيل
              </Button>
              <Button 
                onClick={shareQR}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>
          )}
        </div>

        {qrData && (
          <div className="p-4 bg-muted/50 rounded-xl border border-border/30">
            <div className="text-xs text-muted-foreground mb-2">معرف الربط:</div>
            <div className="font-mono text-sm text-primary break-all">{qrData}</div>
          </div>
        )}
      </div>
    </Card>
  );
};
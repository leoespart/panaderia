
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
    url: string;
    size?: number;
    color?: string;
}

export function QRCodeDisplay({ url, size = 256, color = '#ffffff' }: QRCodeDisplayProps) {
    const qrRef = useRef<SVGSVGElement>(null);

    const downloadQRCode = () => {
        if (!qrRef.current) return;

        const svgData = new XMLSerializer().serializeToString(qrRef.current);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        // Add margin for the download if needed, or keep it tight.
        // SVG is scalable. fixing size for PNG export.
        canvas.width = size;
        canvas.height = size;

        img.onload = () => {
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "qr-code.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
            <div className="p-4 rounded-xl">
                <QRCodeSVG
                    ref={qrRef}
                    value={url}
                    size={size}
                    fgColor={color}
                    bgColor={"transparent"} // Transparent background as requested
                    level={"H"} // High error correction
                    includeMargin={false}
                />
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2 font-medium">Scan to visit website</p>
                <Button onClick={downloadQRCode} variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PNG
                </Button>
            </div>
        </div>
    );
}

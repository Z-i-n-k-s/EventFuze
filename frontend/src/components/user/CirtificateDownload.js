import React, { useRef, useState } from 'react';
import { Download, X, Award, Calendar } from 'lucide-react';

const CertificateDownload = ({ userName, eventTitle, onClose }) => {
  const certificateRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const generateSVG = () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 707" width="1000" height="707">
      <!-- Background with gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#ffd700;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d4af37;stop-opacity:1" />
        </linearGradient>
        <pattern id="subtlePattern" patternUnits="userSpaceOnUse" width="40" height="40">
          <rect width="40" height="40" fill="none"/>
          <circle cx="20" cy="20" r="1" fill="#e2e8f0" opacity="0.3"/>
        </pattern>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Main background -->
      <rect x="0" y="0" width="1000" height="707" fill="url(#bgGradient)"/>
      <rect x="0" y="0" width="1000" height="707" fill="url(#subtlePattern)"/>
      
      <!-- Outer border -->
      <rect x="20" y="20" width="960" height="667" fill="none" stroke="url(#borderGradient)" stroke-width="6" rx="10"/>
      
      <!-- Inner decorative border -->
      <rect x="50" y="50" width="900" height="607" fill="none" stroke="#d4af37" stroke-width="2" rx="5" opacity="0.7"/>
      
      <!-- Corner decorative elements -->
      <g stroke="#d4af37" stroke-width="2" fill="none">
        <!-- Top left -->
        <path d="M 80 80 L 120 80 M 80 80 L 80 120" stroke-linecap="round"/>
        <path d="M 90 90 L 110 90 M 90 90 L 90 110" stroke-linecap="round"/>
        
        <!-- Top right -->
        <path d="M 920 80 L 880 80 M 920 80 L 920 120" stroke-linecap="round"/>
        <path d="M 910 90 L 890 90 M 910 90 L 910 110" stroke-linecap="round"/>
        
        <!-- Bottom left -->
        <path d="M 80 627 L 120 627 M 80 627 L 80 587" stroke-linecap="round"/>
        <path d="M 90 617 L 110 617 M 90 617 L 90 597" stroke-linecap="round"/>
        
        <!-- Bottom right -->
        <path d="M 920 627 L 880 627 M 920 627 L 920 587" stroke-linecap="round"/>
        <path d="M 910 617 L 890 617 M 910 617 L 910 597" stroke-linecap="round"/>
      </g>
      
      <!-- Award icon at top -->
      <circle cx="500" cy="120" r="30" fill="#d4af37" opacity="0.1"/>
      <path d="M 485 105 L 500 95 L 515 105 L 510 120 L 500 125 L 490 120 Z" fill="#d4af37"/>
      <circle cx="500" cy="115" r="15" fill="none" stroke="#d4af37" stroke-width="2"/>
      
      <!-- Main title -->
      <text x="500" y="190" font-family="Georgia, serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#1e293b">
        CERTIFICATE
      </text>
      <text x="500" y="230" font-family="Georgia, serif" font-size="28" text-anchor="middle" fill="#64748b">
        of Completion
      </text>
      
      <!-- Decorative line -->
      <line x1="300" y1="260" x2="700" y2="260" stroke="url(#borderGradient)" stroke-width="3"/>
      
      <!-- Certificate text -->
      <text x="500" y="310" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#475569">
        This is to certify that
      </text>
      
      <!-- Name with underline -->
      <text x="500" y="370" font-family="Georgia, serif" font-size="42" font-weight="bold" text-anchor="middle" fill="#1e293b" font-style="italic">
        ${userName || 'Name'}
      </text>
      <line x1="200" y1="385" x2="800" y2="385" stroke="#d4af37" stroke-width="2"/>
      
      <!-- Achievement text -->
      <text x="500" y="430" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#475569">
        has successfully completed the course
      </text>
      
      <!-- Course title -->
      <text x="500" y="490" font-family="Georgia, serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1e293b">
        ${eventTitle || 'Course Title'}
      </text>
      <line x1="150" y1="505" x2="850" y2="505" stroke="#d4af37" stroke-width="2"/>
      
      <!-- Completion text -->
      <text x="500" y="545" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#475569">
        and has demonstrated proficiency in all required competencies
      </text>
      
      <!-- Date -->
      <text x="500" y="600" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#64748b">
        ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </text>
      
      <!-- Bottom decorative elements -->
      <g transform="translate(500,640)">
        <circle r="25" fill="none" stroke="#d4af37" stroke-width="2"/>
        <circle r="15" fill="none" stroke="#d4af37" stroke-width="1"/>
        <circle r="5" fill="#d4af37"/>
      </g>
    </svg>
  `;



  const downloadAsPNG = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Create a temporary div with the SVG
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateSVG();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1000px';
      tempDiv.style.height = '707px';
      document.body.appendChild(tempDiv);
      
      // Create canvas and draw SVG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1000 * 2; // 2x for better quality
      canvas.height = 707 * 2;
      
      const img = new Image();
      const svgBlob = new Blob([generateSVG()], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${eventTitle || 'Certificate'}_Certificate.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
          setIsDownloading(false);
        }, 'image/png', 1.0);
        
        URL.revokeObjectURL(url);
        document.body.removeChild(tempDiv);
      };
      
      img.onerror = () => {
        console.error('Failed to load SVG for PNG conversion');
        setIsDownloading(false);
        document.body.removeChild(tempDiv);
      };
      
      img.src = url;
    } catch (error) {
      console.error('Error generating PNG:', error);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Certificate Preview
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Preview and download your completion certificate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Certificate Preview */}
        <div className="p-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
            <div 
              ref={certificateRef}
              className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                dangerouslySetInnerHTML={{ __html: generateSVG() }}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Download Certificate
            </h3>
            
            <div className="max-w-md mx-auto">
              {/* PNG Download */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  PNG Format
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  High-quality image, perfect for sharing and printing
                </p>
                <button
                  onClick={downloadAsPNG}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? 'Generating...' : 'Download Certificate'}
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Certificate Details
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Recipient:</strong> {userName || 'Name not provided'}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Course:</strong> {eventTitle || 'Course title not provided'}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDownload;
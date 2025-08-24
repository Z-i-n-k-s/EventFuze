import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const CertificateDownload = ({ userName, eventTitle, onClose }) => {
  const certificateRef = useRef();

  const generateSVG = () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect x="10" y="10" width="780" height="580" fill="#f9f9f9" stroke="#d4af37" stroke-width="3"/>
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4af37" stroke-width="1"/>
      <text x="400" y="80" font-family="Times New Roman, serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#333">Certificate of Completion</text>
      <text x="400" y="150" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#333">This is to certify that</text>
      <text x="400" y="200" font-family="Times New Roman, serif" font-size="30" font-style="italic" font-weight="bold" text-anchor="middle" fill="#333">${userName}</text>
      <text x="400" y="260" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#333">has successfully completed the course</text>
      <text x="400" y="310" font-family="Times New Roman, serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">${eventTitle}</text>
      <text x="400" y="370" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#333">with all requirements fulfilled</text>
    </svg>
  `;

  const handleDownloadPNG = async () => {
    const svgNode = certificateRef.current;
    if (!svgNode) return;

    const canvas = await html2canvas(svgNode, { backgroundColor: null });
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${eventTitle}_Certificate.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Certificate Preview</h2>

        {/* SVG Preview */}
        <div
          ref={certificateRef}
          dangerouslySetInnerHTML={{ __html: generateSVG() }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDownloadPNG}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
          >
            Download as PNG
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl font-medium transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateDownload;

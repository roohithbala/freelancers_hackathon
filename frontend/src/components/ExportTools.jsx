import React from 'react';
import { Download, FileText, Presentation } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportTools = ({ blueprintRef, markdownContent, title }) => {

    const handleExportPDF = async () => {
        if (!blueprintRef.current) return;

        try {
            const canvas = await html2canvas(blueprintRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0f172a' // match slate-900
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${title || 'project-blueprint'}.pdf`);
        } catch (err) {
            console.error("PDF Export failed", err);
            alert("Failed to export PDF provided ref is possibly null or too large.");
        }
    };

    const handleExportReadme = () => {
        const element = document.createElement("a");
        const file = new Blob([markdownContent], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "README.md";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="flex space-x-4 mt-8 print:hidden">
            <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all font-medium text-sm"
            >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
            </button>

            <button
                onClick={handleExportReadme}
                className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all font-medium text-sm"
            >
                <FileText className="w-4 h-4 mr-2" />
                Download README.md
            </button>

            <button
                // Placeholder for future slide generator
                className="flex items-center px-4 py-2 bg-slate-800/50 text-slate-500 rounded-lg border border-slate-800 cursor-not-allowed font-medium text-sm"
                disabled
            >
                <Presentation className="w-4 h-4 mr-2" />
                Slides (Coming Soon)
            </button>
        </div>
    );
};

export default ExportTools;

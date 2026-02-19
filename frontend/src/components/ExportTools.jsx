import React from 'react';
import { Download, FileText, Presentation, ChevronRight, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportTools = ({ blueprintRef, markdownContent, title }) => {

    const handleExportPDF = async () => {
        if (!blueprintRef.current) return;

        try {
            const canvas = await html2canvas(blueprintRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#050508' // Using the brand background color
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${title || 'project-blueprint'}.pdf`);
        } catch (err) {
            console.error("PDF Export failed", err);
            alert("Failed to export PDF. The content might be too complex or the reference is invalid.");
        }
    };

    const handleExportReadme = () => {
        const element = document.createElement("a");
        const file = new Blob([markdownContent], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "README.md";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="flex flex-wrap gap-4 print:hidden">
            <button
                onClick={handleExportPDF}
                className="flex items-center space-x-3 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-primary/50 text-white rounded-2xl transition-all font-bold text-xs uppercase tracking-widest group"
            >
                <Download className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                <span>Export PDF</span>
            </button>

            <button
                onClick={handleExportReadme}
                className="flex items-center space-x-3 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-primary/50 text-white rounded-2xl transition-all font-bold text-xs uppercase tracking-widest group"
            >
                <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                <span>README.MD</span>
            </button>

            <button
                className="flex items-center space-x-3 px-6 py-3 bg-white/[0.02] text-slate-600 border border-white/5 rounded-2xl cursor-not-allowed font-bold text-xs uppercase tracking-widest"
                disabled
            >
                <Presentation className="w-4 h-4 opacity-50" />
                <span>Slides (Waitlisted)</span>
            </button>
        </div>
    );
};

export default ExportTools;

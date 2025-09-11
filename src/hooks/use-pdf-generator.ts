
"use client";

import { useState, useRef, ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async (component: ReactElement, filename: string) => {
    setIsGenerating(true);

    const docContainer = document.createElement('div');
    docContainer.style.position = 'fixed';
    docContainer.style.left = '-9999px';
    docContainer.style.top = '0';
    docContainer.innerHTML = renderToStaticMarkup(component);
    document.body.appendChild(docContainer);

    const elementToCapture = docContainer.firstChild as HTMLElement;
    if (!elementToCapture) {
      console.error("PDF generation failed: No element to capture.");
      setIsGenerating(false);
      document.body.removeChild(docContainer);
      return;
    }
    
    try {
      const canvas = await html2canvas(elementToCapture, {
          scale: 2, // Augmente la résolution
          useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth;
      let imgHeight = imgWidth / ratio;
      
      if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = imgHeight * ratio;
      }

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);

    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsGenerating(false);
        document.body.removeChild(docContainer);
    }
  };

  return { isGenerating, generatePDF };
}

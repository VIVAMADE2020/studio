
"use client";

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async (filename: string, elementId = 'pdf-preview') => {
    setIsGenerating(true);

    const elementToCapture = document.getElementById(elementId);
    if (!elementToCapture) {
      console.error(`PDF generation failed: Element with id "${elementId}" not found.`);
      setIsGenerating(false);
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

      // Add a small margin
      const margin = 5;
      const effectiveWidth = pdfWidth - (margin * 2);
      const effectiveHeight = pdfHeight - (margin * 2);

      let finalWidth = effectiveWidth;
      let finalHeight = finalWidth / ratio;
      
      if (finalHeight > effectiveHeight) {
          finalHeight = effectiveHeight;
          finalWidth = finalHeight * ratio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;


      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(filename);

    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsGenerating(false);
    }
  };

  return { isGenerating, generatePDF };
}

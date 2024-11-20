import axios from "axios";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const fetchAndFillCertificate = async (
    pdfUrl,
    name,
    surname,
    certY,
    certText,
    watermark
  ) => {
    try {
      const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      const pdfBytes = response.data;
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const fontUrl =
        "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";
      const page = pdfDoc.getPages()[0];
      const text = `${name} ${surname}`;
      const fontSize = certText;
      const { width, height } = page.getSize();
      const svgText = createTextSVG(
        text,
        fontUrl,
        fontSize,
        width,
        height,
        certY,
        "black"
      );
      const pngBytes = await convertSvgToPng(svgText, width, height);
      const pngImage = await pdfDoc.embedPng(pngBytes);
      page.drawImage(pngImage);
      const modifiedPdfBytes = await pdfDoc.save();
      if (watermark) {
        const watermarkPdfBytes = await waterMark(modifiedPdfBytes);
        return URL.createObjectURL(new Blob([watermarkPdfBytes], { type: "application/pdf" }));
      }
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error processing PDF:", error);
      return null;
    }
  };

  export const waterMark = async (pdfBytes) => {
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const fontUrl =
        "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";
      const page = pdfDoc.getPages()[0];
      const text = "ตัวอย่าง";
      const fontSize = 150;
      const { width, height } = page.getSize();
      const certY = 50;
      const svgText = createTextSVG(
        text,
        fontUrl,
        fontSize,
        width,
        height,
        certY,
        "rgba(0, 0, 0, 0.4)"
      );
      const pngBytes = await convertSvgToPng(svgText, width, height);
      const pngImage = await pdfDoc.embedPng(pngBytes);
      page.drawImage(pngImage);
      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error processing PDF:", error);
      return null;
    }
  };

export const convertSvgToPng = (svgText, width, height) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const svgBlob = new Blob([svgText], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                        URL.revokeObjectURL(url);
                    };
                    reader.readAsArrayBuffer(blob);
                } else {
                    reject(new Error("Canvas to Blob conversion failed"));
                }
            }, "image/png");
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = url;
    });
};

export const createTextSVG = (text, fontUrl, fontSize, width, height, y, color) => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <style>
        @font-face {
          font-family: 'Noto Sans Thai';
          src: url('https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtlyJ0QCvz.woff2');
        } .text {
            font-family: 'Noto Sans Thai', sans-serif;
            font-size: ${fontSize}px;
            fill: ${color};
          }
        </style>
        <text x="50%" y="${y}%" text-anchor="middle" alignment-baseline="middle" class="text">${text}</text>
      </svg>
    `;
};

export const sampleSetNameOnCertificate = async (pdfUrl, size, y) => {
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfBytes = response.data;
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const fontUrl =
      "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

    const page = pdfDoc.getPages()[0];
    const text = "ชื่อจริง นามสกุล";
    const fontSize = `${size}`;
    const textY = `${y}`;
    const { width, height } = page.getSize();
    const svgText = createTextSVG(
      text,
      fontUrl,
      fontSize,
      width,
      height,
      textY
    );
    const pngBytes = await convertSvgToPng(svgText, width, height);
    const pngImage = await pdfDoc.embedPng(pngBytes);
    page.drawImage(pngImage);
    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
  } catch (error) {
    console.error("Error processing PDF:", error);
    return null;
  }
};
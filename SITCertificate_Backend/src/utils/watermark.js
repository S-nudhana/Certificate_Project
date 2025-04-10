import axios from "axios";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { promises as fs } from "fs";
import sharp from "sharp";

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
      return URL.createObjectURL(
        new Blob([watermarkPdfBytes], { type: "application/pdf" })
      );
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

export const convertSvgToPng = async (svgText, width, height) => {
  try {
    const svgBuffer = Buffer.from(svgText);
    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);
    const pngBuffer = await sharp(svgBuffer)
      .resize(roundedWidth, roundedHeight)
      .png()
      .toBuffer();
    return pngBuffer;
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    throw error;
  }
};

export const createTextSVG = (
  text,
  fontUrl,
  fontSize,
  width,
  height,
  y,
  color = "black"
) => {
  try {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <style>
          @font-face {
            font-family: 'Noto Sans Thai';
            src: url('${fontUrl}');
          }
          .text {
            font-family: 'Noto Sans Thai', sans-serif;
            font-size: ${fontSize}px;
            fill: ${color};
          }
          </style>
          <text x="50%" y="${y}%" text-anchor="middle" alignment-baseline="middle" class="text">${text}</text>
        </svg>
      `;
  } catch (error) {
    console.error("Error creating SVG:", error);
    throw error;
  }
};

export const sampleSetNameOnCertificate = async (pdfPath, size, y) => {
  try {
    const pdfBytes = await fs.readFile(pdfPath);
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

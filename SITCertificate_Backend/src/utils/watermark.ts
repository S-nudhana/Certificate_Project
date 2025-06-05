import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { promises as fs } from "fs";
import sharp from "sharp";

export const fetchAndFillCertificate = async (
  pdfUrl: string,
  name: string,
  surname: string,
  certY: number,
  certText: number,
  watermark: boolean
): Promise<Buffer | null> => {
  try {
    const pdfBytes = await fs.readFile(pdfUrl);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontUrl =
      "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

    const page = pdfDoc.getPages()[0];
    const text = `${name} ${surname}`;
    const fontSize = certText;
    const { width, height } = page.getSize();

    const svgText = createTextSVG(text, fontUrl, fontSize, width, height, certY);
    const pngBytes = await convertSvgToPng(svgText, width, height);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    page.drawImage(pngImage);
    const modifiedPdfBytes = await pdfDoc.save();

    if (watermark) {
      const watermarkPdfBytes = await WaterMark(modifiedPdfBytes);
      if (watermarkPdfBytes === null) {
        return null;
      }
      return Buffer.from(watermarkPdfBytes);
    }

    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error("Error processing PDF:", error);
    return null;
  }
};

export const WaterMark = async (pdfBytes: Uint8Array): Promise<Buffer | null> => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontUrl =
      "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

    const page = pdfDoc.getPages()[0];
    const text = "ตัวอย่าง";
    const fontSize = 180;
    const { width, height } = page.getSize();
    const certY = 55;

    const svgText = createTextSVG(text, fontUrl, fontSize, width, height, certY, "rgba(0, 0, 0, 0.4)");
    const pngBytes = await convertSvgToPng(svgText, width, height);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    page.drawImage(pngImage);
    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error("Error adding watermark:", error);
    return null;
  }
};

export const convertSvgToPng = async (
  svgText: string,
  width: number,
  height: number
): Promise<Buffer> => {
  try {
    const svgBuffer = Buffer.from(svgText);
    const pngBuffer = await sharp(svgBuffer)
      .resize(Math.round(width), Math.round(height))
      .png()
      .toBuffer();
    return pngBuffer;
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    throw error;
  }
};

export const createTextSVG = (
  text: string,
  fontUrl: string,
  fontSize: number | string,
  width: number,
  height: number,
  y: number | string,
  color: string = "black"
): string => {
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
};

export const sampleSetNameOnCertificate = async (
  pdfPath: string,
  size: number,
  y: number
): Promise<Buffer | null> => {
  try {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontUrl =
      "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

    const page = pdfDoc.getPages()[0];
    const text = "ชื่อจริง นามสกุล";
    const fontSize = size;
    const { width, height } = page.getSize();

    const svgText = createTextSVG(text, fontUrl, fontSize, width, height, y);
    const pngBytes = await convertSvgToPng(svgText, width, height);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    page.drawImage(pngImage);
    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error("Error setting sample name:", error);
    return null;
  }
};

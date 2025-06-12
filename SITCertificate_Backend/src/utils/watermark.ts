import { PDFDocument, rgb } from "pdf-lib";
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

    const fontBytes = await fs.readFile("./fonts/NotoSansThai-Regular.ttf");
    const thaiFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];
    const text = `${name} ${surname}`;
    const fontSize = certText;
    const { width, height } = page.getSize();

    const textWidth = thaiFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = height * (certY / 100);

    page.drawText(text, {
      x: x,
      y: y,
      size: fontSize,
      font: thaiFont,
      color: rgb(0, 0, 0),
    });

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

    const fontBytes = await fs.readFile("./fonts/NotoSansThai-Regular.ttf");
    const thaiFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];
    const text = "ตัวอย่าง";
    const fontSize = 180;
    const { width, height } = page.getSize();

    const textWidth = thaiFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = height * 0.5;

    page.drawText(text, {
      x: x,
      y: y,
      size: fontSize,
      font: thaiFont,
      color: rgb(0, 0, 0),
      opacity: 0.4,
    });

    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error("Error adding watermark:", error);
    return null;
  }
};

export const createTextSVGImproved = async (
  text: string,
  fontSize: number | string,
  width: number,
  height: number,
  y: number | string,
  color: string = "black"
) => {
  try {
    const fontBytes = await fs.readFile("./fonts/NotoSansThai-Regular.ttf");
    const base64Font = Buffer.from(fontBytes).toString('base64');
    
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <style>
            <![CDATA[
            @font-face {
              font-family: 'NotoSansThai';
              src: url('data:font/truetype;charset=utf-8;base64,${base64Font}') format('truetype');
              font-display: block;
            }
            .thai-text {
              font-family: 'NotoSansThai', 'Noto Sans Thai', sans-serif;
              font-size: ${fontSize}px;
              fill: ${color};
              text-rendering: optimizeLegibility;
              font-feature-settings: "liga" 1, "kern" 1;
            }
            ]]>
          </style>
        </defs>
        <text x="50%" y="${y}%" text-anchor="middle" dominant-baseline="central" class="thai-text">${text}</text>
      </svg>
    `;
  } catch (error) {
    console.error("Error creating improved SVG:", error);
    throw error;
  }
};

export const convertSvgToPng = async (
  svgText: string,
  width: number,
  height: number
): Promise<Buffer> => {
  try {
    const svgBuffer = Buffer.from(svgText, 'utf8');
    const pngBuffer = await sharp(svgBuffer, {
      density: 300
    })
      .resize(Math.round(width), Math.round(height))
      .png({
        compressionLevel: 6,
        adaptiveFiltering: true
      })
      .toBuffer();
    return pngBuffer;
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    throw error;
  }
};

export const sampleSetNameOnCertificate = async (
  pdfPath: string,
  size: number | string,
  y: number
): Promise<Buffer | null> => {
  try {
    const fontSize = typeof size === "string" ? parseFloat(size) : size;
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fs.readFile("./fonts/NotoSansThai-Regular.ttf");
    const thaiFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];
    const text = "ชื่อ นามสกุล";
    const { width, height } = page.getSize();

    const textWidth = thaiFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const yPos = height * (y / 100);

    page.drawText(text, {
      x: x,
      y: yPos,
      size: fontSize,
      font: thaiFont,
      color: rgb(0, 0, 0),
    });

    const modifiedPdfBytes = await pdfDoc.save();
    return Buffer.from(modifiedPdfBytes);
  } catch (error) {
    console.error("Error setting sample name:", error);
    return null;
  }
};

export const validateThaiFont = async (): Promise<boolean> => {
  try {
    const fontBytes = await fs.readFile("./fonts/NotoSansThai-Regular.ttf");
    return fontBytes.length > 0;
  } catch (error) {
    console.error("Thai font file not found or invalid:", error);
    return false;
  }
};

export const fetchAndFillCertificateWithSVG = async (
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

    const page = pdfDoc.getPages()[0];
    const text = `${name} ${surname}`;
    const fontSize = certText;
    const { width, height } = page.getSize();

    const svgText = await createTextSVGImproved(text, fontSize, width, height, certY);
    const pngBytes = await convertSvgToPng(svgText, width, height);
    const pngImage = await pdfDoc.embedPng(pngBytes);

    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });

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
    console.error("Error processing PDF with SVG:", error);
    return null;
  }
};
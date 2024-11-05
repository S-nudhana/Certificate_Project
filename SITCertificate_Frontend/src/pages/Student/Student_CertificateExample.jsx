import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import PDF from "react-pdf-watermark";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authMiddleware from "../../middleware/authMiddleware";
import { uploadFile } from "../../api/firebaseAPI";

import fontkit from "@pdf-lib/fontkit";

import {
  studentGenerate,
  updateStudentGenerateStatus,
  studentCertificate,
  generateStudentCertificateInfo,
} from "../../api/student/studentAPI";

function Student_CertificateExample() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { name, surname, email } = location.state || {};
  const [certificate, setCertificate] = useState();
  // State to hold the Blob URL for the PDF preview
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [certificateY, setCertificateY] = useState(null);
  const [certificateTextSize, setCertificateTextSize] = useState(null);
  const [eventName, setEventName] = useState(null); 
  const getCertificate = async () => {
    try {
      const response = await studentCertificate(id);
      const certificateUrl = response.data.data.event_Certificate;
      setCertificate(certificateUrl);
      setCertificateY(response.data.data.event_certificate_position_y);
      setCertificateTextSize(response.data.data.event_certificate_text_size);
      setEventName(response.data.data.event_name);
      console.log(response)
      if(response.status === 200){
        const modifiedPdfBytes = await fetchAndFillCertificate(
          certificateUrl,
          name,
          surname,
          response.data.data.event_certificate_position_y,
          response.data.data.event_certificate_text_size
        );
        if (modifiedPdfBytes) {
          const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
          const blobUrl = URL.createObjectURL(blob);
          setPdfPreviewUrl(blobUrl);
        }
      }

      // Create Blob URL for preview and set it in state
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };
  const fetchAndFillCertificate = async (pdfUrl, name, surname, certY, certText) => {
    try {
      // Fetch PDF template
      const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      const pdfBytes = response.data;

      // Load the PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.registerFontkit(fontkit);

      // Load the Noto Sans Thai font
      const fontUrl =
        "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

      const page = pdfDoc.getPages()[0];
      const text = `${name} ${surname}`;
      // const fontSize = `${certText}`;
      const fontSize = 40;
      const { width, height } = page.getSize();
      // Create SVG
      const svgText = createTextSVG(text, fontUrl, fontSize, width, height, certY);

      // Create an Image from SVG using a Canvas
      const pngBytes = await convertSvgToPng(svgText, width, height);

      // Embed the PNG in the PDF
      const pngImage = await pdfDoc.embedPng(pngBytes);

      page.drawImage(pngImage);

      // Save the modified PDF as bytes
      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error processing PDF:", error);
      return null;
    }
  };

  // Function to convert SVG to PNG using a Canvas
  const convertSvgToPng = (svgText, width, height) => {
    return new Promise((resolve, reject) => {
      // Create an image element
      const img = new Image();
      const svgBlob = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Create a canvas to draw the image
        const canvas = document.createElement("canvas");
        canvas.width = width; // Adjust width as necessary
        canvas.height = height; // Adjust height as necessary
        const ctx = canvas.getContext("2d");

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result); // Resolve with the PNG byte array
              URL.revokeObjectURL(url); // Clean up URL object
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

      img.src = url; // Start loading the SVG as an image
    });
  };

  // Function to create SVG
  const createTextSVG = (text, fontUrl, fontSize, width, height,y) => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <style>
        @font-face {
          font-family: 'Noto Sans Thai';
          src: url('https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtlyJ0QCvz.woff2');
        } .text {
            font-family: 'Noto Sans Thai', sans-serif;
            font-size: ${fontSize}px;
            fill: black;
          }
        </style>
        <text x="50%" y="${y}%" text-anchor="middle" alignment-baseline="middle" class="text">${text}</text>
      </svg>
    `;
  };

  const getStudentGenerate = async () => {
    const response = await studentGenerate(id);
    if (!response.data.data) {
      navigate(`/detail/${id}`);
    }
  };
  const handleSubmit = async () => {
    try {
      const modifiedPdfBytes = await fetchAndFillCertificate(
        certificate,
        name,
        surname,
        certificateY,
        certificateTextSize
      );
      

      // Convert PDF bytes to a Blob
      const pdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      // Upload the Blob to Firebase, specifying the filename as `id_certificate.pdf`
      const uploadedModifiedPdf = await firebaseUploadFile(
        pdfBlob,
        "upload_Certificate",
        `${eventName}_${name}_${surname}_certificate.pdf`
      );
      const response = await generateStudentCertificateInfo(
        id,
        name,
        surname,
        email,
        uploadedModifiedPdf
      );
      const resStatus = await updateStudentGenerateStatus(id);

      if (response.data.success) {
        navigate(`/download/${id}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const firebaseUploadFile = async (fileBlob, folder, filename) => {
    // Set a custom name property on the Blob for the desired filename
    fileBlob.name = filename;

    // Call uploadFile with the Blob and folder path
    const response = await uploadFile(fileBlob, folder);
    return response;
  };

  useEffect(() => {
    getCertificate();
    getStudentGenerate();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box
        pt="80px"
        minH={"80vh"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Text pb={"20px"} fontSize="32px" fontWeight="bold" pt="40px">
          ตัวอย่างใบประกาศนียบัตร
        </Text>

        <Flex width={{ base: "150%", md: "100%" }} justifyContent={"center"}>
          {pdfPreviewUrl ? (
       <PDF
       canvasWidth={"50%"}
       canvasHeight={"auto"}
       file={pdfPreviewUrl}
       watermark={"SITCertificate"}
       watermarkOptions={{
         transparency: 0.5,
         fontSize: 140,
         fontStyle: "Bold",
       }}
     />
          ) : (
            <Text>Loading PDF preview...</Text>
          )}
        </Flex>
        <Box
          pt={"20px"}
          width="80%"
          display="flex"
          justifyContent="space-between"
          pb="40px"
        >
          <Button
            width="100px"
            bgColor="#3399cc"
            color="white"
            borderRadius="40px"
            fontSize={{ base: "14px", md: "16px" }}
            _hover={{ bgColor: "#297AA3" }}
            variant="solid"
            onClick={() => {
              navigate(-1);
            }}
          >
            ย้อนกลับ
          </Button>
          <Button
            width="200px"
            bgColor="#336699"
            color="white"
            borderRadius="40px"
            fontSize={{ base: "14px", md: "16px" }}
            _hover={{ bgColor: "#1f568c" }}
            variant="solid"
            onClick={onOpen}
          >
            พิมพ์ใบประกาศนียบัตร
          </Button>
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["xs", "md", "md"]}
      >
        <ModalOverlay />
        <ModalContent py={["5", "7", "7"]}>
          <ModalHeader
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={{ base: "16px", md: "20px" }}
          >
            ยืนยันที่จะพิมพ์ใบประกาศนียบัตรหรือไม่?
          </ModalHeader>
          <ModalBody textAlign={"center"}>
            <Text pb={"7"} fontSize={{ base: "14px", md: "16px" }}>
              ระบบจะส่งใบประกาศนียบัตรไปยังอีเมล {email} <br />{" "}
              กรุณาตรวจสอบชื่อจริง นามสกุลและอีเมลของท่าน <br />{" "}
              เมื่อกดยืนยันแล้วจะไม่สามารถกลับมาแก้ไขได้
            </Text>
            <Flex justifyContent="center">
              <Button
                mr={3}
                color="white"
                backgroundColor={"#AD3D3B"}
                _hover={{ bgColor: "#A80324" }}
                borderRadius={"30"}
                onClick={onClose}
              >
                ยกเลิก
              </Button>
              <Button
                color="white"
                backgroundColor={"#336699"}
                borderRadius={"30"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                ตกลง
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  );
}
export default authMiddleware(Student_CertificateExample);

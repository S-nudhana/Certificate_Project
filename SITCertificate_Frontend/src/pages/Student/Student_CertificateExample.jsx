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
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
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

  const getCertificate = async () => {
    try {
      const response = await studentCertificate(id);
      const certificateUrl = response.data.data.event_Certificate;
      console.log(response.data.data.event_Certificate);
      setCertificate(certificateUrl);
      const modifiedPdfBytes = await fetchAndFillCertificate(
        certificateUrl,
        name,
        surname
      );

      // Create Blob URL for preview and set it in state
      if (modifiedPdfBytes) {
        const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        setPdfPreviewUrl(blobUrl);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  const fetchAndFillCertificate = async (pdfUrl, name, surname) => {
    try {
      // Fetch PDF template
      const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      const pdfBytes = response.data;
  
      // Load the PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);
  
      // Register fontkit to enable custom font loading
      pdfDoc.registerFontkit(fontkit);
  
      // Load the Noto Sans Thai font
      const fontUrl =
        "https://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf";
      const fontResponse = await axios.get(fontUrl, { responseType: "arraybuffer" });
      const fontBytes = fontResponse.data;
  
      // Embed the font in the PDF
      const font = await pdfDoc.embedFont(fontBytes);
  
      const page = pdfDoc.getPages()[0];
      const text = `${name} ${surname}`;
      const fontSize = 30;
  
      const { width, height } = page.getSize();
  
      // Calculate the text width and center position
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const x = (width - textWidth) / 2;
  
      // Draw the text on the PDF page
      page.drawText(text, {
        x: x,
        y: height - 280,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
  
      // Save the modified PDF as bytes
      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error processing PDF:", error);
      return null;
    }
  };

  const getStudentGenerate = async () => {
    const response = await studentGenerate(id);
    if (!response.data.data) {
      navigate(`/detail/${id}`);
    }
  };
  const handleSubmit = async () => {
    try {
      const modifiedPdfBytes = await fetchAndFillCertificate(certificate, name, surname);
      
      // Convert PDF bytes to a Blob
      const pdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      
      // Upload the Blob to Firebase, specifying the filename as `id_certificate.pdf`
      const uploadedModifiedPdf = await firebaseUploadFile(pdfBlob, "upload_Certificate", `${id}_certificate.pdf`);
      const response = await generateStudentCertificateInfo(id, name, surname, email, uploadedModifiedPdf);
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
                fontFamily: "Arial",
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

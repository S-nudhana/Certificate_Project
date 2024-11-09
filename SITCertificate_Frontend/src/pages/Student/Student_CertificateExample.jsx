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
import fontkit from "@pdf-lib/fontkit";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  createTextSVG,
  convertSvgToPng,
} from "../../components/embedNameOnCertificate";
import PdfViewer from "../../components/PdfViewer";

import { uploadFile } from "../../api/user/userAPI";

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
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [certificateY, setCertificateY] = useState(null);
  const [certificateTextSize, setCertificateTextSize] = useState(null);
  const [eventName, setEventName] = useState(null);

  const getCertificate = async () => {
    try {
      const response = await studentCertificate(id);
      const certificateUrl =
        import.meta.env.VITE_REACT_APP_URL +
        response.data.data.event_Certificate;
      setCertificate(certificateUrl);
      setCertificateY(response.data.data.event_certificate_position_y);
      setCertificateTextSize(response.data.data.event_certificate_text_size);
      setEventName(response.data.data.event_name);
      if (response.status === 200) {
        const modifiedPdfBytes = await fetchAndFillCertificate(
          certificateUrl,
          name,
          surname,
          response.data.data.event_certificate_position_y,
          response.data.data.event_certificate_text_size
        );
        if (modifiedPdfBytes) {
          const blob = new Blob([modifiedPdfBytes], {
            type: "application/pdf",
          });
          const blobUrl = URL.createObjectURL(blob);
          setPdfPreviewUrl(blobUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };
  const fetchAndFillCertificate = async (
    pdfUrl,
    name,
    surname,
    certY,
    certText
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
      const fontSize = 40;
      const { width, height } = page.getSize();
      const svgText = createTextSVG(
        text,
        fontUrl,
        fontSize,
        width,
        height,
        certY
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

  const getStudentGenerate = async () => {
    try {
      const response = await studentGenerate(id);
      if (!response.data.data) {
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.error("Error fetching student generate:", error);
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
      const filename = `${eventName}_${name}_${surname}_certificate.pdf`;
      const pdfFile = new File([modifiedPdfBytes], filename, {
        type: "application/pdf",
      });
      const uploadPDFFile = await uploadFile(
        pdfFile,
        "upload_generatedCertificate"
      );
      const response = await generateStudentCertificateInfo(
        id,
        name,
        surname,
        email,
        uploadPDFFile.data.file.filePath
      );
      const resStatus = await updateStudentGenerateStatus(id);
      if (response.status === 200 && resStatus.status === 200) {
        navigate(`/download/${id}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
export default Student_CertificateExample;

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

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PdfViewer from "../../components/PdfViewer";

import { uploadFile, fetchCertificate } from "../../services/apis/userAPI";
import {
  studentGenerate,
  updateStudentGenerateStatus,
  studentCertificate,
  generateStudentCertificateInfo,
} from "../../services/apis/studentAPI";

import { fetchAndFillCertificate } from "../../utils/embedNameOnCertificate";

function Student_CertificateExample() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, surname, email } = location.state || {};

  const [certificate, setCertificate] = useState();
  const [pdfWatermarkUrl, setPdfWatermarkUrl] = useState(null);
  const [certificateY, setCertificateY] = useState(null);
  const [certificateTextSize, setCertificateTextSize] = useState(null);
  const [eventName, setEventName] = useState(null);

  const getCertificate = async () => {
    let certificateBlobUrl;
    try {
      const response = await studentCertificate(id);
      const certificateBlob = await fetchCertificate(response.data.data.certificate.event_Certificate);
      certificateBlobUrl = URL.createObjectURL(certificateBlob);
      setCertificate(certificateBlobUrl);
      setCertificateY(response.data.data.certificate.event_certificate_position_y);
      setCertificateTextSize(response.data.data.certificate.event_certificate_text_size);
      setEventName(response.data.data.certificate.event_name);
      if (response.status === 200) {
        const watermarkCertificate = await fetchAndFillCertificate(
          certificateBlobUrl,
          name,
          surname,
          response.data.data.certificate.event_certificate_position_y,
          response.data.data.certificate.event_certificate_text_size,
          true
        );
        setPdfWatermarkUrl(watermarkCertificate);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };


  const getStudentGenerate = async () => {
    try {
      const response = await studentGenerate(id);
      if (!response.data.data.status) {
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.error("Error fetching student generate:", error);
    }
  };

  useEffect(() => {
    getCertificate();
    getStudentGenerate();
  }, []);

  const handleSubmit = async () => {
    try {
      const modifiedPdfBytes = await fetchAndFillCertificate(
        certificate,
        name,
        surname,
        certificateY,
        certificateTextSize,
        false,
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
        <Flex width={{ base: "80%", xl: "50%" }} justifyContent={"center"}>
          {pdfWatermarkUrl ? (
            <PdfViewer fileUrl={pdfWatermarkUrl}/>
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
      <Footer />
      {isOpen && (
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
      )}
    </>
  );
}

export default Student_CertificateExample;
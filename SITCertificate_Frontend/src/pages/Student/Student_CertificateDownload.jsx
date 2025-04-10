import { useEffect, useState } from "react";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PdfViewer from "../../components/PdfViewer";

import {
  studentCertificate,
  sendCertificate,
} from "../../services/apis/student/studentAPI";
import { fetchCertificate, fetchFile } from "../../services/apis/user/userAPI";

import { useCustomeToast } from "../../hooks/customeToast";

function Student_CertificateDownload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const Toast = useCustomeToast();

  const [certificate, setCertificate] = useState("");
  const [certificateRaw, setCertificateRaw] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const getCertificate = async () => {
    let certificateBlobUrl;
    try {
      const response = await studentCertificate(id);
      const certificateBlob = await fetchCertificate(response.data.data.certificate.student_event_generatedCertificate);
      setCertificateRaw(await fetchFile(response.data.data.certificate.student_event_generatedCertificate))
      certificateBlobUrl = URL.createObjectURL(certificateBlob);
      setCertificate(certificateBlobUrl);
    } catch (error) {
      console.error("Error getting certificate:", error);
    }
  };

  useEffect(() => {
    getCertificate();
  }, []);

  const sendCertificateToEmail = async () => {
    try {
      setIsLoading(true);
      const response = await sendCertificate(id, `${certificate}`);
      if (response.status === 200) {
        Toast("ส่งใบประกาศนียบัตรสำเร็จ", "ได้ส่งใบประกาศนียบัตรไปทางอีเมลเรียบร้อยแล้ว", "success");
      } else {
        Toast("เกิดข้อผิดพลาด", response.data.message, "error");
      }
      return;
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"80px"} bgColor={"#0c2d4e"} />
      {certificate && (
        <Box
          minH={"80vh"}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="32px" fontWeight="bold" pt="40px" py={"20px"}>
            ใบประกาศนียบัตร
          </Text>
          <Flex
            justify={"center"}
            width={{ base: "100%", lg: "80%", xl: "50%" }}
            height={"auto"}
          >
            {certificate ? (
              <PdfViewer fileUrl={`${certificate}`} />
            ) : (
              <Text>Loading PDF preview...</Text>
            )}
          </Flex>
          <Box
            width="80%"
            display="flex"
            justifyContent="center"
            pb="20px"
            gap={"20px"}
          >
            <Button
              width="270px"
              bgColor="#336699"
              color="white"
              borderRadius="40px"
              _hover={{ bgColor: "#1f568c" }}
              fontSize={{ base: "14px", md: "16px" }}
              variant="solid"
              onClick={() => {
                sendCertificateToEmail();
              }}
              disabled={isLoading}
            >
              ส่งใบประกาศนียบัตรไปยังอีเมล
            </Button>
            <Button
              leftIcon={<FaDownload />}
              bgColor="#3399cc"
              color="white"
              borderRadius="40px"
              _hover={{ bgColor: "#297AA3" }}
              fontSize={{ base: "14px", md: "16px" }}
              variant="solid"
              as="a"
              href={`${certificateRaw}`}
              download={"certificate.pdf"}
            >
              ดาวน์โหลด
            </Button>
          </Box>
          <Button
            color={"#1f568c"}
            mb={"30px"}
            variant="link"
            onClick={() => {
              navigate("/");
            }}
          >
            กลับสู่หน้าหลัก
          </Button>
        </Box>
      )}
      <Footer />
    </>
  );
}
export default Student_CertificateDownload;

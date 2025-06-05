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
  studentEventDataById
} from "../../apis/studentAPI";
import { fetchCertificate } from "../../apis/userAPI";

import { useCustomeToast } from "../../hooks/customeToast";

function Student_CertificateDownload() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const Toast = useCustomeToast();

  const [certificate, setCertificate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");

  const getCertificate = async () => {
    let certificateBlobUrl: string;
    try {
      const response = await studentCertificate(id ?? '');
      const eventData = await studentEventDataById(id ?? '');
      setEventName(eventData.data.data.event.event_name);
      const certificateBlob = await fetchCertificate(response.data.data.certificate[0].student_event_generatedCertificate);
      if (certificateBlob) {
        certificateBlobUrl = URL.createObjectURL(certificateBlob);
      } else {
        throw new Error("Certificate blob is null");
      }
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
      const response = await sendCertificate(id ?? '', `${certificate}`);
      if (response.status === 200) {
        Toast("ส่งใบประกาศนียบัตรสำเร็จ", "ได้ส่งใบประกาศนียบัตรไปทางอีเมลเรียบร้อยแล้ว", "success");
      } else {
        Toast("เกิดข้อผิดพลาด", response.data.message, "error");
      }
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
      <Box height={"60px"} />
      {certificate && (
        <Box
          minH={"80vh"}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="32px" fontWeight="bold" pt="60px">
            ใบประกาศนียบัตร
          </Text>
          <Flex
            justify={"center"}
            width={{ base: "80%", lg: "80%", xl: "50%" }}
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
              href={`${certificate}`}
              download={`${eventName}_certificate.pdf`}
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

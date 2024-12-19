import { useEffect, useState } from "react";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";
import { Box, Text, Button, Flex, useToast } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PdfViewer from "../../components/PdfViewer";

import {
  studentCertificate,
  sendCertificate,
} from "../../api/student/studentAPI";
import { fetchCertificate } from "../../api/user/userAPI";

import { deviceScreenCheck } from "../../utils/deviceScreenCheck";

function Student_CertificateDownload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = deviceScreenCheck();

  const [certificate, setCertificate] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const getCertificate = async () => {
    let certificateBlobUrl;
    try {
      const response = await studentCertificate(id);
      const certificateBlob = await fetchCertificate(response.data.data.student_GenerateCertificate);
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
        toast({
          title: "ได้ส่งใบประกาศนียบัตรไปทางอีเมลเรียบร้อยแล้ว",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return;
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
              <PdfViewer fileUrl={`${certificate}`} isMobile={isMobile} />
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
              width="100px"
              bgColor="#3399cc"
              color="white"
              borderRadius="40px"
              _hover={{ bgColor: "#297AA3" }}
              fontSize={{ base: "14px", md: "16px" }}
              variant="solid"
              as="a"
              href={`${import.meta.env.VITE_REACT_APP_URL}${certificate}`}
              download={"certificate.pdf"}
            >
              ดาวน์โหลด
            </Button>
          </Box>
          <Button
            color={"#1f568c"}
            pb={"30px"}
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

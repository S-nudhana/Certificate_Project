import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";

import PdfViewer from "../../components/PdfViewer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";

import { deviceScreenCheck } from "../../utils/deviceScreenCheck";
import { formatDateDMY } from "../../utils/dateFormat";

import {
  studentCertificate,
  studentGenerate,
  studentEventDataById,
  generateStudentCertificateInfo,
  sendCertificate,
} from "../../api/student/studentAPI";
import { fetchFile } from "../../api/user/userAPI";

function Student_Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = deviceScreenCheck();

  const [eventData, setEventData] = useState([]);
  const [studentStatus, setStudentStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [certificateRaw, setCertificateRaw] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState(null);

  const getEventData = async () => {
    try {
      const response = await studentEventDataById(id);
      if (!response.data.data) {
        navigate("/");
      }
      setEventData(response.data.data);
      setThumbnailURL(await fetchFile(response.data.data.event_thumbnail));
    } catch (error) {
      console.log("Get event data error: " + error);
    }
  };
  const getStudentGenerate = async () => {
    try {
      const response = await studentGenerate(id);
      setStudentStatus(response.data.data);
      if (!response.data.data) {
        const response = await studentCertificate(id);
        setCertificateRaw(response.data.data.student_GenerateCertificate);
        setCertificate(await fetchFile(response.data.data.student_GenerateCertificate));
      }
    } catch (error) {
      console.log("Get student data error: " + error);
    }
  };

  useEffect(() => {
    getEventData();
    getStudentGenerate();
  }, []);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isFormFilled = () => name.trim() !== "" && surname.trim() !== "" && email.trim() !== "";

  const handleSubmit = async () => {
    try {
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        setEmail("");
        return;
      } else {
        setEmailError("");
      }
      const response = await generateStudentCertificateInfo(
        id,
        name,
        surname,
        email
      );
      if (response.status === 200) {
        navigate(`/certificate/${id}`, {
          state: {
            certificateData: response.data.data,
            name,
            surname,
            email,
            id,
          },
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const sendCertificateToEmail = async () => {
    try {
      setIsLoading(true);
      const response = await sendCertificate(id, `${import.meta.env.VITE_REACT_APP_URL}file/${certificateRaw}`);
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
      {eventData && studentStatus && (
        <Box display={eventData && studentStatus ? "block" : "none"}>
          <Box display={{ base: "block", lg: "flex" }} minH={"80vh"}>
            <Image
              src={`${thumbnailURL}`}
              width={{ base: "100%", lg: "35%" }}
              height={{ base: "300px", lg: "100vh" }}
              objectFit="cover"
            ></Image>
            <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
              <BackBTN />
              <Text fontSize="32px" fontWeight="bold" pt="10px">
                {eventData.event_name}
              </Text>
              <Text pt="10px" pb="20px">
                เปิดให้ดาว์นโหลดตั้งแต่วันที่ {" "} 
                {formatDateDMY(eventData.event_startDate)} ถึง{" "}
                {formatDateDMY(eventData.event_endDate)}
              </Text>
              <Box
                border=".7px solid #919191"
                borderRadius="25px"
                p="30px"
                fontWeight="bold"
                fontSize="20px"
              >
                <Text pb="20px">กรอกข้อมูลในใบประกาศนียบัตร</Text>
                <FormControl id="name" pb="20px">
                  <FormLabel fontSize={["sm", "lg", "lg"]} fontWeight="bold">
                    ชื่อ
                  </FormLabel>
                  <Input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="surname" pb="20px">
                  <FormLabel fontSize={["sm", "lg", "lg"]} fontWeight="bold">
                    นามสกุล
                  </FormLabel>
                  <Input
                    type="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </FormControl>
                <Text fontSize={["sm", "lg", "lg"]} pb="20px">
                  อีเมล
                  <span style={{ fontWeight: "normal" }}>
                    {" "}
                    (ใช้ในการส่งใบประกาศนียบัตร)
                  </span>
                </Text>
                <FormControl mb={"20px"} id="email" isInvalid={emailError}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor={emailError ? "#D2042D" : "gray.200"}
                  />
                  <FormErrorMessage>{emailError}</FormErrorMessage>
                </FormControl>
                <Box width="100%" display="flex" justifyContent="flex-end">
                  <Button
                    isDisabled={!isFormFilled()}
                    width="100px"
                    bgColor="#336699"
                    color="white"
                    borderRadius="40px"
                    _hover={{ bgColor: "#1f568c" }}
                    variant="solid"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    ถัดไป
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {eventData && (
        <Box display={eventData && studentStatus ? "none" : "block"}>
          <Box display={{ base: "block", lg: "flex" }}>
            <Image
              src={`${thumbnailURL}`}
              width={{ base: "100%", lg: "35%" }}
              height={{ base: "300px", lg: "100vh" }}
              objectFit="cover"
            ></Image>
            <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
              <BackBTN />
              <Text fontSize="32px" fontWeight="bold" pt="10px">
                {eventData.event_name}
              </Text>
              <Text pt="10px" pb="20px">
                เปิดให้ดาว์นโหลดตั้งแต่วันที่{" "}
                {formatDateDMY(eventData.event_startDate)} ถึง{" "}
                {formatDateDMY(eventData.event_endDate)}
              </Text>
              <Text fontSize="18px" fontWeight={"bold"}>
                ใบประกาศนียบัตร
              </Text>
              <Flex
                width={"100%"}
                justifyContent={{ base: "center", lg: "start" }}
              >
                <Flex
                  width={{ base: "100%", lg: "80%" }}
                  justifyContent={{ base: "center", lg: "start" }}
                  pb={"20px"}
                >
                  {certificate ? (
                    <PdfViewer fileUrl={`${certificate}`} isMobile={isMobile} />
                  ) : (
                    <Text>Loading PDF preview...</Text>
                  )}
                </Flex>
              </Flex>
              <Box
                display="flex"
                justifyContent={{ base: "center", lg: "flex-start" }}
                gap={"20px"}
              >
                <Button
                  width="250px"
                  bgColor="#336699"
                  color="white"
                  fontSize={{ base: "14px", md: "16px" }}
                  borderRadius="40px"
                  _hover={{ bgColor: "#1f568c" }}
                  variant="solid"
                  onClick={() => {
                    sendCertificateToEmail();
                  }}
                  disabled={isLoading}
                >
                  ส่งใบประกาศนียบัตรไปยังอีเมล
                </Button>
                <Button
                  width="100px"
                  bgColor="#3399cc"
                  color="white"
                  fontSize={{ base: "14px", md: "16px" }}
                  borderRadius="40px"
                  _hover={{ bgColor: "#297AA3" }}
                  variant="solid"
                  as="a"
                  href={certificate}
                  download={`${eventData.event_name}_certificate.pdf`}
                >
                  ดาวน์โหลด
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Footer />
    </>
  );
}

export default Student_Detail;

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
} from "@chakra-ui/react";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";

import PdfViewer from "../../components/PdfViewer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import authMiddleware from "../../utils/authMiddleware";
import { dateFormatChange } from "../../utils/function";

import { studentGenerate, studentEventDataById, generateStudentCertificateInfo } from "../../api/student/studentAPI";

function Student_Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState();
  const [studentData, setStudentData] = useState();
  const getEventData = async () => {
    const response = await studentEventDataById(id);
    setEventData(response.data.data);
  };
  const getStudentGenerate = async () => {
    const response = await studentGenerate(id);
    setStudentData(response.data.data);
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
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      setEmail("");
      return;
    } else {
      setEmailError("");
    }
    const response = await generateStudentCertificateInfo(id, name, surname, email);
    if (response.status === 200) {
      navigate(`/certificate/${id}`);
    }
  }

  const aleadyGenerate = () => {
    if (eventData && studentData && studentData.student_eventGenerated === 0) {
      return (
        <>
          {eventData && (
            <Box display={{ base: "block", lg: "flex" }} pt="80px">
              <Image
                src={eventData.event_thumbnail}
                width={{ base: "100%", lg: "35%" }}
                height={{ base: "300px", lg: "100vh" }}
                objectFit="cover"
              ></Image>
              <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
                <BackBTN />
                <Text fontSize="32px" fontWeight="bold" pt="20px">
                  {eventData.event_name}
                </Text>
                <Text pt="10px" pb="20px">
                  เปิดให้ดาว์นโหลดตั้งแต่{" "}
                  {dateFormatChange(eventData.event_startDate)} ถึง{" "}
                  {dateFormatChange(eventData.event_endDate)}
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
          )}
        </>
      );
    } else {
      return (
        <>
          {eventData && (
            <Box display={{ base: "block", lg: "flex" }} pt="80px">
              <Image
                src={eventData.event_thumbnail}
                width={{ base: "100%", lg: "35%" }}
                height={{ base: "300px", lg: "100vh" }}
                objectFit="cover"
              ></Image>
              <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
                <BackBTN />
                <Text fontSize="32px" fontWeight="bold" pt="20px">
                  {eventData.event_name}
                </Text>
                <Text pt="10px" pb="20px">
                  เปิดให้ดาว์นโหลดตั้งแต่ {dateFormatChange(eventData.event_startDate)} ถึง {dateFormatChange(eventData.event_endDate)}
                </Text>
                <Text fontSize="18px" fontWeight={"bold"}>
                  ใบประกาศนียบัตร
                </Text>
                <Box></Box>
                <Flex width={"100%"} justifyContent={{base: "center", lg: 'start'}}>
                  <Flex width={{base: '100%', lg: '80%'}} justifyContent={{base: "center", lg: 'start'}}>
                    <PdfViewer fileUrl={eventData.event_certificate} />
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
                    fontSize={{ base: "12px", md: "16px" }}
                    borderRadius="40px"
                    _hover={{ bgColor: "#1f568c" }}
                    variant="solid"
                  >
                    ส่งใบประกาศนียบัตรไปยังอีเมลล์
                  </Button>
                  <Button
                    width="100px"
                    bgColor="#3399cc"
                    color="white"
                    fontSize={{ base: "12px", md: "16px" }}
                    borderRadius="40px"
                    _hover={{ bgColor: "#297AA3" }}
                    variant="solid"
                    as="a"
                    href={eventData.event_certificate}
                    download={`${eventData.event_name}_certificate.pdf`}
                  >
                    ดาวน์โหลด
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      );
    }
  };

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      {aleadyGenerate()}
      <Footer />
    </>
  );
}
export default authMiddleware(Student_Detail);

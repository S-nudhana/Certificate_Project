import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { useParams, useNavigate, ScrollRestoration } from "react-router-dom";
import img from '../../assets/img/SIT_Building.png'

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import authMiddleware from "../../utils/authMiddleware";
import { dateFormatChange } from "../../utils/function";
import axiosInstance from "../../utils/axiosInstance";

function Student_Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState();
  const [studentData, setStudentData] = useState();
  const getEventData = async () => {
    const response = await axiosInstance.get(`/user/event?id=${id}`);
    setEventData(response.data.data);
  };
  const getStudentGenerate = async () => {
    const response = await axiosInstance.get(`/student/generate?id=${id}`);
    setStudentData(response.data.data);
  }
  useEffect(() => {
    getEventData()
    getStudentGenerate()
  }, []);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isFormFilled = () =>
    name.trim() !== "" && surname.trim() !== "" && email.trim() !== "";

  const aleadyGenerate = () => {
    if (studentData && studentData.student_eventGenerated === 0) {
      return (
        <>
          {eventData && (
            <Box display={{ base: "block", lg: "flex" }} pt="80px">
              <Image
                src={eventData.event_thumbnail}
                width={{ base: "100%", lg: "35%" }}
                height={{ base: "auto", lg: "100vh" }}
                objectFit="cover"
              ></Image>
              <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
                <BackBTN />
                <Text fontSize="32px" fontWeight="bold" pt="20px">
                  {eventData.event_name}
                </Text>
                <Text pt="10px" pb="20px">
                  เปิดให้ดาว์นโหลดตั้งแต่  {dateFormatChange(eventData.event_startDate)} ถึง {dateFormatChange(eventData.event_endDate)}
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
                  <FormControl mb={'20px'} id="email" isInvalid={emailError}>
                    <Input
                      type="email"
                      placeholder="อีเมล"
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
                        handleClick()
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
                src={img}
                width={{ base: "100%", lg: "35%" }}
                height={{ base: "auto", lg: "100vh" }}
                objectFit="cover"
              ></Image>
              <Box pl={{ base: "0", lg: "70px" }} p="50px" width="100%">
                <BackBTN />
                <Text fontSize="32px" fontWeight="bold" pt="20px">
                  {eventData.event_name}
                </Text>
                <Text pt="10px" pb="20px">
                  เปิดให้ดาว์นโหลดตั้งแต่  {dateFormatChange(eventData.event_startDate)} ถึง {dateFormatChange(eventData.event_endDate)}
                </Text>
                <Text fontSize="18px" fontWeight={"bold"}>
                  ใบประกาศนียบัตร
                </Text>
                <Box
                  display="flex"
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  <Image
                    width="90%"
                    height={"auto"}
                    src={img}
                    my={"20px"}
                    boxShadow={"lg"}
                  ></Image>
                </Box>
                <Box
                  display="flex"
                  justifyContent={{ base: "center", lg: "flex-start" }}
                  gap={"20px"}
                >
                  <Button
                    width="270px"
                    bgColor="#336699"
                    color="white"
                    fontSize={{ base: "14px", md: "16px" }}
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
                    fontSize={{ base: "14px", md: "16px" }}
                    borderRadius="40px"
                    _hover={{ bgColor: "#297AA3" }}
                    variant="solid"
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

  const handleClick = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      setEmail('')
      return;
    } else {
      setEmailError('');
    }

    navigate(`/certificate/${id}`);
  }

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

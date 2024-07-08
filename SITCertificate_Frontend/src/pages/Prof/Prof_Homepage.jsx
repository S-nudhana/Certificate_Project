import { useState, useEffect } from 'react'
import { Box, Text, Image, Card, Button } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axiosInstance from '../../utils/axiosInstance';
import { dateCheck, dateFormatChange } from "../../utils/function";
import authMiddleware from "../../utils/authMiddleware";

function Prof_Homepage() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState();
  var pendingAmount = 0;
  var approvedAmount = 0;
  const getEventData = async () => {
    const response = await axiosInstance.get(`/user/allEvent`);
    setEventData(response.data.data);
    console.log(response.data.data)
  };
  useEffect(() => {
    getEventData();
  }, []);
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt="100px" pb={"40px"}>
        <Button
          leftIcon={<FaHistory />}
          ml={["40px", "40px", "100px", "100px", "100px", "300px"]}
          cursor="pointer"
          bgColor={"#3399cc"}
          color={"white"}
          fontSize={"medium"}
          height={"47px"}
          transition={".2s"}
          _hover={{ bgColor: "#297AA3" }}
          onClick={() => {
            navigate(import.meta.env.VITE_PROFESSOR_PATH_HISTORY);
          }}
        >
          ประวัติกิจกรรม
        </Button>
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
          pt="20px"
          pl={["40px", "40px", "100px", "100px", "100px", "300px"]}
        >
          กิจกรรมที่รอการอนุมัติ
        </Text>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ base: "center", lg: "flex-start" }}
            gap="30px"
            pt="30px"
            maxWidth="1300px"
            mx="auto"
          >
            {eventData && eventData.map((item, key) => {
              pendingAmount = key + 1;
              if (!item.event_approve && dateCheck(item.event_endDate)) {
                return (
                  <Card
                    width="300px"
                    height="auto"
                    bgColor="white"
                    borderRadius="30px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    transition=".2s ease-in"
                    _hover={{
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.01)",
                    }}
                  >
                    <Image
                      src={item.event_thumbnail}
                      objectFit="cover"
                      borderTopLeftRadius="30px"
                      borderTopRightRadius="30px"
                      width="100%"
                    />
                    <Box p="30px">
                      <Text fontSize="28px" fontWeight="bold" pb="5px">
                        {item.event_name}
                      </Text>
                      <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                      <Text pb="5px">
                        {dateFormatChange(item.event_startDate)} ถึง {dateFormatChange(item.event_endDate)}
                      </Text>
                      <Button
                        width="130px"
                        borderRadius="40px"
                        bgColor="#3399cc"
                        color="white"
                        _hover={{ bgColor: "#297AA3" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_PROFESSOR_PATH_DETAILS +
                            `${item.event_Id}`
                          );
                        }}
                      >
                        ดูข้อมูลกิจกรรม
                      </Button>
                    </Box>
                  </Card>
                );
              }
            })}
          </Box>
          <Box
            display={pendingAmount === 0 ? "flex" : "none"}
            alignItems={'center'}
            textAlign={'center'}
            width={"100%"}
            height={"15vh"}
            justifyContent={"center"}
          >
            <Text>ไม่พบกิจกรรมที่รอการอนุมัติ</Text>
          </Box>
        </Box>
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
          pt="20px"
          pl={["40px", "40px", "100px", "100px", "100px", "300px"]}
        >
          กิจกรรมที่ได้รับการอนุมัติ
        </Text>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ base: "center", lg: "flex-start" }}
            gap="30px"
            pt="30px"
            maxWidth="1300px"
            mx="auto"
          >
            {eventData && eventData.map((item, key) => {
              approvedAmount = key + 1;
              if (item.event_approve && dateCheck(item.event_endDate)) {
                return (
                  <Card
                    width="300px"
                    height="auto"
                    bgColor="white"
                    borderRadius="30px"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                    transition=".2s ease-in"
                    _hover={{
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.01)",
                    }}
                  >
                    <Image
                      src={item.event_thumbnail}
                      objectFit="cover"
                      borderTopLeftRadius="30px"
                      borderTopRightRadius="30px"
                      width="100%"
                    />
                    <Box p="30px">
                      <Text fontSize="28px" fontWeight="bold" pb="5px">
                        {item.event_name}
                      </Text>
                      <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                      <Text pb="5px">
                        {dateFormatChange(item.event_startDate)} ถึง {dateFormatChange(item.event_endDate)}
                      </Text>
                      <Button
                        width="130px"
                        borderRadius="40px"
                        bgColor="#3399cc"
                        color="white"
                        _hover={{ bgColor: "#297AA3" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_PROFESSOR_PATH_DETAILS +
                            `${item.event_Id}`
                          );
                        }}
                      >
                        ดูข้อมูลกิจกรรม
                      </Button>
                    </Box>
                  </Card>
                );
              }
            })}
          </Box>
          <Box
            display={approvedAmount === 0 ? "flex" : "none"}
            alignItems={'center'}
            textAlign={'center'}
            width={"100%"}
            height={"15vh"}
            justifyContent={"center"}
          >
            <Text>ไม่พบกิจกรรมที่ได้รับการอนุมัติ</Text>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
export default authMiddleware(Prof_Homepage);

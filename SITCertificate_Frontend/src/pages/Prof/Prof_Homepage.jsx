import { useState, useEffect } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfCard from "../../components/prof/ProfCard";

import image from "../../../public/img/SIT_Building.png";

import { userEventData } from "../../api/user/userAPI";

function Prof_Homepage() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState();
  var pendingAmount = 0;
  var approvedAmount = 0;

  const getEventData = async () => {
    const response = await userEventData();
    setEventData(response.data.data);
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"80px"} bgColor={"#0c2d4e"}/>
      <Box pb={"40px"} minHeight={"75vh"}>
        <Box
          position="relative"
          width="100%"
          height={{ base: "300px", lg: "400px" }}
          overflow="hidden"
        >
          <Image
            src={image}
            alt="Dimmed background"
            width="100%"
            height="100%"
            objectFit="cover"
            zIndex={1}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            zIndex={2}
          >
            <Box
              position="absolute"
              top={{base: "30%", xl: "40%"}}
              left={{ base: "5%", xl: "19%" }}
              width="100%"
              height="100%"
              color={"white"}
            >
              <Text fontSize={{ base: "30px", lg: "50px" }} fontWeight={"bold"}>
                ยินดีต้อนรับเข้าสู่ระบบออกใบประกาศนียบัตร
              </Text>
              <Text fontSize={{ base: "14px", lg: "22px" }}>
                คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
              </Text>
            </Box>
          </Box>
        </Box>
        <Box maxWidth="1300px" pt={"30px"} mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          <Button
            leftIcon={<FaHistory />}
            cursor="pointer"
            bgColor={"#3399cc"}
            color={"white"}
            fontSize={"medium"}
            height={"47px"}
            transition={".2s"}
            _hover={{ bgColor: "#297AA3" }}
            onClick={() => {
              navigate("/professor/history");
            }}
          >
            ประวัติกิจกรรม
          </Button>
          <Box
            display={{ base: "block", md: "flex" }}
            alignItems={{ base: "end", md: "center" }}
            pt="20px"
          >
            <Text
              fontSize="28px"
              fontWeight="bold"
              textDecoration="underline"
              textUnderlineOffset="2px"
              pr={"10px"}
            >
              กิจกรรมที่รอการอนุมัติ
            </Text>
            <Text color={"red"} fontSize={"14px"}>
              *โปรดอนุมัติกิจกรรมก่อนวันเปิดให้ดาวน์โหลด 3 วัน
            </Text>
          </Box>
        </Box>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ base: "center", xl: "flex-start" }}
            gap="30px"
            pt="30px"
            maxWidth="1300px"
            mx="auto"
          >
            {eventData &&
              eventData.map((item, key) => {
                if (!item.event_approve) {
                  pendingAmount = key + 1;
                  return (
                    <>
                      <ProfCard
                        event_thumbnail={item.event_thumbnail}
                        event_name={item.event_name}
                        event_owner={item.event_owner}
                        event_startDate={item.event_startDate}
                        event_endDate={item.event_endDate}
                        event_Id={item.event_Id}
                      ></ProfCard>
                    </>
                  );
                }
              })}
          </Box>
          <Box
            display={pendingAmount === 0 ? "flex" : "none"}
            alignItems={"center"}
            textAlign={"center"}
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
          maxWidth="1300px"
          mx={{ base: "5%", lg: "3%", xl: "auto" }}
        >
          กิจกรรมที่ได้รับการอนุมัติ
        </Text>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ base: "center", xl: "flex-start" }}
            gap="30px"
            pt="30px"
            maxWidth="1300px"
            mx={{ base: "5%", lg: "auto" }}
          >
            {eventData &&
              eventData.map((item, key) => {
                if (item.event_approve) {
                  approvedAmount = key + 1;
                  return (
                    <>
                      <ProfCard
                        event_thumbnail={item.event_thumbnail}
                        event_name={item.event_name}
                        event_owner={item.event_owner}
                        event_startDate={item.event_startDate}
                        event_endDate={item.event_endDate}
                        event_Id={item.event_Id}
                      ></ProfCard>
                    </>
                  );
                }
              })}
          </Box>
          <Box
            display={approvedAmount === 0 ? "flex" : "none"}
            alignItems={"center"}
            textAlign={"center"}
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
export default Prof_Homepage;

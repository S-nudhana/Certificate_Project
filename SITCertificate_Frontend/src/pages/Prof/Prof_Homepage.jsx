import { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfCard from "../../components/prof/ProfCard";
import Banner from "../../components/Banner";

import { userEventData } from "../../api/user/userAPI";

function Prof_Homepage() {
  const navigate = useNavigate();

  const [approveEventData, setApproveEventData] = useState([]);
  const [pendingEventData, setPendingEventData] = useState([]);

  const getEventData = async () => {
    try {
      const response = await userEventData();
      const data = response.data.data;
      setApproveEventData(data.filter((item) => item.event_approve));
      setPendingEventData(data.filter((item) => !item.event_approve));
    } catch (error) {
      console.log("Get event data error: " + error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"80px"} bgColor={"#0c2d4e"} />
      <Box pb={"40px"} minHeight={"75vh"}>
        <Banner/>
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
            {pendingEventData && pendingEventData.map((item, key) => (
              <ProfCard
                event_thumbnail={item.event_thumbnail}
                event_name={item.event_name}
                event_owner={item.event_owner}
                event_startDate={item.event_startDate}
                event_endDate={item.event_endDate}
                event_Id={item.event_Id}
              />
            ))}
          </Box>
          <Box
            display={pendingEventData.length === 0 ? "flex" : "none"}
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
            {approveEventData.map((item, key) => (
                  <ProfCard
                    event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_owner={item.event_owner}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}
                  />
              ))}
          </Box>
          <Box
            display={approveEventData.length === 0 ? "flex" : "none"}
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

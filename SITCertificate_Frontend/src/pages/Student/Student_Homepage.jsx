import { useState, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudentCard from "../../components/student/StudentCard";
import image from "../../../public/img/SIT_Building.png";

import { studentData } from "../../api/student/studentAPI";

function Student_Homepage() {
  var amount = 0;
  const [eventData, setEventData] = useState();
  const getEventData = async () => {
    try {
      const response = await studentData();
      setEventData(response.data.data);
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
      <Box height={"60px"} bgColor={"#0c2d4e"} />
      <Box minH={"75vh"}>
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
              top={{base: "30%", xl: "37%"}}
              left={{ base: "5%", xl: "7%" }}
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
        <Box maxWidth="1300px" mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          <Text
            fontSize="28px"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset="2px"
            pt="35px"
          >
            กิจกรรมที่เข้าร่วม
          </Text>
          <Box>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={{ base: "center", xl: "flex-start" }}
              gap="30px"
              py="30px"
              maxWidth="1300px"
              mx="auto"
            >
              {eventData &&
                eventData.map((item, key) => {
                  amount = key + 1;
                  return (
                    <>
                      <StudentCard
                        event_thumbnail={item.event_thumbnail}
                        event_name={item.event_name}
                        event_startDate={item.event_startDate}
                        event_endDate={item.event_endDate}
                        event_Id={item.event_Id}
                      ></StudentCard>
                    </>
                  );
                })}
            </Box>
            <Box
              display={amount === 0 ? "flex" : "none"}
              alignItems={"center"}
              textAlign={"center"}
              width={"100%"}
              height={"15vh"}
              justifyContent={"center"}
            >
              <Text>ไม่พบกิจกรรม</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Student_Homepage;

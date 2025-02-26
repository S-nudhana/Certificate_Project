import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudentCard from "../../components/student/StudentCard";
import Banner from "../../components/Banner";

import { studentData } from "../../api/student/studentAPI";

function Student_Homepage() {
  const [eventData, setEventData] = useState([]);

  const getEventData = async () => {
    try {
      const response = await studentData();
      setEventData(response.data.data.events);
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
        <Banner />
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
              {eventData && eventData.map((item, index) => (
                <StudentCard
                  key={index}
                  event_thumbnail={item.event_thumbnail}
                  event_name={item.event_name}
                  event_startDate={item.event_startDate}
                  event_endDate={item.event_endDate}
                  event_Id={item.event_Id}
                />
              ))}
            </Box>
            <Box
              display={eventData.length === 0 ? "flex" : "none"}
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

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudentCard from "../../components/student/StudentCard";

import authMiddleware from "../../middleware/authMiddleware";

import { studentData } from "../../api/student/studentAPI";

function Student_Homepage() {
  var amount = 0;
  const [eventData, setEventData] = useState();
  const getEventData = async () => {
    const response = await studentData();
    setEventData(response.data.data);
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt="60px" minH={"80vh"}>
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
          pt="50px"
          maxWidth="1300px"
            mx="auto"
        >
          กิจกรรม
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
                  <StudentCard event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}></StudentCard>
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
      <Footer />
    </>
  );
}

export default authMiddleware(Student_Homepage);

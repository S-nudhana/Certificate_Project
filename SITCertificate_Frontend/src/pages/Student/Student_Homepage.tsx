import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import EventList from "../../components/EventList";

import { studentData } from "../../apis/studentAPI";
import type { Event } from "../../types/student";

function Student_Homepage() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const getEventData = async (): Promise<void> => {
    try {
      const response = await studentData();
      setEventData(response.data.data.events);
    } catch (error) {
      console.error("Get event data error: " + error);
    }
  };
  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"60px"} />
      <Box minH={"75vh"}>
        <Banner />
        <Box
          maxWidth="1300px"
          mx={{ base: "0", lg: "3%", xl: "auto" }}
          px={{ base: "5%", lg: "0" }}
          mb={"40px"}
        >
          <EventList
            events={eventData}
            title="กิจกรรมที่เข้าร่วม"
            message="ไม่พบกิจกรรม"
            role={"student"}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Student_Homepage;

import { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EventList from "../../components/EventList";
import Banner from "../../components/Banner";

import { userEventData } from "../../services/apis/userAPI";

function Prof_Homepage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState({ approved: [], pending: [] });

  const getEventData = async () => {
    try {
      const response = await userEventData();
      const data = response.data.data.events;
      setEvents({
        approved: data.filter((item) => item.event_approve),
        pending: data.filter((item) => !item.event_approve),
      });
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
      <Box height={"80px"} bgColor={"#0c2d4e"} />
      <Box pb={"40px"} minHeight={"75vh"}>
        <Banner />
        <Box maxWidth="1300px" pt={"30px"} mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          <Button
            leftIcon={<FaHistory />}
            bgColor={"#3399cc"}
            color={"white"}
            fontSize={"medium"}
            height={"47px"}
            transition={".2s"}
            _hover={{ bgColor: "#297AA3" }}
            onClick={() => navigate("/professor/history")}
          >
            ประวัติกิจกรรม
          </Button>
          <EventList
            title="กิจกรรมที่รอการอนุมัติ"
            events={events.pending}
            emptyMessage="ไม่พบกิจกรรมที่รอการอนุมัติ"
            status={false}
            role={"professor"}
          />
          <EventList
            title="กิจกรรมที่ได้รับการอนุมัติ"
            events={events.approved}
            emptyMessage="ไม่พบกิจกรรมที่ได้รับการอนุมัติ"
            status={false}
            role={"professor"}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Prof_Homepage;

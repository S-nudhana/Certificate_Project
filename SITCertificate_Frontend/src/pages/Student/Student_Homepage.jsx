import { useState, useEffect } from 'react'
import { Box, Text, Image, Card, Button } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authMiddleware from "../../utils/authMiddleware";
import { dateCheck, dateFormatChange, dateOverSeven } from "../../utils/function";
import axiosInstance from '../../utils/axiosInstance';

function Student_Homepage() {
  const navigate = useNavigate();
  var amount = 0;
  const [eventData, setEventData] = useState();
  const getEventData = async () => {
    const response = await axiosInstance.get(`/student/event`);
    setEventData(response.data.data);
  };
  useEffect(() => {
    getEventData();
  }, []);
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt="60px">
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
          pt="50px"
          pl={['40px', '40px', '100px', '100px', '100px', '300px']}
        >
          กิจกรรม
        </Text>
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ base: "center", lg: "flex-start" }}
            gap="30px"
            py="30px"
            maxWidth="1300px"
            mx="auto"
          >
            {eventData && eventData.map((item, key) => {
              if (!dateOverSeven(item.event_endDate) && item.event_approve === 1) {
                amount = key + 1;
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
                      height={'250px'}
                    />
                    <Box p="30px">
                      <Text fontSize="28px" fontWeight="bold" pb="5px">
                        {item.event_name}
                      </Text>
                      <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                      <Text pb="5px" color={dateCheck(item.event_endDate) ? "black" : 'red'}>
                        {dateFormatChange(item.event_startDate)} ถึง {dateFormatChange(item.event_endDate)}
                      </Text>
                      <Button
                        width="170px"
                        borderRadius="40px"
                        bgColor="#336699"
                        color="white"
                        _hover={{ bgColor: "#1f568c" }}
                        isDisabled={!dateCheck(item.event_endDate)}
                        onClick={() => {
                          navigate(`/detail/${item.event_Id}`);
                        }}
                      >
                        รับประกาศนียบัตร
                      </Button>
                    </Box>
                  </Card>
                );
              }
            })}
          </Box>
          <Box
            display={amount === 0 ? "flex" : "none"}
            alignItems={'center'}
            textAlign={'center'}
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

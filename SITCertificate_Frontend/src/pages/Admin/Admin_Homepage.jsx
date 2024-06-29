import React, { useState } from "react";
import { Box, Text, Image, Card, Button, Flex } from "@chakra-ui/react";
import { useNavigate, ScrollRestoration, Outlet } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { data } from "../../utils/mockUpData";
import authMiddleware from "../../utils/authMiddleware";
import { dateCheck, dateFormatChange } from "../../utils/function";

function Admin_Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt="100px" pb={'40px'}>
        <Button
          leftIcon={<FaPlus />}
          ml={["40px", "40px", "100px", "100px", "100px", "300px"]}
          cursor="pointer"
          bgColor={"#336699"}
          color={"white"}
          fontSize={"medium"}
          height={"47px"}
          transition={".2s ease-in"}
          _hover={{ bgColor: "#1f568c" }}
          onClick={() => {
            navigate(import.meta.env.VITE_ADMIN_PATH_CREATE_EVENT);
          }}
        >
          เพิ่มกิจกรรม
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
            {data.map((item) => {
              if (!item.approve && dateCheck(item.EndedDownload)) {
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
                      src={item.img}
                      objectFit="cover"
                      borderTopLeftRadius="30px"
                      borderTopRightRadius="30px"
                      width="100%"
                    />
                    <Box p="30px">
                      <Text fontSize="28px" fontWeight="bold" pb="5px">
                        {item.title}
                      </Text>
                      <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                      <Text pb="5px">
                        {dateFormatChange(item.StartDownload)} ถึง {dateFormatChange(item.EndedDownload)}
                      </Text>
                      <Button
                        width="90px"
                        borderRadius="40px"
                        bgColor="#336699"
                        color="white"
                        _hover={{ bgColor: "#1f568c" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_ADMIN_PATH_EDIT_EVENTS +
                              `${item.id}`
                          );
                        }}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        ml={"15px"}
                        width="130px"
                        borderRadius="40px"
                        bgColor="#3399cc"
                        color="white"
                        _hover={{ bgColor: "#297AA3" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_ADMIN_PATH_DETAILS +
                              `${item.id}`
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
            {data.map((item) => {
              if (item.approve && dateCheck(item.EndedDownload)) {
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
                      src={item.img}
                      objectFit="cover"
                      borderTopLeftRadius="30px"
                      borderTopRightRadius="30px"
                      width="100%"
                    />
                    <Box p="30px">
                      <Text fontSize="28px" fontWeight="bold" pb="5px">
                        {item.title}
                      </Text>
                      <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                      <Text pb="5px">
                        {dateFormatChange(item.StartDownload)} ถึง {dateFormatChange(item.EndedDownload)}
                      </Text>
                      {/* <Button
                      mr={"15px"}
                        width="90px"
                        borderRadius="40px"
                        bgColor="#336699"
                        color="white"
                        _hover={{ bgColor: "#1f568c" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_ADMIN_PATH_EDIT_EVENTS +
                              `${item.id}`
                          );
                        }}
                      >
                        แก้ไข
                      </Button> */}
                      <Button
                        width="130px"
                        borderRadius="40px"
                        bgColor="#3399cc"
                        color="white"
                        _hover={{ bgColor: "#297AA3" }}
                        onClick={() => {
                          navigate(
                            import.meta.env.VITE_ADMIN_PATH_DETAILS +
                              `${item.id}`
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
        </Box>
      </Box>
      <Footer />
    </>
  );
}
export default authMiddleware(Admin_Homepage);

// create new btn
// w="300px"
// h="auto"
// bg="linear-gradient(90deg, rgba(51,153,204,1) 0%, rgba(51,102,153,1) 55%, rgba(31,86,140,1) 100%)"
// borderRadius="30px"
// boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
// color="white"
// transition=".2s ease-in"
// cursor="pointer"
// _hover={{
//     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // increase box-shadow on hover
//     transform: 'scale(1.01)',
// }}
// onClick={() => {
//     navigate(import.meta.env.VITE_ADMIN_PATH_CREATE_EVENT);
// }}

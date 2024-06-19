import React from "react";
import { Box, Text, Image, Card, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { data } from "../../utils/mockUpData";
import {
  dateCheck,
  dateFormatChange,
  dateOverThirty,
} from "../../utils/function";

export default function Admin_History() {
  const navigate = useNavigate();
  var amount = 0;
  return (
    <>
      <Flex alignItems={'center'} pt="50px" pl={["40px", "40px", "100px", "100px", "100px", "300px"]}>
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
        >
          ประวัติกิจกรรม
        </Text>
        <Text pl={"5px"} fontSize={'20px'}>(30 วันที่ผ่านมา)</Text>
      </Flex>
      <Box pb={"20px"}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "center", lg: "flex-start" }}
          gap="30px"
          py="30px"
          maxWidth="1300px"
          mx="auto"
        >
          {data.map((item, key) => {
            if (
              !dateCheck(item.EndedDownload) &&
              !dateOverThirty(item.EndedDownload)
            ) {
              amount = key;
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
                    <Text
                      pb="5px"
                      color={dateCheck(item.EndedDownload) ? "black" : "red"}
                    >
                      {dateFormatChange(item.StartDownload)} ถึง{" "}
                      {dateFormatChange(item.EndedDownload)}
                    </Text>
                    <Button
                      width="130px"
                      borderRadius="40px"
                      bgColor="#3399cc"
                      color="white"
                      _hover={{ bgColor: "#297AA3" }}
                      onClick={() => {
                        navigate(
                          import.meta.env.VITE_ADMIN_PATH_DETAILS + `${item.id}`
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
          width={"100%"}
          display={amount === 0 ? "flex" : "none"}
          justifyContent={"center"}
        >
          <Text>ไม่มีกิจกรรมใน 30 วันที่ผ่านมา</Text>
        </Box>
      </Box>
    </>
  );
}

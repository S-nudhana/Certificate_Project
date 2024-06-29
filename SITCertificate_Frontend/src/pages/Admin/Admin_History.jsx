import {
  Box,
  Text,
  Image,
  Card,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { data } from "../../utils/mockUpData";
import {
  dateCheck,
  dateFormatChange,
} from "../../utils/function";
import { FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";

export default function Admin_History() {
  const navigate = useNavigate();
  var amount = 0;
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box
        pt={"120px"}
        pb={"20px"}
        pl={["40px", "40px", "100px", "100px", "100px", "300px"]}
      >
        <BackBTN />
      </Box>
      <Box
        width={"100%"}
        display={{ base: "block", md: "flex" }}
        justifyContent={"space-between"}
        pl={["40px", "40px", "100px", "100px", "100px", "300px"]}
      >
        <Text
          fontSize="28px"
          fontWeight="bold"
          textDecoration="underline"
          textUnderlineOffset="2px"
          pb={{ base: "20px", md: "0" }}
        >
          ประวัติกิจกรรม
        </Text>
        <InputGroup
          width={{ base: "90%", md: "50%", lg: "500px" }}
          mr={["40px", "40px", "100px", "100px", "100px", "300px"]}
        >
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            borderRadius={"10px"}
            type="text"
            placeholder="ค้นหากิจกรรม"
          ></Input>
          <InputRightAddon p={"0"} border="none">
            <Button
              bgColor={"#3399cc"}
              color={"white"}
              borderLeftRadius={"0"}
              borderRightRadius={"10px"}
              transition={".3s"}
              _hover={{ bgColor: "#297AA3" }}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
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
            if (!dateCheck(item.EndedDownload)) {
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
          <Text>ยังไม่มีกิจกรรม</Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

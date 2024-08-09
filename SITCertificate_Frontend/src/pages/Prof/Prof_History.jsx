import { useEffect, useState } from "react";
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
import { dateFormatChange } from "../../utils/function";
import { FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";

import { userHistory } from "../../api/user/userAPI";

export default function Admin_History() {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState();
  const [search, setSearch] = useState("");

  const searchEvent = async () => {
    const response = await userHistory(search);
    setHistoryData(response.data.data);
  }
  useEffect(() => {
    setSearch("");
    searchEvent();
  }, []);
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <InputRightAddon p={"0"} border="none">
            <Button
              bgColor={"#3399cc"}
              color={"white"}
              borderLeftRadius={"0"}
              borderRightRadius={"10px"}
              transition={".3s"}
              _hover={{ bgColor: "#297AA3" }}
              onClick={() => {
                searchEvent();
              }}
            >
              ค้นหา
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
          {historyData && historyData.map((item, key) => {
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
                  <Text fontSize="28px" fontWeight="bold">
                    {item.event_name}
                  </Text>
                  <Text fontWeight="bold">{item.event_owner}</Text>
                  <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                  <Text
                    pb="5px"
                    color={"red"}
                  >
                    {dateFormatChange(item.event_startDate)} ถึง {dateFormatChange(item.event_endDate)}
                  </Text>
                  <Button
                    width="130px"
                    borderRadius="40px"
                    bgColor="#3399cc"
                    color="white"
                    _hover={{ bgColor: "#297AA3" }}
                    onClick={() => {
                      navigate(
                        import.meta.env.VITE_PROFESSOR_PATH_DETAILS + `${item.event_Id}`
                      );
                    }}
                  >
                    ดูข้อมูลกิจกรรม
                  </Button>
                </Box>
              </Card>
            );
          })}
        </Box>
        <Box
          display={amount === 0 ? "flex" : "none"}
          width={"100%"}
          height={"40vh"}
          justifyContent={"center"}
        >
          <Text>ไม่พบกิจกรรม</Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

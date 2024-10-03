import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import AdminCardConfirmed from "../../components/admin/AdminCardConfirmed";

import { userHistory } from "../../api/user/userAPI";
import authMiddleware from "../../middleware/authMiddleware";

function Admin_History() {
  const [historyData, setHistoryData] = useState();
  const [search, setSearch] = useState("");

  const searchEvent = async () => {
    const response = await userHistory(search);
    setHistoryData(response.data.data);
  };
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
          {historyData &&
            historyData.map((item, key) => {
              amount = key + 1;
              return (
                <>
                  <AdminCardConfirmed
                    event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_owner={item.event_owner}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}
                  ></AdminCardConfirmed>
                </>
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
export default authMiddleware(Admin_History);

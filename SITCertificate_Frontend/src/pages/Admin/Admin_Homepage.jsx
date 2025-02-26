import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaHistory, FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminCard from "../../components/admin/AdminCard";
import Banner from "../../components/Banner";

import { userEventData, userSearchEvent } from "../../api/user/userAPI";

function Admin_Homepage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [approveEventData, setApproveEventData] = useState([]);
  const [pendingEventData, setPendingEventData] = useState([]);
  const [searchEventData, setSearchEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEventData = async () => {
    try {
      const response = await userEventData();
      const data = response.data.data.events;
      setApproveEventData(data.filter((item) => item.event_approve));
      setPendingEventData(data.filter((item) => !item.event_approve));
    } catch (error) {
      console.log("Get event data error: " + error);
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchEvent = async (searchQuery = "") => {
    try {
      const response = await userSearchEvent(searchQuery);
      setSearchEventData(response.data.data.events);
    } catch (error) {
      console.log("Search event error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(searchEvent, 250), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setIsLoading(true);
    debouncedSearch(value);
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
        <Box
          maxWidth="1300px"
          pt={"30px"}
          mx={{ base: "5%", lg: "3%", xl: "auto" }}
        >
          <Box display={{ base: "block", lg: "flex" }} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Button
                leftIcon={<FaPlus />}
                cursor="pointer"
                bgColor={"#336699"}
                color={"white"}
                fontSize={"medium"}
                height={"47px"}
                transition={".2s"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => {
                  navigate("/admin/createEvent");
                }}
              >
                เพิ่มกิจกรรม
              </Button>
              <Button
                leftIcon={<FaHistory />}
                ml={"20px"}
                cursor="pointer"
                bgColor={"#3399cc"}
                color={"white"}
                fontSize={"medium"}
                height={"47px"}
                transition={".2s"}
                _hover={{ bgColor: "#297AA3" }}
                onClick={() => {
                  navigate("/admin/history");
                }}
              >
                ประวัติกิจกรรม
              </Button>
            </Box>
            <Box>

              <InputGroup width={{ base: "100%", md: "50%", lg: "500px" }} mt={{ base: "20px", lg: "0" }}>
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  borderRadius={"10px"}
                  type="text"
                  placeholder="ค้นหากิจกรรม"
                  value={search}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Box>
          </Box>
        </Box>
        <Box
          maxWidth="1300px"
          mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          {search === "" ? (
            <Box>
              <Box
                display={{ base: "block", md: "flex" }}
                alignItems={{ base: "end", md: "center" }}
                pt="20px"
              >
                <Text
                  fontSize="28px"
                  fontWeight="bold"
                  textDecoration="underline"
                  textUnderlineOffset="2px"
                  pr={"10px"}
                >
                  กิจกรรมที่รอการอนุมัติ
                </Text>
                <Text color={"#D2042D"} fontSize={"14px"}>
                  *โปรดอนุมัติกิจกรรมก่อนวันเปิดให้ดาวน์โหลด 3 วัน
                </Text>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "space-between", lg: "flex-start" }}
                gap="30px"
                pt="30px"
                maxWidth="1300px"
                mx={{ base: "5%", md: "8%", lg: "3%", xl: "auto" }}
              >
                {pendingEventData.map((item, key) => (
                  <AdminCard
                    key={key}
                    event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_owner={item.event_owner}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}
                    event_status={item.event_approve}
                  />
                ))}
              </Box>
              <Box
                display={pendingEventData.length === 0 ? "flex" : "none"}
                alignItems={"center"}
                textAlign={"center"}
                width={"100%"}
                height={"15vh"}
                justifyContent={"center"}
              >
                <Text>ไม่พบกิจกรรมที่รอการอนุมัติ</Text>
              </Box>
              <Text
                fontSize="28px"
                fontWeight="bold"
                textDecoration="underline"
                textUnderlineOffset="2px"
                mt={"20px"}
              >
                กิจกรรมที่ได้รับการอนุมัติ
              </Text>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "space-between", lg: "flex-start" }}
                gap="30px"
                pt="30px"
                maxWidth="1300px"
                mx={{ base: "5%", md: "8%", lg: "3%", xl: "auto" }}
              >
                {approveEventData.map((item, key) => (
                  <AdminCard
                    key={key}
                    event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_owner={item.event_owner}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}
                    event_status={item.event_approve}
                  ></AdminCard>
                ))}
              </Box>
              <Box
                display={approveEventData.length === 0 ? "flex" : "none"}
                alignItems={"center"}
                textAlign={"center"}
                width={"100%"}
                height={"15vh"}
                justifyContent={"center"}
              >
                <Text>ไม่พบกิจกรรมที่ได้รับการอนุมัติ</Text>
              </Box>
            </Box>
          ) : !isLoading ? (
            <Box
              pt="20px"
            >
              <Text
                fontSize="28px"
                fontWeight="bold"
                textDecoration="underline"
                textUnderlineOffset="2px"
                pb={{ base: "20px", md: "0" }}
              >
                ผลการค้นหา
              </Text>
              <Text>
                ผลการค้นหา "{search}" พบทั้งหมด {searchEventData.length} รายการ
              </Text>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ base: "center", xl: "flex-start" }}
                gap="30px"
                pt="30px"
                maxWidth="1300px"
                mx="auto"
              >
                {searchEventData.map((item, key) => (
                  <AdminCard
                    key={key}
                    event_thumbnail={item.event_thumbnail}
                    event_name={item.event_name}
                    event_owner={item.event_owner}
                    event_startDate={item.event_startDate}
                    event_endDate={item.event_endDate}
                    event_Id={item.event_Id}
                    event_status={item.event_approve}
                  />
                ))}
              </Box>
              {searchEventData.length === 0 && search !== "" && (
                <Box
                  width={"100%"}
                  height={"40vh"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>ไม่พบกิจกรรม "{search}"</Text>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              width={"100%"}
              height={"60vh"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="xl" color={"#1f568c"} emptyColor='gray.200' />
            </Box>
          )}
        </Box>
      </Box >
      <Footer />
    </>
  );
}

export default Admin_Homepage;

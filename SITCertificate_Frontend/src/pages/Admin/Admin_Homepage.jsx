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
import { FaPlus, FaHistory, FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import EventList from "../../components/EventList";

import { userEventData, userSearchEvent } from "../../services/apis/userAPI";

function Admin_Homepage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [approveEventData, setApproveEventData] = useState([]);
  const [pendingEventData, setPendingEventData] = useState([]);
  const [searchEventData, setSearchEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await userEventData();
        const data = response.data.data.events;
        setApproveEventData(data.filter((item) => item.event_approve));
        setPendingEventData(data.filter((item) => !item.event_approve));
      } catch (error) {
        console.error("Get event data error: " + error);
      }
    };
    getEventData();
  }, []);

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
      console.error("Search event error: " + error);
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

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"60px"}/>
      <Box pb={"40px"} minHeight={"75vh"}>
        <Banner />
        <Box maxWidth="1300px" pt={"30px"} mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          <Box display={{ base: "block", lg: "flex" }} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Button
                leftIcon={<FaPlus />}
                bgColor={"#336699"}
                color={"white"}
                fontSize={"medium"}
                height={"47px"}
                transition={".2s"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => navigate("/admin/createEvent")}
              >
                เพิ่มกิจกรรม
              </Button>
              <Button
                leftIcon={<FaHistory />}
                ml={"20px"}
                bgColor={"#3399cc"}
                color={"white"}
                fontSize={"medium"}
                height={"47px"}
                transition={".2s"}
                _hover={{ bgColor: "#297AA3" }}
                onClick={() => navigate("/admin/history")}
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
        <Box maxWidth="1300px" mx={{ base: "5%", lg: "3%", xl: "auto" }}>
          {search === "" ? (
            <>
              <EventList
                events={pendingEventData}
                title="กิจกรรมที่รอการอนุมัติ"
                message="ไม่พบกิจกรรมที่รอการอนุมัติ"
                role={"admin"}
              />
              <EventList
                events={approveEventData}
                title="กิจกรรมที่ได้รับการอนุมัติ"
                message="ไม่พบกิจกรรมที่ได้รับการอนุมัติ"
                role={"admin"}
              />
            </>
          ) : !isLoading ? (
            <>
              <Text
                fontSize="28px"
                fontWeight="bold"
                textDecoration="underline"
                textUnderlineOffset="2px"
                pt="20px"
              >
                ผลการค้นหา
              </Text>
              <Text>ผลการค้นหา "{search}" พบทั้งหมด {searchEventData.length} รายการ</Text>
              <EventList events={searchEventData} title="" message={`ไม่พบกิจกรรม "${search}"`} />
            </>
          ) : (
            <Box width={"100%"} height={"60vh"} display="flex" alignItems="center" justifyContent="center">
              <Spinner size="xl" color={"#1f568c"} emptyColor="gray.200" />
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Admin_Homepage;

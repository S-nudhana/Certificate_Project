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
import { FaHistory, FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EventList from "../../components/EventList";
import Banner from "../../components/Banner";

import { userEventData, userSearchEvent } from "../../apis/userAPI";

import type { Event } from "../../types/prof";

const Prof_Homepage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [approveEventData, setApproveEventData] = useState<Event[]>([]);
  const [pendingEventData, setPendingEventData] = useState<Event[]>([]);
  const [searchEventData, setSearchEventData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await userEventData();
        const data = response.data.data.events;
        setApproveEventData(data.filter((item: Event) => item.event_approve));
        setPendingEventData(data.filter((item: Event) => !item.event_approve));
      } catch (error) {
        console.error("Get event data error: " + error);
      }
    };
    getEventData();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchEvent = async (searchQuery: string = "") => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setIsLoading(true);
    debouncedSearch(value);
  };

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box height={"60px"} />
      <Box pb={"40px"} minHeight={"75vh"}>
        <Banner />
        <Box
          maxWidth="1300px"
          pt={"30px"}
          mx={{ base: "0", lg: "3%", xl: "auto" }}
          px={{ base: "5%", lg: "0" }}
        >
          <Box
            display={{ base: "block", lg: "flex" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
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
            <InputGroup
              width={{ base: "100%", md: "50%", lg: "500px" }}
              mt={{ base: "20px", lg: "0" }}
            >
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
          <Box
            maxWidth="1300px"
            mx={{ base: "0", lg: "3%", xl: "auto" }}
            px={{ base: "5%", lg: "0" }}
          >
            {search === "" ? (
              <>
                <EventList
                  events={pendingEventData}
                  title="กิจกรรมที่รอการอนุมัติ"
                  message="ไม่พบกิจกรรมที่รอการอนุมัติ"
                  role={"professor"}
                />
                <EventList
                  events={approveEventData}
                  title="กิจกรรมที่ได้รับการอนุมัติ"
                  message="ไม่พบกิจกรรมที่ได้รับการอนุมัติ"
                  role={"professor"}
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
                <Text>
                  ผลการค้นหา "{search}" พบทั้งหมด {searchEventData.length}{" "}
                  รายการ
                </Text>
                <EventList
                  events={searchEventData}
                  title=""
                  message={`ไม่พบกิจกรรม "${search}"`}
                  role={"professor"}
                />
              </>
            ) : (
              <Box
                width={"100%"}
                height={"60vh"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner size="xl" color={"#1f568c"} emptyColor="gray.200" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Prof_Homepage;

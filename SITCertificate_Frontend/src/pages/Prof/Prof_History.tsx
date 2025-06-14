import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { ScrollRestoration } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import Prof_AdminCard from "../../components/Prof_admin/Prof_AdminCard";

import { userHistory } from "../../apis/userAPI";

import type { HistoryData } from "../../types/prof";

function Prof_History() {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchEvent = async (searchQuery = "") => {
    try {
      setIsLoading(true);
      const response = await userHistory(searchQuery);
      setHistoryData(response.data.data.history);
    } catch (error) {
      console.error("Search event error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(searchEvent, 250), []);

  useEffect(() => {
    searchEvent();
  }, []);

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
      <Box
        pt={"110px"}
        pb={"10px"}
        maxWidth="1300px"
        mx={{ base: "0", lg: "3%", xl: "auto" }}
        px={{ base: "5%", lg: "0" }}
      >
        <BackBTN />
      </Box>
      <Box
        width={"100%"}
        maxWidth={"1300px"}
        mx={{ base: "0", lg: "3%", xl: "auto" }}
        px={{ base: "5%", lg: "0" }}
        display={{ base: "block", md: "flex" }}
        justifyContent={"space-between"}
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
        <InputGroup width={{ base: "90%", md: "50%", lg: "500px" }}>
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
      <Box pb={"20px"} maxWidth="1300px" mx="auto" minHeight={"60vh"}>
        {isLoading ? (
          <Box
            width={"100%"}
            height={"60vh"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" color={"#1f568c"} emptyColor="gray.200" />
          </Box>
        ) : historyData.length !== 0 ? (
          <Box>
            <Text display={search === "" ? "none" : ""}>
              ผลการค้นหา "{search}" พบทั้งหมด {historyData.length} รายการ
            </Text>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={{ base: "center", xl: "flex-start" }}
              gap="30px"
              pt="30px"
            >
              {historyData.map((item, key) => (
                <Prof_AdminCard
                  key={key}
                  event_thumbnail={item.event_thumbnail}
                  event_name={item.event_name}
                  event_owner={item.event_owner}
                  event_startDate={item.event_startDate}
                  event_endDate={item.event_endDate}
                  event_id={item.event_id}
                  event_status={item.event_approve}
                  role={"professor"}
                />
              ))}
            </Box>
            {historyData.length === 0 && search !== "" && (
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
          <Box p={"10px 20px"}>
            <Text display={search === "" ? "none" : ""}>
              ผลการค้นหา "{search}" พบทั้งหมด {historyData.length} รายการ
            </Text>
            <Box
              width={"100%"}
              height={"40vh"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text>ไม่พบกิจกรรม {search}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default Prof_History;

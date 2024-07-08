import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  IconButton,
  Stack,
  Image,
  Box,
  Text,
  Textarea,
  Card,
} from "@chakra-ui/react";
import { useParams, ScrollRestoration } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import authMiddleware from "../../utils/authMiddleware";
import axiosInstance from "../../utils/axiosInstance";
import { dateFormatChange } from '../../utils/function';

function Prof_EventDetail() {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [comments, setComments] = useState();
  const [newCommentBy, setNewCommentBy] = useState();
  const [newCommentDetail, setNewCommentDetail] = useState();
  const getEventData = async () => {
    const response = await axiosInstance.get(`/user/event?id=${id}`);
    setEventData(response.data.data);
  };
  const getComment = async () => {
    const response = await axiosInstance.get(`/user/comment?id=${id}`);
    setComments(response.data.data);
  }
  const postComment = async () => {
    const response = await axiosInstance.post(`/prof/newComment`, {
      eventId: id,
      username: newCommentBy,
      detail: newCommentDetail,
    });
    if (response.data.success) {
      getComment();
      setNewCommentBy("");
      setNewCommentDetail("");
    }
  }
  const toggleCommentStatus = async (commentId) => {
    const response = await axiosInstance.put(`/prof/updateCommentStatus`, {
      commentId: commentId,
    });
    if (response.data.success) {
      getComment();
    }
  }
  useEffect(() => {
    getEventData()
    getComment()
  }, []);

  console.log(comments)
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
        <BackBTN />
      </Box>
      {eventData && comments && (
        <Stack minH={"80vh"} direction={["column", "column", "row"]} mb={"50px"}>
          <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]} >
            <Text fontSize="32px" fontWeight="bold" pt="20px">
              {eventData.event_name}
            </Text>
            <Text pt="10px" pb="10px">
              เปิดให้ดาว์นโหลดตั้งแต่ {dateFormatChange(eventData.event_startDate)} ถึง {dateFormatChange(eventData.event_endDate)}
            </Text>
            <Text pb="20px" color={eventData.event_approve ? "green" : "red"}>
              สถานะ : {eventData.event_approve ? "อนุมัติ" : "รอการอนุมัติ"}
            </Text>
            <Text fontSize="18px" fontWeight={"bold"}>
              ใบประกาศนียบัตร
            </Text>
            <Image
              width="90%"
              height={"auto"}
              src={eventData.thumbnail}
              my={"20px"}
              boxShadow={"lg"}
            ></Image>
          </Flex>
          <Flex flex={1} ml={["10%", "10%", "0%"]}>
            <Stack spacing={5} w={"full"} pr={"10%"}>
              <Heading fontSize={"2xl"} pt="20px">
                Comment
              </Heading>
              <Box width={"100%"}>
                {comments.map((item) => {
                  return (
                    <Card p={"20px"} mb={"20px"} variant={"outline"}>
                      <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={"10px"}
                      >
                        <Text fontWeight={"bold"}>{item.comment_username}</Text>
                        <IconButton
                          isRound={true}
                          icon={<FaCheck />}
                          colorScheme={item.comment_status ? "green" : "gray"}
                          aria-label="Done"
                          onClick={() => {
                            toggleCommentStatus(item.comment_Id)
                          }}
                        />
                      </Flex>
                      <Text>{item.comment_detail}</Text>
                    </Card>
                  );
                })}
              </Box>
              <FormControl id="comment">
                <FormLabel>New Comment</FormLabel>
                <Input mb={"10px"} placeholder="ชื่อของท่าน" isDisabled={eventData.event_approve} onChange={(e) => setNewCommentBy(e.target.value)} />
                <Textarea placeholder="เพิ่ม comment ที่นี่" isDisabled={eventData.event_approve} onChange={(e) => setNewCommentDetail(e.target.value)} />
              </FormControl>
              <Stack spacing={6} align={"end"}>
                <Button
                  isDisabled={eventData.event_approve}
                  colorScheme={"blue"}
                  variant={"solid"}
                  padding={"20px"}
                  bgColor="#3399cc"
                  color="white"
                  fontSize={{ base: "14px", md: "16px" }}
                  borderRadius="40px"
                  _hover={{ bgColor: "#297AA3" }}
                  onClick={postComment}
                >
                  เพิ่ม Comment
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
      <Footer />
    </>
  );
}
export default authMiddleware(Prof_EventDetail);

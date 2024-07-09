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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, ScrollRestoration } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import authMiddleware from "../../utils/authMiddleware";
import axiosInstance from "../../utils/axiosInstance";
import { dateFormatChange, dateCheck } from '../../utils/function';

function Prof_EventDetail() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const approveEvent = async () => {
    const response = await axiosInstance.put(`/prof/approveEvent`, {
      eventId: id,
    });
    if (response.data.success) {
      getEventData();
    }
  }

  useEffect(() => {
    getEventData()
    getComment()
  }, []);
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
        <BackBTN />
      </Box>
      {eventData && comments && (
        <Stack minH={"80vh"} direction={["column", "column", "row"]} mb={"50px"} justifyContent={'center'}>
          <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]} >
            <Text fontSize="32px" fontWeight="bold" pt="20px">
              {eventData.event_name}
            </Text>
            <Text fontSize="18px" fontWeight="bold">
              {eventData.event_owner}
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
            <Button isDisabled={eventData.event_approve === 1} width={'130px'} padding={"20px"} color={'white'} bgColor={'#336699'} borderRadius={'40px'} _hover={{ bgColor: '#1f568c' }} onClick={onOpen}>อนุมัติกิจกรรม</Button>
          </Flex>
          <Flex flex={1} ml={["10%", "10%", "0%"]} width={'50%'}>
            <Stack spacing={5} w={"full"} pr={"10%"}>
              <Heading fontSize={"2xl"} pt="20px">
                ความคิดเห็น
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
                          pointerEvents={'none'}
                        />
                      </Flex>
                      <Text pt={'10px'}>{item.comment_detail}</Text>
                    </Card>
                  );
                })}
              </Box>
              <FormControl id="comment">
                <FormLabel>ความคิดเห็นใหม่</FormLabel>
                <Input mb={"10px"} placeholder="ชื่อของท่าน" value={newCommentBy} isDisabled={eventData.event_approve === 1 || !dateCheck(eventData.event_endDate)} onChange={(e) => setNewCommentBy(e.target.value)} />
                <Textarea placeholder="เพิ่มความคิดเห็นที่นี่" value={newCommentDetail} isDisabled={eventData.event_approve === 1 || !dateCheck(eventData.event_endDate)} onChange={(e) => setNewCommentDetail(e.target.value)} />
              </FormControl>
              <Stack spacing={6} align={"end"}>
                <Button
                  isDisabled={eventData.event_approve === 1 || !dateCheck(eventData.event_endDate)}
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
                  เพิ่มความคิดเห็น
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["xs", "sm", "sm"]}
      >
        <ModalOverlay />
        <ModalContent py={["5", "7", "7"]}>
          <ModalHeader textAlign={"center"}>ยืนยันที่จะอนุมัติกิจกรรม?</ModalHeader>
          <ModalBody>
            <Flex justifyContent="center">
              <Button
                mr={3}
                color="white"
                backgroundColor={"#336699"}
                borderRadius={"30"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => {
                  onClose();
                  approveEvent();
                }}
              >
                ยืนยัน
              </Button>
              <Button
                color="white"
                backgroundColor={"#AD3D3B"}
                _hover={{ bgColor: "#A80324" }}
                borderRadius={"30"}
                onClick={onClose}
              >
                ยกเลิก
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  );
}
export default authMiddleware(Prof_EventDetail);

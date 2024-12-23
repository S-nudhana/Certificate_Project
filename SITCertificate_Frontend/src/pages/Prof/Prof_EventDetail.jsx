import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Tooltip,
  IconButton,
  Stack,
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
  useToast,
} from "@chakra-ui/react";
import { useParams, ScrollRestoration } from "react-router-dom";
import { FaCheck, FaTrash, FaDownload } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import PdfViewer from "../../components/PdfViewer";

import { formatDateDMY } from "../../utils/dateFormat";
import { deviceScreenCheck } from "../../utils/deviceScreenCheck";

import { userComment, userEventDataById, fetchFile } from "../../api/user/userAPI";

import {
  profAddComment,
  profDeleteComment,
  profApproveEvent,
  profSendEmail,
} from "../../api/prof/profAPI";

function Prof_EventDetail() {
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventData, setEventData] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [excel, setExcel] = useState("");
  const [comments, setComments] = useState([]);
  const [newCommentDetail, setNewCommentDetail] = useState();

  const getEventData = async () => {
    try {
      const response = await userEventDataById(id);
      setEventData(response.data.data);
      setCertificate(await fetchFile(response.data.data.event_certificate));
      setExcel(await fetchFile(response.data.data.event_excel));
    } catch (error) {
      console.error('Get event data error:', error);
    }
  };

  const getComment = async () => {
    try {
      const response = await userComment(id);
      setComments(response.data.data);
    } catch (error) {
      console.error('Get comment error:', error);
    }
  };

  useEffect(() => {
    getEventData();
    getComment();
  }, []);

  const postComment = async () => {
    try {
      const response = await profAddComment(id, newCommentDetail);
      if (response.data.success) {
        getComment();
        setNewCommentDetail("");
        const response = await profSendEmail(
          id,
          eventData.event_name,
          newCommentDetail
        );
        if (response.status === 200) {
          return;
        }
      }
    } catch (error) {
      console.error('Post comment error:', error);
    }
  };

  const approveEvent = async () => {
    try {
      const response = await profApproveEvent(id);
      if (response.data.success) {
        getEventData();
        toast({
          title: "อนุมัติกิจกรรมสำเร็จ",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Approve event error:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await profDeleteComment(commentId);
      if (response.data.success) {
        onClose();
        getComment();
      }
    } catch (error) {
      console.error('Delete comment error:', error);
    }
  };

  const isMobile = deviceScreenCheck();

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
        <BackBTN />
      </Box>
      {eventData && comments && (
        <Stack
          width={"100%"}
          gap={{ base: "30px", lg: "0" }}
          direction={["column", "column", "row"]}
          mb={"50px"}
          justifyContent={"center"}
        >
          <Flex
            width={{ base: "80%", md: "50%" }}
            direction={"column"}
            ml={["10%", "10%", "5%"]}
          >
            <Text fontSize="32px" fontWeight="bold" pt="20px">
              {eventData.event_name}
            </Text>
            <Text fontSize="18px" fontWeight="bold">
              โดย {eventData.event_owner}
            </Text>
            <Text pt="10px" pb="10px">
              เปิดให้ดาว์นโหลดตั้งแต่{" "}
              {formatDateDMY(eventData.event_startDate)} ถึง {formatDateDMY(eventData.event_endDate)}
            </Text>
            <Text pb="20px" color={eventData.event_approve ? "green" : "red"}>
              สถานะ : {eventData.event_approve ? "อนุมัติ" : "รอการอนุมัติ"}
            </Text>
            <Text fontSize="18px" fontWeight={"bold"}>
              ใบประกาศนียบัตร
            </Text>
            <PdfViewer fileUrl={`${certificate}`} isMobile={isMobile} />
            <Button
              leftIcon={<FaDownload />}
              mt={"15px"}
              mb={"20px"}
              width={{ base: "auto", lg: "300px" }}
              color={"white"}
              bgColor={"#3399cc"}
              _hover={{ bgColor: "#297AA3" }}
              as="a"
              href={`${certificate}`}
              download={`${eventData.event_name}_certificate.pdf`}
            >
              ดาวน์โหลดเทมเพลทใบประกาศนียบัตร
            </Button>
            <Flex gap={"10px"}>
              <Text fontSize="18px" fontWeight={"bold"}>
                รายชื่อผู้เข้าร่วม:
              </Text>
              <Tooltip
                hasArrow
                placement="right"
                label="คลิกเพื่อดาวน์โหลด"
                bg="gray.100"
                p={"5px"}
                color="black"
              >
                <Button
                  leftIcon={<PiMicrosoftExcelLogoFill />}
                  variant={"link"}
                  color={"#919191"}
                  as="a"
                  href={`${excel}`}
                  download={`${eventData.event_name}_Excel.xlsx`}
                >
                  รายชื่อ.xlsx
                </Button>
              </Tooltip>
            </Flex>
            <FormControl id="comment" p={"20px 20px 0 0"}>
              <FormLabel fontSize="18px" fontWeight={"bold"}>
                เนื้อความในอีเมลส่งใบประกาศนียบัตร
              </FormLabel>
              <Textarea
                height={"300px"}
                resize="vertical"
                isDisabled={eventData.event_approve === 1}
                value={eventData.event_emailTemplate}
              />
            </FormControl>
            <Button
              isDisabled={eventData.event_approve === 1}
              mt={"20px"}
              width={"130px"}
              padding={"20px"}
              color={"white"}
              bgColor={"#336699"}
              borderRadius={"40px"}
              _hover={{ bgColor: "#1f568c" }}
              onClick={onOpen}
            >
              อนุมัติกิจกรรม
            </Button>
          </Flex>
          <Flex ml={["10%", "10%", "0%"]} width={{ base: "90%", md: "50%" }}>
            <Stack spacing={5} w={"full"} pr={"10%"}>
              <Heading fontSize={"2xl"} pt="20px">
                ความคิดเห็น
              </Heading>
              <Box width={"100%"} display={comments.length === 0 ? "none" : "block"}>
                {comments && comments.map((item) => (
                  <Card p={"20px"} mb={"20px"} variant={"outline"}>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"10px"}
                    >
                      <Text fontWeight={"bold"}>
                        {item.comment_username}
                      </Text>
                      <IconButton
                        isRound={true}
                        icon={<FaCheck />}
                        colorScheme={item.comment_status ? "green" : "gray"}
                        aria-label="Done"
                        pointerEvents={"none"}
                      />
                    </Flex>
                    <Text pt={"10px"} whiteSpace="pre-line">
                      {item.comment_detail}
                    </Text>
                    <Flex
                      width={"100%"}
                      justifyContent={"flex-end"}
                      pt={"10px"}
                    >
                      <Button
                        color={"#AD3D3B"}
                        _hover={{ color: "red" }}
                        variant={"link"}
                        textDecoration={"underline"}
                        textUnderlineOffset={"2px"}
                        leftIcon={<FaTrash />}
                        isDisabled={eventData.event_approve === 1}
                        onClick={() => {
                          deleteComment(item.comment_Id);
                        }}
                      >
                        ลบความคิดเห็น
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Box>
              <Box
                display={comments.length === 0 ? "flex" : "none"}
                alignItems={"center"}
                textAlign={"center"}
                width={"100%"}
                height={"15vh"}
                justifyContent={"center"}
              >
                <Text>ไม่พบความคิดเห็น</Text>
              </Box>
              <FormControl id="comment">
                <FormLabel>ความคิดเห็นใหม่</FormLabel>
                <Textarea
                  resize="vertical"
                  placeholder="เพิ่มความคิดเห็นที่นี่"
                  value={newCommentDetail}
                  isDisabled={eventData.event_approve === 1}
                  onChange={(e) => setNewCommentDetail(e.target.value)}
                />
              </FormControl>
              <Stack spacing={6} align={"end"}>
                <Button
                  isDisabled={eventData.event_approve === 1}
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
      <Footer />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={["xs", "sm", "sm"]}
        >
          <ModalOverlay />
          <ModalContent py={["5", "7", "7"]}>
            <ModalHeader textAlign={"center"}>
              ยืนยันที่จะอนุมัติกิจกรรม?
            </ModalHeader>
            <ModalBody>
              <Flex justifyContent="center">
                <Button
                  mr={3}
                  color="white"
                  backgroundColor={"#AD3D3B"}
                  _hover={{ bgColor: "#A80324" }}
                  borderRadius={"30"}
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
                <Button
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
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Prof_EventDetail;
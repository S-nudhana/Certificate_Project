import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Stack,
  Button,
  Box,
  Text,
  Card,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
  useToast,
  FormControl,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import { useParams, ScrollRestoration, useNavigate } from "react-router-dom";
import { FaCheck, FaDownload } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import PdfViewer from "../../components/PdfViewer";

import { formatDateDMY } from "../../utils/dateFormat";
import { deviceScreenCheck } from "../../utils/deviceScreenCheck";

import {
  userComment,
  userEventDataById,
  fetchFile
} from "../../api/user/userAPI";
import {
  adminToggleCommentStatus,
  adminDeleteEvent,
  adminSendEmail
} from "../../api/admin/adminAPI";
import { profEmail } from "../../api/prof/profAPI";

export default function Admin_EventDetail() {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventData, setEventData] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [excel, setExcel] = useState("");
  const [comments, setComments] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getEventData = async () => {
    try {
      const response = await userEventDataById(id);
      setEventData(response.data.data);
      setCertificate(await fetchFile(response.data.data.event_certificate));
      setExcel(await fetchFile(response.data.data.event_excel));
    } catch (error) {
      console.error("Error getting event data:", error);
    }
  };

  const getReceiverEmail = async () => {
    try {
      const response = await profEmail(id);
      if (response.data.data) {
        setReceiver(response.data.data.professor_email);
      }
    } catch (error) {
      console.error("Error getting receiver email:", error);
    }
  };

  const getComment = async () => {
    try {
      const response = await userComment(id);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error getting comment:", error);
    }
  };

  useEffect(() => {
    getEventData();
    getReceiverEmail();
    getComment();
  }, []);

  const toggleCommentStatus = async (commentId, commentDetail) => {
    try {
      const response = await adminToggleCommentStatus(commentId);
      if (response.data.success) {
        if (response.data.data) {
          sendMailToProfessor(commentDetail);
        }
        getComment();
      }
    } catch (error) {
      console.error("Error toggling comment status:", error);
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await adminDeleteEvent(id);
      if (response.data.success) {
        onClose();
        navigate("/admin/");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const sendMailToProfessor = async (commentDetail) => {
    try {
      setIsLoading(true);
      const response = await adminSendEmail(
        receiver,
        eventData.event_name,
        commentDetail
      );
      if (response.status === 200) {
        toast({
          title: "ได้ส่งอีเมลแจ้งการแก้ไขเรียบร้อยแล้ว",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
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
      <Stack
        width={"100%"}
        direction={["column", "column", "row"]}
        mb={"50px"}
        justifyContent={"center"}
        pt="20px"
      >
        <Flex
          width={{ base: "80%", md: "50%" }}
          direction={"column"}
          ml={["10%", "10%", "5%"]}
        >
          <Text fontSize="32px" fontWeight="bold">
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
            <FormLabel fontSize="18px" fontWeight={'bold'}>เนื้อความในอีเมลส่งใบประกาศนียบัตร</FormLabel>
            <Textarea height={'300px'} resize="vertical" placeholder="ยังไม่มีเนื้อความในอีเมลส่งใบประกาศนียบัตร" value={eventData.event_emailTemplate} disabled />
          </FormControl>
          <Button
            isDisabled={eventData.event_approve === 1}
            mt={'20px'}
            borderRadius={"40px"}
            width={'130px'}
            padding={"20px"}
            color={"white"}
            backgroundColor={"#AD3D3B"}
            _hover={{ bgColor: "#A80324" }}
            onClick={onOpen}
          >
            ลบกิจกรรม
          </Button>
        </Flex>
        <Flex ml={["10%", "10%", "0%"]} width={{ base: "90%", md: "50%" }}>
          <Stack spacing={5} w={"full"} pr={"10%"}>
            <Heading fontSize={"2xl"} pt={{ base: "20px", md: "0" }}>
              ความคิดเห็น
            </Heading>
            <Box width={"100%"} display={comments.length === 0 ? "none" : "flex"}>
              {comments && comments.map((item) => (
                <Card
                  p={"20px"}
                  mb={"20px"}
                  variant={"outline"}
                  key={item.id}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={"10px"}
                  >
                    <Text fontWeight={"bold"}>{item.comment_username}</Text>
                    <IconButton
                      isRound={true}
                      variant="solid"
                      colorScheme={item.comment_status ? "green" : "gray"}
                      aria-label="Done"
                      fontSize="16px"
                      icon={<FaCheck />}
                      pointerEvents={
                        eventData.event_approve === 1 ? "none" : "auto"
                      }
                      onClick={() => {
                        toggleCommentStatus(
                          item.comment_Id,
                          item.comment_detail
                        );
                      }}
                      disabled={isLoading}
                    />
                  </Flex>
                  <Text pt={"10px"}>{item.comment_detail}</Text>
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
          </Stack>
        </Flex>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["xs", "sm", "sm"]}
      >
        <ModalOverlay />
        <ModalContent py={["5", "7", "7"]}>
          <ModalHeader textAlign={"center"}>ยืนยันที่จะลบกิจกรรม?</ModalHeader>
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
                  deleteEvent();
                }}
              >
                ตกลง
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  );
}
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
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useParams, ScrollRestoration, useNavigate } from "react-router-dom";
import { FaCheck, FaDownload } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import PdfViewer from "../../components/PdfViewer";
import StatisticChart from "../../components/StatisticChart";
import { Toast } from "../../components/Toast";

import { formatDateDMY } from "../../utils/dateFormat";

import { useDeviceScreen } from "../../hooks/useDeviceScreen";

import {
  userComment,
  userEventDataById,
  fetchFile,
  getStatistic,
} from "../../services/apis/user/userAPI";
import {
  adminUpdateCommentStatus,
  adminDeleteEvent,
  adminSendEmail,
} from "../../services/apis/admin/adminAPI";
import { getProfessorEmail } from "../../services/apis/admin/adminAPI";

export default function Admin_EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventData, setEventData] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [excel, setExcel] = useState("");
  const [comments, setComments] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statistic, setStatistic] = useState(false);
  const [participantsAmount, setParticipantsAmount] = useState(0);
  const [participantsDownloadAmount, setParticipantsDownloadAmount] = useState(0);

  const getEventData = async () => {
    try {
      const response = await userEventDataById(id);
      setEventData(response.data.data.event);
      setStatistic(response.data.data.statistic);
      setCertificate(await fetchFile(response.data.data.event.event_certificate));
      setExcel(await fetchFile(response.data.data.event.event_excel));
      if (!statistic) {
        const response = await getStatistic(id);
        setParticipantsAmount(response.data.data.participantsAmount);
        setParticipantsDownloadAmount(response.data.data.participantsDownloadAmount);
      }
    } catch (error) {
      console.error("Error getting event data:", error);
    }
  };

  const getReceiverEmail = async () => {
    try {
      const response = await getProfessorEmail(id);
      if (response.status == 200) {
        setReceiver(response.data.data.professorEmail.professor_email);
      }
    } catch (error) {
      console.error("Error getting receiver email:", error);
    }
  };

  const getComment = async () => {
    try {
      const response = await userComment(id);
      setComments(response.data.data.comment);
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
      const response = await adminUpdateCommentStatus(commentId);
      if (response.status === 200) {
        if (response.data.data.commentStatus) {
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
      if (response.status === 200) {
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
        Toast("ส่งอีเมลแจ้งการแก้ไขเรียบร้อย", "ได้ส่งอีเมลแจ้งการแก้ไขเรียบร้อยแล้ว", "success");
      } else {
        Toast("เกิดข้อผิดพลาด", response.data.message, "error");
      }
      return;
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = useDeviceScreen();

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
            ผู้จัดกิจกรรม {eventData.event_owner}
          </Text>
          <Text pt="10px" pb="10px">
            เปิดให้ดาว์นโหลดตั้งแต่ {formatDateDMY(eventData.event_startDate)}{" "}
            ถึง {formatDateDMY(eventData.event_endDate)}
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
              placeholder="ยังไม่มีเนื้อความในอีเมลส่งใบประกาศนียบัตร"
              value={eventData.event_emailTemplate}
              disabled
            />
          </FormControl>
          <Button
            isDisabled={eventData.event_approve === 1}
            mt={"20px"}
            borderRadius={"40px"}
            width={"130px"}
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
            <Box
              width={"100%"}
              display={comments.length === 0 ? "none" : "block"}
            >
              {comments &&
                comments.map((item, key) => (
                  <Card
                    key={key}
                    p={"20px"}
                    mb={"20px"}
                    variant={"outline"}
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
      {statistic && (
        <StatisticChart participantsAmount={participantsAmount} participantsDownloadAmount={participantsDownloadAmount} eventName={eventData.event_name} />
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
              ยืนยันที่จะลบกิจกรรม?
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
                    deleteEvent();
                  }}
                >
                  ตกลง
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

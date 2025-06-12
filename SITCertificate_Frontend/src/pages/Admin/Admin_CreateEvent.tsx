import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PDF from "react-pdf-watermark";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCustomeToast } from "../../hooks/customeToast";

import { adminCreateEvent, getProfessor } from "../../apis/adminAPI";
import { uploadFile } from "../../apis/userAPI";
import { embedName } from "../../apis/adminAPI";


function Admin_CreateEvent() {
  const navigate = useNavigate();
  const Toast = useCustomeToast();
  const templateURLRef = useRef<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventName, setEventName] = useState<string>("");
  const [eventOwnerName, setEventOwnerName] = useState<string>("");
  const [openDate, setOpenDate] = useState<string>("");
  const [closeDate, setCloseDate] = useState<string>("");
  const [closeDateError, setCloseDateError] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string>("");
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateURL, setTemplateURL] = useState<string>("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [modifiedTemplateURL, setModifiedTemplateURL] = useState<string>("");
  const [inputSize, setInputSize] = useState<number | null>();
  const [inputY, setInputY] = useState<number | null>();
  const [professorList, setProfessorList] = useState<any[]>([]);

  const getProfessorList = async () => {
    try {
      const response = await getProfessor();
      setProfessorList(response.data.data.professors);
    } catch (error) {
      console.error("Error getting professor list:", error);
    }
  };

  useEffect(() => {
    getProfessorList();
  }, []);

  const handleTemplateChange = async (pdfUrl: File) => {
    try {
      const modifiedPdfBytes = await embedName(pdfUrl, 30, 46, "upload_temp");
      setModifiedTemplateURL(modifiedPdfBytes.data);
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (templateURLRef.current) {
        URL.revokeObjectURL(templateURLRef.current);
      }
      const newUrl = URL.createObjectURL(file);
      setTemplateFile(file);
      setTemplateURL(newUrl);
      templateURLRef.current = newUrl;
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSize(Number(e.target.value));
  };

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputY(Number(e.target.value));
  };

  const newExampleChange = async (): Promise<void> => {
    try {
      const modifiedPdfBytes = await embedName(
        templateFile as File,
        inputSize ?? 30,
        inputY ?? 45,
        "upload_temp"
      );
      setModifiedTemplateURL(modifiedPdfBytes.data);
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (closeDate < openDate) {
        setCloseDateError(
          "วันสิ้นสุดการดาวน์โหลดต้องมากกว่าวันเปิดให้ดาว์นโหลด"
        );
        setCloseDate("");
        Toast("เกิดข้อผิดพลาด กรุณากรอกข้อมูลใหม่อีกครั้ง", "วันสิ้นสุดการดาวน์โหลดต้องอยู่หลังวันเปิดให้ดาว์นโหลด", "error");
        return;
      }
      if (
        eventName &&
        eventOwnerName &&
        openDate &&
        closeDate &&
        thumbnailFile
      ) {
        const uploadedThumbnail = await uploadFile(
          thumbnailFile,
          "upload_images"
        );
        let uploadedTemplatePath = "";
        let uploadedExcelPath = "";
        if (templateFile) {
          const uploadedTemplate = await uploadFile(
            templateFile,
            "upload_template"
          );
          uploadedTemplatePath = uploadedTemplate.data.file.filePath
        }
        if (excelFile) {
          const uploadedExcel = await uploadFile(excelFile, "upload_excel");
          uploadedExcelPath = uploadedExcel.data.file.filePath
        }
        const response = await adminCreateEvent(
          eventName,
          eventOwnerName,
          openDate,
          closeDate,
          uploadedThumbnail.data.file.filePath,
          uploadedTemplatePath,
          uploadedExcelPath,
          emailTemplate,
          inputSize ?? 30,
          inputY ?? 45
        );
        if (response.status === 201) {
          navigate("/admin/");
          Toast("สร้างกิจกรรมสำเร็จ", `สร้างกิจกรรม ${eventName} สำเร็จ`, "success");
        }
      } else {
        Toast("เกิดข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        console.error("Missing required event information.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Flex pt={"80px"} minH={"80vh"} align={"center"} justify={"center"}>
          <Stack
            spacing={8}
            mx={"auto"}
            maxW={["sm", "lg", "lg"]}
            py={12}
            px={6}
          >
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack align={"center"} pb={5}>
                <Heading fontSize={["2xl", "3xl", "3xl"]} textAlign={"center"}>
                  สร้างกิจกรรม
                </Heading>
              </Stack>
              <Stack spacing={4}>
                <FormControl id="">
                  <FormLabel fontSize={["sm", "md", "md"]} display={"flex"}>
                    ชื่อกิจกรรม <Text textColor={"#D2042D"}>*</Text>
                  </FormLabel>
                  <Input
                    type="text"
                    size={["sm", "md", "md"]}
                    placeholder="กรอกชื่อกิจกรรม"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="">
                  <FormLabel fontSize={["sm", "md", "md"]} display={"flex"}>
                    ชื่อผู้จัดกิจกรรม<Text textColor={"#D2042D"}>*</Text>
                  </FormLabel>
                  <Select placeholder="เลือกชื่อผู้จัดกิจกรรม" size={["sm", "md", "md"]} value={eventOwnerName} onChange={(e) => setEventOwnerName(e.target.value)}>
                    {professorList.map((professor) => (
                      <option key={professor.professor_fullname} value={professor.professor_fullname}>
                        {professor.professor_fullname}
                      </option>

                    ))}
                  </Select>
                </FormControl>
                <HStack w="full">
                  <Box w={"50%"}>
                    <FormControl id="">
                      <FormLabel fontSize={["sm", "md", "md"]} display={"flex"}>
                        เปิดให้เริ่มดาวน์โหลด<Text textColor={"#D2042D"}>*</Text>
                      </FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size={["sm", "md", "md"]}
                        type="date"
                        value={openDate}
                        onChange={(e) => setOpenDate(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box w={"50%"}>
                    <FormControl id="closeDate" isInvalid={!!closeDateError}>
                      <FormLabel fontSize={["sm", "md", "md"]} display={"flex"}>
                        สิ้นสุดการดาวน์โหลด<Text textColor={"#D2042D"}>*</Text>
                      </FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size={["sm", "md", "md"]}
                        type="date"
                        value={closeDate}
                        onChange={(e) => setCloseDate(e.target.value)}
                        borderColor={closeDateError ? "#D2042D" : "gray.200"}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="">
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    display="flex"
                    flexDir={{ base: "column", md: "row" }}
                    alignItems={{ base: "start", md: "center" }}
                  >
                    อัปโหลดรูปปก<Text textColor={"#D2042D"}>*</Text>
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .png หรือ .jpg เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .heic, .heif"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setThumbnailFile(file);
                        setThumbnailURL(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <Img src={thumbnailURL} pt={2} />
                </FormControl>
                <FormControl id="">
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    flexDir={{ base: "column", md: "row" }}
                    alignItems={{ base: "start", md: "center" }}
                  >
                    อัปโหลดเท็มเพลทใบประกาศนียบัตร
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .pdf เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </FormControl>
                {templateURL && (
                  <PDF
                    file={templateURL}
                    key={templateURL}
                    canvasWidth={"100%"}
                    canvasHeight={"auto"}
                  />
                )}
                {templateFile && (
                  <Button
                    bg={"#3399cc"}
                    color={"white"}
                    _hover={{ bgColor: "#297AA3" }}
                    onClick={() => {
                      onOpen();
                      handleTemplateChange(templateFile);
                    }}
                    size={["sm", "md", "md"]}
                  >
                    ปรับตำแหน่งและขนาดชื่อในใบประกาศนียบัตร
                  </Button>
                )}
                <FormControl>
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    flexDir={{ base: "column", md: "row" }}
                    alignItems={{ base: "start", md: "center" }}
                  >
                    อัปโหลดรายชื่อผู้เข้าร่วม
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .xlsx เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files[0]) {
                        setExcelFile(files[0]);
                      }
                    }}
                  />
                  <FormLabel pt="5">
                    เนื้อความในอีเมลส่งใบประกาศนียบัตร
                  </FormLabel>
                  <Textarea
                    height={"300px"}
                    resize="vertical"
                    placeholder="เพิ่มเนื้อความที่นี่"
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                  />
                </FormControl>
                <Flex justify={"space-between"} width={"100%"}>
                  <Button
                    loadingText="Submitting"
                    width={"49%"}
                    bg="#AD3D3B"
                    color="white"
                    _hover={{ bg: "#A80324" }}
                    fontSize={["sm", "lg", "lg"]}
                    onClick={() => {
                      navigate("/admin/");
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    loadingText="Submitting"
                    width={"49%"}
                    bg="#336699"
                    color="white"
                    _hover={{ bg: "#1F568C" }}
                    fontSize={["sm", "lg", "lg"]}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    สร้างกิจกรรม
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
      <Footer />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent p={"10px"} w={{ base: "85%", md: "100%" }}>
            <ModalHeader>ปรับตำแหน่งชื่อในใบประกาศนียบัตร</ModalHeader>
            <ModalBody>
              {modifiedTemplateURL ? (
                <PDF
                  file={modifiedTemplateURL}
                  canvasWidth={"100%"}
                  canvasHeight={"auto"}
                  key={modifiedTemplateURL}
                />
              ) : (
                <Text>Loading PDF preview...</Text>
              )}
              <Box
                display="flex"
                flexDirection="row"
                alignItems="end"
                justifyContent="center"
                gap="10px"
              >
                <FormControl>
                  <FormLabel>ขนาดตัวหนังสือ / px</FormLabel>
                  <Input
                    placeholder="30"
                    variant="outline"
                    value={inputSize ?? ""}
                    type="number"
                    onChange={handleSizeChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>ความสูง / %</FormLabel>
                  <Input
                    placeholder="45"
                    variant="outline"
                    value={inputY ?? ""}
                    type="number"
                    onChange={handleYChange}
                  />
                </FormControl>

                <Button px="30px" onClick={newExampleChange}>
                  แสดงผล
                </Button>
              </Box>
            </ModalBody>
            <ModalFooter gap={"10px"}>
              <Button
                color="white"
                backgroundColor={"#AD3D3B"}
                _hover={{ bgColor: "#A80324" }}
                onClick={() => {
                  setInputSize(30);
                  setInputY(45);
                }}
              >
                รีเซ็ตค่า
              </Button>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                onClick={onClose}
              >
                บันทึก
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Admin_CreateEvent;

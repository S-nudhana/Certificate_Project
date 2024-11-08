import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import PDF from "react-pdf-watermark";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { convertSvgToPng, createTextSVG } from "../../components/embedNameOnCertificate"

import { adminCreateEvent } from "../../api/admin/adminAPI";
import { uploadFile } from "../../api/user/userAPI"

function Admin_CreateEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventOwnerName, setEventOwnerName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [templateFile, setTemplateFile] = useState(null);
  const [templateURL, setTemplateURL] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState("");
  const [modifiedTemplateURL, setModifiedTemplateURL] = useState("");
  const [inputSize, setInputSize] = useState(30);
  const [inputY, setInputY] = useState(45);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    try {
      if (
        eventName &&
        eventOwnerName &&
        openDate &&
        closeDate &&
        thumbnailFile &&
        templateFile &&
        excelFile &&
        emailTemplate
      ) {
        const uploadedThumbnail = await uploadFile(thumbnailFile, "upload_images");
        const uploadedTemplate = await uploadFile(templateFile, "upload_template");
        const uploadedExcel = await uploadFile(excelFile, "upload_excel");
        const response = await adminCreateEvent(
          eventName,
          eventOwnerName,
          openDate,
          closeDate,
          uploadedThumbnail.data.file.filePath,
          uploadedTemplate.data.file.filePath,
          uploadedExcel.data.file.filePath,
          emailTemplate,
          inputSize,
          inputY
        );
        if (response.status === 200) {
          navigate("/admin/");
        }
      } else {
        console.error("Missing required event information.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const fetchAndFillCertificate = async (pdfUrl, size, y) => {
    try {
      const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
      const pdfBytes = response.data;
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const fontUrl =
        "https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf";

      const page = pdfDoc.getPages()[0];
      const text = "ชื่อจริง นามสกุล";
      const fontSize = `${size}`;
      const textY = `${y}`;
      const { width, height } = page.getSize();
      const svgText = createTextSVG(
        text,
        fontUrl,
        fontSize,
        width,
        height,
        textY
      );
      const pngBytes = await convertSvgToPng(svgText, width, height);
      const pngImage = await pdfDoc.embedPng(pngBytes);
      page.drawImage(pngImage);
      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error processing PDF:", error);
      return null;
    }
  };

  const handleTemplateChange = async (pdfUrl) => {
    try {
      const modifiedPdfBytes = await fetchAndFillCertificate(pdfUrl, 30, 46);
      if (modifiedPdfBytes) {
        const modifiedPdfUrl = URL.createObjectURL(
          new Blob([modifiedPdfBytes], { type: "application/pdf" })
        );
        setModifiedTemplateURL(modifiedPdfUrl);
      }
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  const templateURLRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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

  const handleSizeChange = (e) => {
    setInputSize(e.target.value);
  };

  const handleYChange = (e) => {
    setInputY(e.target.value);
  };

  const newExampleChange = async () => {
    try {
      const modifiedPdfBytes = await fetchAndFillCertificate(
        templateURL,
        inputSize,
        inputY
      );
      if (modifiedPdfBytes) {
        const modifiedPdfUrl = URL.createObjectURL(
          new Blob([modifiedPdfBytes], { type: "application/pdf" })
        );
        setModifiedTemplateURL(modifiedPdfUrl);
      }
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  useEffect(() => {
    if (templateURL) {
      handleTemplateChange(templateURL);
    }
  }, [templateURL]);
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
                  <FormLabel fontSize={["sm", "md", "md"]}>
                    ชื่อกิจกรรม
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
                  <FormLabel fontSize={["sm", "md", "md"]}>
                    ชื่อผู้จัดกิจกรรม
                  </FormLabel>
                  <Input
                    type="text"
                    size={["sm", "md", "md"]}
                    placeholder="กรอกชื่อผู้จัดกิจกรรม"
                    value={eventOwnerName}
                    onChange={(e) => setEventOwnerName(e.target.value)}
                  />
                </FormControl>
                <HStack w="full">
                  <Box w={"50%"}>
                    <FormControl id="">
                      <FormLabel fontSize={["sm", "md", "md"]}>
                        เปิดให้เริ่มดาวน์โหลด
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
                    <FormControl id="">
                      <FormLabel fontSize={["sm", "md", "md"]}>
                        สิ้นสุดการดาวน์โหลด
                      </FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size={["sm", "md", "md"]}
                        type="date"
                        value={closeDate}
                        onChange={(e) => setCloseDate(e.target.value)}
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
                    อัปโหลดรูปปก
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .png หรือ .jpg เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .heic, .heif"
                    onChange={(e) => {
                      const file = e.target.files[0];
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
                    onClick={() => {
                      onOpen();
                      handleTemplateChange(templateFile);
                    }}
                    size={["sm", "md", "md"]}
                  >
                    ปรับตำแหน่งและขนาดชื่อในใบประกาศนียบัตร
                  </Button>
                )}

                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                  <ModalOverlay />
                  <ModalContent>
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
                            value={inputSize}
                            type="number"
                            onChange={handleSizeChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>ความสูง / %</FormLabel>
                          <Input
                            placeholder="45"
                            variant="outline"
                            value={inputY}
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
                      const file = e.target.files[0];
                      if (file) {
                        setExcelFile(file);
                      }
                    }}
                  />
                  <FormLabel pt="5">เนื้อความในอีเมลส่งใบประกาศนียบัตร</FormLabel>
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
    </>
  );
}

export default Admin_CreateEvent;

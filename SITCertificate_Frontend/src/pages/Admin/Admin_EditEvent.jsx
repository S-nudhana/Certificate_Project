import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from '../../utils/firebaseConfig';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import authMiddleware from "../../utils/authMiddleware";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/function";

function Admin_EditEvent() {
  const id = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventOwnerName, setEventOwnerName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [templateFile, setTemplateFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const getEventData = async () => {
    const response = await axiosInstance.get(`/user/event?id=${id.id}`);
    setEventName(response.data.data.event_name);
    setEventOwnerName(response.data.data.event_owner);
    setOpenDate(formatDate(response.data.data.event_startDate));
    setCloseDate(formatDate(response.data.data.event_endDate));
  };

  const firebaseUploadFile = async (file, folder) => {
    const storage = getStorage(app);
    if (file) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    }
    return null;
  }

  const updateEventData = async () => {
    try {
      if (eventName || eventOwnerName || openDate || closeDate || thumbnailFile || templateFile || excelFile) {
        const uploadedThumbnailURL = thumbnailFile ? await firebaseUploadFile(thumbnailFile, 'upload_images') : null;
        const uploadedTemplateURL = templateFile ? await firebaseUploadFile(templateFile, 'upload_template') : null;
        const uploadedExcelURL = excelFile ? await firebaseUploadFile(excelFile, 'upload_excel') : null;

        const response = await axiosInstance.put(`/admin/updateEvent`, {
          eventName: eventName,
          eventOwner: eventOwnerName,
          openDate: openDate,
          closeDate: closeDate,
          thumbnail: uploadedThumbnailURL,
          template: uploadedTemplateURL,
          excel: uploadedExcelURL,
          eventId: id.id
        });
        if (response.status === 200) {
          navigate(import.meta.env.VITE_ADMIN_PATH_HOMEPAGE);
        }
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }

  useEffect(() => {
    getEventData();
  });

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
                  แก้ไขกิจกรรม
                </Heading>
              </Stack>
              <Stack spacing={4}>
                <FormControl>
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
                    <FormControl>
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
                    <FormControl>
                      <FormLabel fontSize={["sm", "md", "md"]}>
                        สิ้นสุดการดาวน์โหลด
                      </FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size={["sm", "md", "md"]}
                        type="date"
                        format="dd/MM/yyyy"
                        value={closeDate}
                        onChange={(e) => setCloseDate(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl>
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    display="flex"
                    alignItems="center"
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
                <FormControl>
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    display="flex"
                    alignItems="center"
                  >
                    อัปโหลดเท็มเพลทใบประกาศนียบัตร
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .pdf เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setTemplateFile(file);
                      }
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={["sm", "md", "md"]}
                    display="flex"
                    alignItems="center"
                  >
                    อัปโหลดรายชื่อผู้เข้าร่วม
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .xlsx เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input type="file"
                    accept=".xlsx"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setExcelFile(file);
                      }
                    }} />
                </FormControl>
                <Flex justify={'space-between'} width={'100%'}>
                  <Button
                    loadingText="Submitting"
                    width={"49%"}
                    bg="#336699"
                    color="white"
                    _hover={{ bg: "#1F568C" }}
                    fontSize={["sm", "lg", "lg"]}
                    onClick={() => {
                      updateEventData();
                    }}
                  >
                    บันทึก
                  </Button>
                  <Button
                    loadingText="Submitting"
                    width={"49%"}
                    bg="#AD3D3B"
                    color="white"
                    _hover={{ bg: "#A80324" }}
                    fontSize={["sm", "lg", "lg"]}
                    onClick={() => {
                      navigate(import.meta.env.VITE_ADMIN_PATH_HOMEPAGE);
                    }}
                  >
                    ยกเลิก
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
export default authMiddleware(Admin_EditEvent);

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
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackBTN from "../../components/BackBTN";
import authMiddleware from "../../utils/authMiddleware";
import axiosInstance from "../../utils/axiosInstance";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../utils/firebaseConfig';

function Admin_CreateEvent() {
  const navigate = useNavigate();
  const [eventName, seteventName] = useState('');
  const [eventOwnerName, seteventOwnerName] = useState('');
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailURL, setThumbnailURL] = useState();
  const [openDate, setOpenDate] = useState();
  const [closeDate, setCloseDate] = useState();
  const [template, setTemplate] = useState();
  const [Excel, setExcel] = useState();

  function handleTemplate(e) {
    setTemplate(URL.createObjectURL(e.target.files[0]));
  }
  function handleExcel(e) {
    setExcel(URL.createObjectURL(e.target.files[0]));
  }
  const storage = getStorage(app);
  const firebaseUpload = async (file) => {
    if (file) {
      const storageRef = ref(storage, `upload_images/${file.name}`);
      await uploadBytes(storageRef, file);

      const imageURL = await getDownloadURL(storageRef);
      setThumbnailURL(imageURL)
    }
  }

  const handlesubmit = async () => {
    try {
      const response = await axiosInstance.post("/admin/createEvent", {
        eventName: eventName,
        eventOwner: eventOwnerName,
        openDate: openDate,
        closeDate: closeDate,
        thumbnail: thumbnailURL,
        template: template,
      });
      if (response.status === 200) {
        navigate(import.meta.env.VITE_ADMIN_PATH_HOMEPAGE);
      }
    } catch (error) {
      console.error("Error creating evnet:", error);
    }
  }
  return (
    <>
      <Navbar />
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Box pt={"120px"} pl={"50px"}>
          <BackBTN />
        </Box>
        <Flex minH={"80vh"} align={"center"} justify={"center"}>
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
                    onChange={(e) => seteventName(e.target.value)}
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
                    onChange={(e) => seteventOwnerName(e.target.value)}
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
                    alignItems="center"
                  >
                    อัปโหลดรูปปก
                    <Text color="#D2042D" ml={1} fontSize="xs">
                      (อัปโหลดได้เฉพาะ .png หรือ .jpg เท่านั้น)
                    </Text>
                  </FormLabel>
                  <input
                    type="file"
                    onChange={(e) => {firebaseUpload(e.target.files[0])}}
                  />
                  {/* <input type="file" onChange={handleThumbnail} /> */}
                  {/* <Img src={thumbnail} pt={2} /> */}
                  <Img src={thumbnailURL} pt={2} />
                </FormControl>
                <FormControl id="">
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
                  <input type="file" onChange={handleTemplate} />
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
                  <input type="file" onChange={handleExcel} />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg="#336699"
                    color="white"
                    _hover={{ bg: "#1F568C" }}
                    fontSize={["sm", "lg", "lg"]}
                    onClick={handlesubmit}
                  >
                    สร้างกิจกรรม
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
export default authMiddleware(Admin_CreateEvent);
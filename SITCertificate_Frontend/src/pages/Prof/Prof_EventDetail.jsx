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
import { data } from "../../utils/mockUpData";
import img from "../../assets/img/SIT_Building.png";
import authMiddleware from "../../utils/authMiddleware";

export const comment = [
  {
    id: 1,
    username: "John Doe",
    Detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    completed: true,
  },
  {
    id: 2,
    username: "Jane Doe",
    Detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis aut possimus ex labore porro cumque illo assumenda praesentium laboriosam unde suscipit eos, expedita iste aliquid tempora nemo modi doloremque cupiditate ullam, dignissimos dolores, sit sapiente!.",
    completed: false,
  },
  {
    id: 3,
    username: "Jack Doe",
    Detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis aut possimus ex labore porro cumque illo assumenda praesentium laboriosam unde suscipit eos, expedita iste aliquid tempora nemo modi doloremque cupiditate ullam, dignissimos dolores, sit sapiente! Esse facilis odio debitis animi consequuntur alias, veniam ullam blanditiis praesentium, cupiditate eius nesciunt.",
    completed: false,
  },
];

function Prof_EventDetail() {
  const { id } = useParams();
  const event = data.find((item) => item.id === id);

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
        <BackBTN />
      </Box>
      <Stack minH={"80vh"} direction={["column", "column", "row"]} mb={"50px"}>
        <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]}>
          <Text fontSize="32px" fontWeight="bold" pt="20px">
            {event.title}
          </Text>
          <Text pt="10px" pb="20px">
            เปิดให้ดาว์นโหลดตั้งแต่ {event.StartDownload} ถึง{" "}
            {event.EndedDownload}
          </Text>
          <Text pb="20px" color={event.approve ? "green" : "red"}>
            สถานะ : {event.approve ? "อนุมัติ" : "รอการอนุมัติ"}
          </Text>
          <Text fontSize="18px" fontWeight={"bold"}>
            ใบประกาศนียบัตร
          </Text>
          <Image
            width="90%"
            height={"auto"}
            src={img}
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
              {comment.map((item) => {
                return (
                  <Card p={"20px"} mb={"20px"} variant={"outline"}>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"10px"}
                    >
                      <Text fontWeight={"bold"}>{item.username}</Text>
                      <IconButton
                        isRound={true}
                        icon={<FaCheck />}
                        colorScheme={item.completed ? "green" : "gray"}
                        aria-label="Done"
                        pointerEvents={"none"}
                      />
                    </Flex>
                    <Text>{item.Detail}</Text>
                  </Card>
                );
              })}
            </Box>
            <FormControl id="comment">
              <FormLabel>New Comment</FormLabel>
              <Input mb={"10px"} placeholder="ชื่อของท่าน" isDisabled={event.approve}/>
              <Textarea placeholder="เพิ่ม comment ที่นี่" isDisabled={event.approve}/>
            </FormControl>
            <Stack spacing={6} align={"end"}>
              <Button
                isDisabled={event.approve}
                colorScheme={"blue"}
                variant={"solid"}
                padding={"20px"}
                bgColor="#3399cc"
                color="white"
                fontSize={{ base: "14px", md: "16px" }}
                borderRadius="40px"
                _hover={{ bgColor: "#297AA3" }}
              >
                เพิ่ม Comment
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
      <Footer />
    </>
  );
}
export default authMiddleware(Prof_EventDetail);

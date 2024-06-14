import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function Admin_CreateEvent() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            สร้างกิจกรรม
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="">
              <FormLabel>ชื่อกิจกรรม</FormLabel>
              <Input type="text" />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="">
                  <FormLabel>เปิดให้เริ่มดาวน์โหลด</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="">
                  <FormLabel>สิ้นสุดการดาวน์โหลด</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </FormControl>
              </Box>
            </HStack>
            <p className="bg-[#3F6593]">asda</p>
            <div className="relative overflow-hidden inline-block">
              <button className="border-2 border-gray-400 text-gray-400 bg-white py-2 px-4 rounded-md font-bold text-xl hover:bg-gray-200">
                Upload a file
              </button>
              <input
                type="file"
                onChange={handleChange}
                name="myfile"
                className="text-5xl absolute top-0 left-0 opacity-0"
              />
              {file && (
                <img src={URL.createObjectURL(file)} alt="Selected File" />
              )}
            </div>
            <FormControl id="">
              <FormLabel>อัพโหลดรูปปก</FormLabel>
              {/* <button onChange={handleChange}>Upload a file</button>
              <input type="file" onChange={handleChange} />
              <img src={file} /> */}
              
                {/* <input
                  type="file"
                  onChange={handleChange}
                  name="myfile"
                  class="text-5xl absolute top-0 left-0 opacity-0"
                />
                {file && (
                  <img src={URL.createObjectURL(file)} alt="Selected File" />
                )} */}
              
            </FormControl>
            <FormControl id="">
              {/* <FormLabel>อัพโหลดเท็มเพลทประกาศนียบัตร</FormLabel>
              <input type="file" onChange={handleChange} style={{backgroundColor:"green"}}/>
              <img src={file} /> */}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Box,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackBTN from '../../components/BackBTN'
import { data } from '../Student/Student_Homepage'
import img from '../../assets/img/SIT_Building.png'

export default function Admin_EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = data.find(item => item.id === id);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

  return (
    <>
      <Navbar />
      <Box pt={"120px"} ml={["10%","10%","5%"]}>
        <BackBTN />
      </Box>
      <Stack minH={"80vh"} direction={[ "column" , "column" ,"row"]} mb={"50px"}>
        <Flex flex={1}  direction={"column"} ml={["10%","10%","5%"]} >
          <Text fontSize="32px" fontWeight="bold" pt="20px">
            {event.title}
          </Text>
          <Text pt="10px" pb="20px">
            เปิดให้ดาว์นโหลดตั้งแต่ {event.StartDownload} ถึง{" "}
            {event.EndedDownload}
          </Text>
          <Text fontSize="18px" fontWeight={"bold"}>
            ใบประกาศนียบัตร
          </Text>
          <Box
         
          >
            <Image
              width="90%"
              height={"auto"}
              src={img}
              my={"20px"}
              boxShadow={"lg"}
            ></Image>
          </Box>
        </Flex>
        <Flex flex={1} ml={["10%","10%","0%"]}> 
          <Stack spacing={5} w={"full"} pr={"10%"}>
            <Heading fontSize={"2xl"} pt="20px">Comment</Heading>
            <FormControl id="email">
              <FormLabel>Old comment</FormLabel>
              <Input type="text" />
              {/* //card */}
            </FormControl>
            <FormControl id="password">
              <FormLabel>New Comment</FormLabel>
              <Textarea placeholder='Here is a sample placeholder' />
            </FormControl>
            <Stack spacing={6} align={"end"}>
              <Button colorScheme={"blue"} variant={"solid"} padding={"20px"} bgColor='#3399cc' color='white' fontSize={{ base: '14px', md: '16px' }} borderRadius='40px' _hover={{ bgColor: '#297AA3' }}> 
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

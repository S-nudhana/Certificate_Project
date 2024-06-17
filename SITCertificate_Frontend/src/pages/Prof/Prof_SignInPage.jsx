import React, { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, InputRightElement, InputGroup, IconButton, Stack, Link, Button, Heading, Text, useColorModeValue, useToast, FormErrorMessage } from "@chakra-ui/react";
import Building from "../../assets/img/SIT_Building.png";
import Logo from "../../assets/img/SIT_Icon.png";
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Prof_SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isFormFilled = () => email.trim() !== '' && password.trim() !== '';
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleSignIn = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      setEmail('')
      return;
    } else {
      setEmailError('');
    }

    if (true) {
      return (
        navigate(import.meta.env.VITE_PROFESSOR_PATH_HOMEPAGE)
      );
    } else {
      return (
        toast({
          title: 'Username or Password is invalid.',
          description: "โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่านของคุณ",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      );
    }
  }
  return (
    <Flex minH="100vh" align="center" justify="center" bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Building})`} bgSize="cover" bgPosition="center">
      <Stack>
        <Box borderRadius="20px" bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8} px={10}>
          <Stack align="center" spacing={5} py={5} px={1}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading fontSize={[
              "2xl",
              "3xl",
              "3xl",
            ]}>
              เข้าสู่ระบบสำหรับอาจารย์
            </Heading>
            <Text fontSize={["sm", "lg", "lg"]} color="gray.600" display="flex">
              ยินดีต้อนรับเข้าสู่&nbsp;
              <Text color="#336699" fontWeight={"600"}>
                SITCertificate
              </Text>
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={emailError}>
              <FormLabel fontSize={["sm", "lg", "lg"]}>ชื่อผู้ใช้</FormLabel>
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor={emailError ? '#D2042D' : 'gray.200'}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={["sm", "lg", "lg"]}>รหัสผ่าน</FormLabel>
              <InputGroup size='md'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton variant={'ghost'} borderLeftRadius={'0'} _hover={{ backgroundColor: 'transparent' }} icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />} onClick={handleClickShowPassword} />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack pt={"3"}>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                fontSize={["sm", "lg", "lg"]}
                isDisabled={!isFormFilled()}
                onClick={() => {
                  handleSignIn();
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'} onClick={() => {
              navigate(import.meta.env.VITE_PROFESSOR_PATH_REGISTER)
            }}>
              ยังไม่มีบัญชีผู้ใช้? <Link color={'#3399cc'}>สมัครเลย</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

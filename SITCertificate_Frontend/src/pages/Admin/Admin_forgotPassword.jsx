import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

import Building from "../../../public/img/SIT_Building.png";
import Logo from "../../../public/img/SIT_Icon.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  adminForgotPassword,
  adminResetPassword,
  adminSendResetPasswordEmail,
} from "../../api/admin/adminAPI";

export default function Admin_forgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [confirmShowPassword, setconfirmShowPassword] = useState(false);
  const [pin, setPin] = useState('');
  const handleClickConfirmShowPassword = () =>
    setconfirmShowPassword(!confirmShowPassword);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;
  const isFormFilled = () => email.trim() !== "";
  const isFormResetPasswordFilled = () =>
    newPassword.trim() !== "" && confirmNewPassword.trim() !== "";
  const [emailSent, setEmailSent] = useState(false);
  const toast = useToast();
  const handleChange = (value) => {
    setPin(value);
  };

  const handleEmail = async () => {
    if (!emailRegex.test(email)) {
      setEmailError("โปรดใช้รูปแบบอีเมลสำหรับอาจารย์และบุคลากร");
      setEmail("");
      return;
    } else {
      setEmailError("");
    }
    const res = await adminForgotPassword(email);
    if (res.status === 200) {
      const response = await adminSendResetPasswordEmail(email);
      if (response.status === 200) {
        setEmailSent(true);
      }
    } else {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: res.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const confirmCreatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "รหัสผ่านไม่ตรงกัน",
        description: "โปรดตรวจสอบรหัสผ่านของคุณอีกครั้ง",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    
    const res = await adminResetPassword(email, pin, newPassword);
    if(res.status === 200) {
        toast({
            title: "เปลี่ยนรหัสผ่านสำเร็จ",
            description: "เปลี่ยนรหัสผ่านของคุณเรียบร้อยแล้ว",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        console.log("object")
        navigate("/admin/login");
    }else {
        toast({
            title: "เกิดข้อผิดพลาด",
            description: res.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        });
    }
  };
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Building})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Stack>
        <Box
          borderRadius="20px"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
          px={10}
        >
          <Stack align="center" spacing={5} py={5} px={1}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading fontSize={["2xl", "3xl", "3xl"]}>
              ระบบเปลี่ยนรหัสผ่านสำหรับ Admin
            </Heading>
            <Text fontSize={["sm", "lg", "lg"]} color="gray.600" display="flex">
              ยินดีต้อนรับเข้าสู่&nbsp;
              <Text color="#336699" fontWeight={"600"}>
                SITCertificate
              </Text>
            </Text>
          </Stack>
          <Box display={!emailSent ? "block" : "none"}>
            <FormControl id="email" isInvalid={emailError}>
              <FormLabel fontSize={["sm", "lg", "lg"]}>อีเมล</FormLabel>
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor={emailError ? "#D2042D" : "gray.200"}
                isDisabled={emailSent}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <Stack pt={"20px"}>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                fontSize={["sm", "lg", "lg"]}
                isDisabled={!isFormFilled() || emailSent}
                onClick={() => {
                  handleEmail();
                }}
              >
                ถัดไป
              </Button>
            </Stack>
          </Box>
          <Box display={emailSent ? "block" : "none"}>
            <Box display={'flex'} justifyContent={'center'} align={'center'} gap={'10px'}>
              <PinInput otp size='lg' placeholder='-' onChange={handleChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </Box>
            <Stack align="center" spacing={5} py={5}>
              <FormControl id="password">
                <FormLabel fontSize={["sm", "lg", "lg"]}>
                  สร้างรหัสผ่านใหม่
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="สร้างรหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      borderLeftRadius={"0"}
                      _hover={{ backgroundColor: "transparent" }}
                      icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      onClick={handleClickShowPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel fontSize={["sm", "lg", "lg"]}>
                  ยืนยันรหัสผ่านใหม่
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type={confirmShowPassword ? "text" : "password"}
                    placeholder="ใส่รหัสผ่านใหม่อีกครั้ง"
                    value={confirmNewPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      borderLeftRadius={"0"}
                      _hover={{ backgroundColor: "transparent" }}
                      icon={
                        confirmShowPassword ? <FaRegEye /> : <FaRegEyeSlash />
                      }
                      onClick={handleClickConfirmShowPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                fontSize={["sm", "lg", "lg"]}
                isDisabled={!isFormResetPasswordFilled()}
                onClick={confirmCreatePassword}
              >
                ยืนยันการเปลี่ยนรหัสผ่าน
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

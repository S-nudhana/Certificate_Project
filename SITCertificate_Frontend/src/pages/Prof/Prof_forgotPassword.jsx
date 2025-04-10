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
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  PinInput,
  PinInputField,
  Link
} from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { useCustomeToast } from "../../hooks/customeToast";

import Building from "/img/SIT_Building.png";
import Logo from "/img/SIT_Icon.png";

import {
  profForgotPassword,
  profResetPassword,
  profSendResetPasswordEmail,
} from "../../services/apis/profAPI";

export default function Prof_forgotPassword() {
  const navigate = useNavigate();
  const Toast = useCustomeToast();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setconfirmShowPassword] = useState(false);
  const [pin, setPin] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [refCode, setRefCode] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmShowPassword = () => setconfirmShowPassword(!confirmShowPassword);
  const isFormFilled = () => email.trim() !== "";
  const isFormResetPasswordFilled = () => newPassword.trim() !== "" && confirmNewPassword.trim() !== "";
  const handleChange = (value) => setPin(value);;

  const handleEmail = async () => {
    try {
      if (!emailRegex.test(email)) {
        setEmailError("โปรดใช้รูปแบบอีเมลสำหรับอาจารย์และบุคลากร");
        setEmail("");
        return;
      } else {
        setEmailError("");
      }
      const res = await profForgotPassword(email);
      if (res.status === 200) {
        setRefCode(res.data.refCode);
        const response = await profSendResetPasswordEmail(email);
        if (response.status === 200) {
          setEmailSent(true);
        }
      } else {
        Toast("เกิดข้อผิดพลาด", res.response.data.message, "error");
      }
    } catch (error) {
      console.error("handleEmail error", error);
    }
  };

  const confirmCreatePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Toast("รหัสผ่านไม่ตรงกัน", "โปรดตรวจสอบรหัสผ่านของคุณอีกครั้ง", "error");
        return;
      }
      const res = await profResetPassword(email, pin, newPassword, refCode);
      if (res.status === 200) {
        Toast("เปลี่ยนรหัสผ่านสำเร็จ", "เปลี่ยนรหัสผ่านของคุณเรียบร้อยแล้ว", "success");
        navigate("/professor/login");
      } else {
        Toast("เกิดข้อผิดพลาด", res.response.data.message, "error");
      }
    } catch (error) {
      console.error("confirmCreatePassword error", error);
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
        >
          <Stack align="center" spacing={5} p={5}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading fontSize={["20px", "3xl", "3xl"]}>
              ระบบเปลี่ยนรหัสผ่านสำหรับอาจารย์
            </Heading>
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
              <Text fontSize={["sm", "md", "md"]}>
                รหัสอ้างอิง : {refCode}
              </Text>
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
          <Stack pt={6}>
            <Text display={'flex'} justifyContent={'end'} alignItems={'center'} color={'#3399cc'} onClick={() => {
              navigate("/professor/login")
            }}>
              <Link color={'#3399cc'} pl={'3px'}> กลับไปยังหน้าเข้าสู่ระบบ </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

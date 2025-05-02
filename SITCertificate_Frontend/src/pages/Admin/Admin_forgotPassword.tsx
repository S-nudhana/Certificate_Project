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
  Link,
  Spinner,
} from "@chakra-ui/react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Building from "/img/SIT_Building.png";
import Logo from "/img/SIT_Icon.png";

import { useCustomeToast } from "../../hooks/customeToast";

import {
  adminForgotPassword,
  adminResetPassword,
  adminSendResetPasswordEmail,
} from "../../services/apis/adminAPI";

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const Toast = useCustomeToast();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setNewConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmShowPassword = () =>
    setConfirmShowPassword(!confirmShowPassword);
  const isFormFilled = () => email.trim() !== "";
  const isFormResetPasswordFilled = () =>
    newPassword.trim() !== "" && confirmNewPassword.trim() !== "";

  const handleChange = (value: string) => setPin(value);

  const handleEmail = async () => {
    try {
      if (!emailRegex.test(email)) {
        setEmailError("โปรดใช้รูปแบบอีเมลสำหรับอาจารย์และบุคลากร");
        setEmail("");
        return;
      } else {
        setEmailError("");
      }
      setLoading(true);
      const res = await adminForgotPassword(email);
      if (res.status === 200) {
        setRefCode(res.data.data.refCode);
        const response = await adminSendResetPasswordEmail(email);
        if (response.status === 200) {
          setEmailSent(true);
          setLoading(false);
          Toast("ส่งรหัสยืนยันการเปลี่ยนรหัสผ่านไปยังอีเมลสำเร็จ", "กรุณาตรวจสอบอีเมลของคุณ", "success");
        }
      } else {
        Toast("เกิดข้อผิดพลาด", res.response.data.message, "error");
        setLoading(false);
      }
    } catch (error) {
      console.error("handleEmail error", error);
    }
  };

  const confirmCreatePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Toast(
          "รหัสผ่านไม่ตรงกัน",
          "โปรดตรวจสอบรหัสผ่านของคุณอีกครั้ง",
          "error"
        );
        return;
      }
      setLoading(true);
      const res = await adminResetPassword(email, pin, newPassword, refCode);
      if (res.status === 200) {
        setLoading(false);
        navigate("/admin/login");
        Toast(
          "เปลี่ยนรหัสผ่านสำเร็จ",
          "เปลี่ยนรหัสผ่านของคุณเรียบร้อยแล้ว",
          "success"
        );
      } else {
        setLoading(false);
        Toast("เกิดข้อผิดพลาด", res.data.message, "error");
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
          <Stack align="center" spacing={5} p={2}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading fontSize={["20px", "3xl", "3xl"]}>
              ระบบเปลี่ยนรหัสผ่านสำหรับ Admin
            </Heading>
          </Stack>
          <Box display={!emailSent ? "block" : "none"}>
            <FormControl id="email" isInvalid={emailError !== ""}>
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
                onClick={() => handleEmail()}
              >
                ถัดไป
              </Button>
            </Stack>
          </Box>
          <Box display={emailSent ? "block" : "none"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
            >
              <PinInput otp size="lg" placeholder="-" onChange={handleChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </Box>
            <Stack align="center" spacing={5} py={5}>
              <Text fontSize={["sm", "md", "md"]}>รหัสอ้างอิง : {refCode}</Text>
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                      aria-label={
                        confirmShowPassword ? "Hide password" : "Show password"
                      }
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
            <Text
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
              color={"#3399cc"}
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              <Link color={"#3399cc"} pl={"3px"}>
                {" "}
                กลับไปยังหน้าเข้าสู่ระบบ{" "}
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
      {loading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" color="#336699" thickness="4px" />
        </Box>
      )}
    </Flex>
  );
};

export default AdminForgotPassword;

import { useState, KeyboardEvent } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Link,
  Button,
  IconButton,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useCustomeToast } from "../../hooks/customeToast";

import Building from "/img/SIT_Building.png";
import Logo from "/img/SIT_Icon.png";

import { adminSignIn } from "../../apis/adminAPI";

function Admin_SignInPage() {
  const Toast = useCustomeToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isFormFilled = (): boolean => email.trim() !== "" && password.trim() !== "";
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSignIn = async () => {
    try {
      if (!emailRegex.test(email)) {
        setEmailError("โปรดใช้รูปแบบอีเมลสำหรับอาจารย์และบุคลากร");
        setEmail("");
        return;
      } else {
        setEmailError("");
      }
      const res = await adminSignIn(email, password);
      if (res.status === 201) {
        navigate("/admin/");
        Toast("เข้าสู่ระบบสำเร็จ", "ท่านได้เข้าสู่ระบบสำเร็จ", "success");
      } else {
        Toast("เกิดข้อผิดพลาด", res.data.message, "error");
      }
    } catch (error: any) {
      console.error("handleSignIn error", error);
      Toast("ข้อผิดพลาด", error?.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้", "error");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSignIn();
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
              เข้าสู่ระบบสำหรับ Admin
            </Heading>
            <Text fontSize={["sm", "lg", "lg"]} color="gray.600" display="flex">
              ยินดีต้อนรับเข้าสู่&nbsp;
              <Text color="#336699" fontWeight={"600"}>
                SITCertificate
              </Text>
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!!emailError}>
              <FormLabel fontSize={["sm", "lg", "lg"]}>อีเมล</FormLabel>
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor={emailError ? "#D2042D" : "gray.200"}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={["sm", "lg", "lg"]}>รหัสผ่าน</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน"
                  value={password}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="toggle password visibility"
                    variant="ghost"
                    borderLeftRadius="0"
                    _hover={{ backgroundColor: "transparent" }}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    onClick={handleClickShowPassword}
                  />
                </InputRightElement>
              </InputGroup>
              <Text
                align="right"
                ml="auto"
                width="70px"
                mt="10px"
                fontSize="14px"
                onClick={() => navigate("/admin/forgotpassword")}
              >
                <Link color="#3399cc">ลืมรหัสผ่าน?</Link>
              </Text>
            </FormControl>
            <Stack>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                fontSize={["sm", "lg", "lg"]}
                isDisabled={!isFormFilled()}
                onClick={handleSignIn}
              >
                เข้าสู่ระบบ
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align="center" onClick={() => navigate("/admin/register")}>
              ยังไม่มีบัญชีผู้ใช้? <Link color="#3399cc">สมัครเลย</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Admin_SignInPage;

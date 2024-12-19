import { useState } from "react";
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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import Building from "../../../public/img/SIT_Building.png"
import Logo from "../../../public/img/SIT_Icon.png";

import { adminSignIn } from "../../api/admin/adminAPI";

export default function Admin_SignInPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

  const isFormFilled = () => email.trim() !== "" && password.trim() !== "";
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: res.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("handleEmail error", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
            <FormControl id="email" isInvalid={emailError}>
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
                    variant={"ghost"}
                    borderLeftRadius={"0"}
                    _hover={{ backgroundColor: "transparent" }}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    onClick={handleClickShowPassword}
                  />
                </InputRightElement>
              </InputGroup>
              <Text
                align={"right"}
                ml={"auto"}
                width={'70px'}
                mt={'10px'}
                fontSize={'14px'}
                onClick={() => {
                  navigate("/admin/forgotpassword");
                }}
              >
                <Link color={"#3399cc"}>ลืมรหัสผ่าน?</Link>
              </Text>
            </FormControl>
            <Stack>
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
            <Text
              align={"center"}
              onClick={() => {
                navigate("/admin/register");
              }}
            >
              ยังไม่มีบัญชีผู้ใช้? <Link color={"#3399cc"}>สมัครเลย</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

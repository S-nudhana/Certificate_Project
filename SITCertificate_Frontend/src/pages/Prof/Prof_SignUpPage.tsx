import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import Building from "/img/SIT_Building.png";
import Logo from "/img/SIT_Icon.png";

import { useCustomeToast } from "../../hooks/customeToast";

import { profSignUp } from "../../apis/profAPI";

interface FormState {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Prof_SignUpPage() {
  const navigate = useNavigate();
  const Toast = useCustomeToast();

  const [formState, setFormState] = useState<FormState>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isFormFilled = () =>
    formState.username.trim() !== "" &&
    formState.firstname.trim() !== "" &&
    formState.lastname.trim() !== "" &&
    formState.email.trim() !== "" &&
    formState.password.trim() !== "" &&
    formState.confirmPassword.trim() !== "";

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmShowPassword = () =>
    setConfirmShowPassword(!confirmShowPassword);

  const handleSignUp = async () => {
    try {
      if (!emailRegex.test(formState.email)) {
        setEmailError("โปรดใช้รูปแบบอีเมลสำหรับอาจารย์และบุคลากร");
        setFormState((prevState) => ({ ...prevState, email: "" }));
        return;
      } else {
        setEmailError("");
      }
      if (formState.password !== formState.confirmPassword) {
        Toast(
          "รหัสผ่านไม่ตรงกัน",
          "โปรดตรวจสอบรหัสผ่านของคุณอีกครั้ง",
          "error"
        );
        return;
      }
      const fullname = `${formState.firstname} ${formState.lastname}`;
      const res = await profSignUp(
        formState.username,
        fullname,
        formState.email,
        formState.password
      );
      if (res.status === 201) {
        Toast(
          "สร้างบัญชีผู้ใช้สำเร็จ",
          "สร้างบัญชีของคุณเรียบร้อยแล้ว",
          "success"
        );
        navigate("/professor/login");
      } else {
        Toast("เกิดข้อผิดพลาด", res.data.message, "error");
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
          my={12}
        >
          <Stack align="center" spacing={5} py={5} px={1}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading fontSize={["2xl", "3xl", "3xl"]}>
              ลงทะเบียนสำหรับอาจารย์
            </Heading>
            <Text fontSize={["sm", "lg", "lg"]} color="gray.600" display="flex">
              ยินดีต้อนรับเข้าสู่&nbsp;
              <Text color="#336699" fontWeight={"600"}>
                SITCertificate
              </Text>
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="Text">
              <FormLabel fontSize={["sm", "lg", "lg"]}>ชื่อผู้ใช้</FormLabel>
              <Input
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={formState.username}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl id="firstname">
              <FormLabel fontSize={["sm", "lg", "lg"]}>ชื่อจริง</FormLabel>
              <Input
                type="text"
                placeholder="ชื่อจริง"
                value={formState.firstname}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    firstname: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel fontSize={["sm", "lg", "lg"]}>นามสกุล</FormLabel>
              <Input
                type="text"
                placeholder="นามสกุล"
                value={formState.lastname}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    lastname: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl id="email" isInvalid={!!emailError}>
              <FormLabel fontSize={["sm", "lg", "lg"]}>อีเมล</FormLabel>
              <Input
                type="email"
                placeholder="อีเมล"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                borderColor={emailError ? "#D2042D" : "gray.200"}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={["sm", "lg", "lg"]}>รหัสผ่าน</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="สร้างรหัสผ่าน"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
                <InputRightElement>
                  <IconButton
                    variant={"ghost"}
                    borderLeftRadius={"0"}
                    _hover={{ backgroundColor: "transparent" }}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    onClick={handleClickShowPassword}
                    aria-label="Toggle password visibility"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel fontSize={["sm", "lg", "lg"]}>
                ยืนยันรหัสผ่าน
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="ใส่รหัสผ่านอีกครั้ง"
                  value={formState.confirmPassword}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value,
                    }))
                  }
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
                    aria-label="Toggle confirm password visibility"
                  />
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
                onClick={handleSignUp}
              >
                ลงทะเบียน
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"} onClick={() => navigate("/professor/login")}>
              มีบัญชีผู้ใช้อยู่แล้ว? <Link color={"#3399cc"}>เข้าสู่ระบบ</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

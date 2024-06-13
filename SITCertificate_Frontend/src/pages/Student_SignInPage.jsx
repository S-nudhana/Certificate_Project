import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Building from "../assets/img/SIT_Building.png";
import Logo from "../assets/img/logo-flat-blk.png";

export default function Student_SignInPage() {
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
          <Stack align="center" spacing={5} py={5} px={8}>
            <img src={Logo} alt="SIT_Logo" width="100" height="100" />
            <Heading
              fontSize={[ // Array for different screen sizes
                "3xl", // Up to small devices
                "4xl", // Medium devices
                "4xl", // Large devices
              ]}
            >
              เข้าสู่ระบบ
            </Heading>
            <Text fontSize={["sm","lg","lg"]} color="gray.600" display="flex">
              ยินดีต้อนรับเข้าสู่&nbsp;
              <Text color="#336699" fontWeight={"600"}>SITCertificate</Text>
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel fontSize={["sm","lg","lg"]}>ชื่อผู้ใช้</FormLabel>
              <Input type="email" placeholder="อีเมลล์" />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={["sm","lg","lg"]}>รหัสผ่าน</FormLabel>
              <Input type="password" placeholder="เบอร์โทรศัพท์" />
            </FormControl>
            <Stack pt={"3"}>
              <Button
                bg="#336699"
                color="white"
                _hover={{ bg: "#1F568C" }}
                fontSize={["sm","lg","lg"]}
              >
                เข้าสู่ระบบ
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

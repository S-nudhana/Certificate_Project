import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "/img/SIT_logo.png";

import { userVerifyToken, userDeleteToken } from "../apis/userAPI";

export default function Navbar() {
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [shouldShowNavbar, setShouldShowNavbar] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<string | null>(null);

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setShouldShowNavbar(false);
    } else {
      setShouldShowNavbar(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    setShouldShowNavbar(currentScrollTop < 30);
  };

  useEffect(() => {
    verifyAuth();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const verifyAuth = async () => {
    try {
      const res = await userVerifyToken();
      if ("data" in res) {
        setAuthStatus(res.data.data.authenticated);
        setAuthRole(res.data.data.role);
      } else {
        setAuthStatus(res.authenticated);
        setAuthRole(null);
      }
    } catch (error) {
      console.error("Verify token error:", error);
    }
  };

  const LogoutCheck = async (): Promise<string> => {
    if (authStatus) {
      try {
        await userDeleteToken();
        if (location.pathname.startsWith("/professor") && authRole === "professor") {
          return "/professor/login";
        } else if (location.pathname.startsWith("/admin") && authRole === "admin") {
          return "/admin/login";
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    return "/login";
  };

  return (
    <Box
      bgColor="#222222"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={{ base: "20px", md: "15px 50px" }}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      transition="top 0.3s"
      {...(shouldShowNavbar ? {} : { top: "-80px" })}
    >
      <Box cursor="pointer" onClick={() => navigate("/")}>
        <Image src={logo} width="180px" />
      </Box>
      <Flex gap={{ base: "10px", md: "30px" }}>
        <Button
          leftIcon={<FaArrowRightFromBracket />}
          bgColor="#A62C2C"
          color="white"
          size="md"
          display={{ base: "none", md: "flex" }}
          variant="solid"
          onClick={onOpen}
          _hover={{ bgColor: "#A80324" }}
        >
          ออกจากระบบ
        </Button>
        <IconButton
          aria-label="logout"
          justifyContent="center"
          bgColor="#A62C2C"
          color="white"
          display={{ base: "flex", md: "none" }}
          _hover={{ bgColor: "#A80324" }}
          icon={<FaArrowRightFromBracket />}
          onClick={onOpen}
        />
      </Flex>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={["xs", "sm", "sm"]}>
          <ModalOverlay />
          <ModalContent py={["5", "7", "7"]}>
            <ModalHeader textAlign="center">ยืนยันที่จะออกจากระบบ?</ModalHeader>
            <ModalBody>
              <Flex justifyContent="center">
                <Button
                  mr={3}
                  color="white"
                  backgroundColor="#A62C2C"
                  _hover={{ bgColor: "#A80324" }}
                  borderRadius="30"
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
                <Button
                  color="white"
                  backgroundColor="#336699"
                  borderRadius="30"
                  _hover={{ bgColor: "#1f568c" }}
                  onClick={async () => {
                    const redirectPath = await LogoutCheck();
                    window.location.href = redirectPath;
                  }}
                >
                  ตกลง
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

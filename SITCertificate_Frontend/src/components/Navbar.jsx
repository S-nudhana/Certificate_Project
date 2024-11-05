import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
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

import { userVerifyToken, userDeleteToken } from "../api/user/userAPI";

export default function Navbar() {
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(null);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setShouldShowNavbar(false);
    } else {
      setShouldShowNavbar(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    verifyAuth();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const verifyAuth = async () => {
    const response = await userVerifyToken();
    setAuthStatus(response.status === 200 ? response.data : response);
  };

  const LogoutCheck = async () => {
    if (authStatus.authenticated) {
      try {
        let redirectPath = "/login";
        if (location.pathname.startsWith("/professor") && authStatus.role === "professor") {
          redirectPath = "/professor/login";
        } else if (location.pathname.startsWith("/admin") && authStatus.role === "admin") {
          redirectPath = "/admin/login";
        }
        await userDeleteToken("token");
        window.location.href = redirectPath;
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };
  

  return (
    <Box
      bgColor="#0c2d4e"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="20px 50px"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      transition="top 0.3s"
      {...(shouldShowNavbar ? {} : { top: "-80px" })}
    >
      <Text color="white" fontWeight="bold" fontSize="24" cursor={'pointer'}>
        SITCertificate
      </Text>
      <Flex gap={{ base: '10px', md: "30px" }}>
        <Button
          leftIcon={<FaArrowRightFromBracket />}
          bgColor="#336699"
          color="white"
          size="md"
          display={{ base: "none", md: "flex" }}
          variant="solid"
          onClick={onOpen}
          _hover={{ bgColor: "#1f568c" }}
        >
          ออกจากระบบ
        </Button>
        <IconButton
          justifyContent="center"
          bgColor="#336699"
          color="white"
          display={{ base: "flex", md: "none" }}
          _hover={{ bgColor: "#1f568c" }}
          icon={<FaArrowRightFromBracket />}
          onClick={onOpen}
        />
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["xs", "sm", "sm"]}
      >
        <ModalOverlay />
        <ModalContent py={["5", "7", "7"]}>
          <ModalHeader textAlign={"center"}>ยืนยันที่จะออกจากระบบ?</ModalHeader>
          <ModalBody>
            <Flex justifyContent="center">
              <Button
                mr={3}
                color="white"
                backgroundColor={"#AD3D3B"}
                _hover={{ bgColor: "#A80324" }}
                borderRadius={"30"}
                onClick={onClose}
              >
                ยกเลิก
              </Button>
              <Button
                color="white"
                backgroundColor={"#336699"}
                borderRadius={"30"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => {
                  navigate(LogoutCheck());
                }}
              >
                ตกลง
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

import React, { useState } from "react";
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
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      setShouldShowNavbar(false);
    } else {
      setShouldShowNavbar(true);
    }

    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

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
      <Text color="white" fontWeight="bold" fontSize="24">
        SITCertificate
      </Text>
      <Button
        leftIcon={<FaArrowRight />}
        bgColor="#336699"
        color="white"
        size="md"
        display={{ base: "none", md: "flex" }}
        C
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
        icon={<FaArrowRight />}
        onClick={onOpen}

      />
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
              <Box mr={3}>
                <Button
                  color="white"
                  backgroundColor={"#AD3D3B"}
                  _hover={{ bgColor: "#A80324" }}
                  borderRadius={"30"}
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
              </Box>
              <Button
                color="white"
                backgroundColor={"#336699"}
                borderRadius={"30"}
                _hover={{ bgColor: "#1f568c" }}
                onClick={() => {
                    Cookies.remove("token");
                    navigate("/");
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

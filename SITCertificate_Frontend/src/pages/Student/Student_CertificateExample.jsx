import React from 'react'
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom'
import { Box, Button, Text, Image, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, Flex, useDisclosure } from '@chakra-ui/react'
import img from '../../assets/img/SIT_Building.png'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Student_CertificateExample() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt='80px' display='flex' flexDirection='column' alignItems='center'>
                <Text fontSize='32px' fontWeight='bold' py='40px'>ตัวอย่างใบประกาศนียบัตร</Text>
                <Image width='60%' pb='40px' src={img}></Image>
                <Box width='80%' display='flex' justifyContent='space-between' pb='40px'>
                    <Button width='100px' bgColor='#3399cc' color='white' borderRadius='40px' _hover={{ bgColor: '#297AA3' }} variant='solid' onClick={() => {
                        navigate(-1)
                    }}>ย้อนกลับ</Button>
                    <Button width='200px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' onClick={onOpen} >พิมพ์ใบประกาศนียบัตร</Button>
                </Box>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={["xs", "sm", "sm"]}
            >
                <ModalOverlay />
                <ModalContent py={["5", "7", "7"]}>
                    <ModalHeader textAlign={"center"} fontWeight={"bold"} fontSize={{ base: "16px", md: '20px' }}>ยืนยันที่จะพิมพ์ใบประกาศนียบัตรหรือไม่?</ModalHeader>
                    <ModalBody>
                        <Text pb={'7'} fontSize={{ base: "14px", md: '16px' }}>กรุณาตรวจสอบชื่อจริงและนามสกุลของท่าน เมื่อกดยืนยันแล้วจะไม่สามารถกลับมาแก้ไขได้</Text>
                        <Flex justifyContent="center">
                            <Button
                                mr={3}
                                color="white"
                                backgroundColor={"#336699"}
                                borderRadius={"30"}
                                _hover={{ bgColor: "#1f568c" }}
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                ตกลง
                            </Button>
                            <Button
                                color="white"
                                backgroundColor={"#AD3D3B"}
                                _hover={{ bgColor: "#A80324" }}
                                borderRadius={"30"}
                                onClick={onClose}
                            >
                                ยกเลิก
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    )
}

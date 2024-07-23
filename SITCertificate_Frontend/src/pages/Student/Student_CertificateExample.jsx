import { useEffect, useState } from 'react';
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom';
import { Box, Button, Text, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, Flex, useDisclosure, Center } from '@chakra-ui/react';
import PDF from 'react-pdf-watermark';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import authMiddleware from "../../utils/authMiddleware";
import axiosInstance from '../../utils/axiosInstance';

function Student_CertificateExample() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [certificate, setCertificate] = useState();

    const getCertificate = async () => {
        const response = await axiosInstance.get(`/student/certificate?id=${id}`);
        setCertificate(response.data.data.event_Certificate);
    }

    const updateStudentGenerate = async () => {
        const response = await axiosInstance.put(`/student/generated?id=${id}`);
        if (response.data.success) {
            navigate(`/download/${id}`);
        }
    }

    const getStudentGenerate = async () => {
        const response = await axiosInstance.get(`/student/generate?id=${id}`);
        console.log(response.data.data.student_eventGenerated)
        if(response.data.data.student_eventGenerated === 1){
            navigate(`/detail/${id}`);
        }
      };

    useEffect(() => {
        getCertificate();
        getStudentGenerate();
    }, []);

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt='80px' display='flex' flexDirection='column' alignItems='center' justifyContent={'center'}>
                <Text pb={'20px'} fontSize='32px' fontWeight='bold' pt='40px'>ตัวอย่างใบประกาศนียบัตร</Text>
                <Flex width={{ base: '150%', md: '100%' }} justifyContent={'center'}>
                    {certificate &&
                        <PDF
                            canvasWidth={'50%'}
                            canvasHeight={'auto'}
                            file={certificate}
                            watermark={"SITCertificate"}
                            watermarkOptions={{
                                transparency: 0.5,
                                fontSize: 140,
                                fontStyle: 'Bold',
                                fontFamily: 'Arial'
                            }}
                        />
                    }
                </Flex>
                <Box pt={'20px'} width='80%' display='flex' justifyContent='space-between' pb='40px'>
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
                    <ModalBody textAlign={"center"}>
                        <Text pb={'7'} fontSize={{ base: "14px", md: '16px' }}>กรุณาตรวจสอบชื่อจริงและนามสกุลของท่าน <br /> เมื่อกดยืนยันแล้วจะไม่สามารถกลับมาแก้ไขได้</Text>
                        <Flex justifyContent="center">
                            <Button
                                mr={3}
                                color="white"
                                backgroundColor={"#336699"}
                                borderRadius={"30"}
                                _hover={{ bgColor: "#1f568c" }}
                                onClick={() => {
                                    updateStudentGenerate();
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
    );
}
export default authMiddleware(Student_CertificateExample);
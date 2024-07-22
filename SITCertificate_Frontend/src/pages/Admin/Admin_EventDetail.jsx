import { useEffect, useState } from 'react';
import {
    Flex,
    Heading,
    Stack,
    Button,
    Box,
    Text,
    Card,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Tooltip
} from "@chakra-ui/react";
import { useParams, ScrollRestoration, useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackBTN from '../../components/BackBTN';
import PdfViewer from '../../components/PdfViewer';
import authMiddleware from "../../utils/authMiddleware";
import { dateFormatChange } from '../../utils/function';
import axiosInstance from '../../utils/axiosInstance';

function Admin_EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventData, setEventData] = useState();
    const [comments, setComments] = useState();
    const getEventData = async () => {
        const response = await axiosInstance.get(`/user/event?id=${id}`);
        setEventData(response.data.data);
    };
    const getComment = async () => {
        const response = await axiosInstance.get(`/user/comment?id=${id}`);
        setComments(response.data.data);
    }
    const toggleCommentStatus = async (commentId) => {
        const response = await axiosInstance.put(`/prof/updateCommentStatus`, {
            commentId: commentId,
        });
        if (response.data.success) {
            getComment();
            sendEmail();
        }
    }
    const deleteEvent = async () => {
        const response = await axiosInstance.delete(`/admin/deleteEvent?id=${id}`);
        if (response.data.success) {
            onClose();
            navigate(import.meta.env.VITE_ADMIN_PATH_HOMEPAGE);
        }
    }
    useEffect(() => {
        getEventData();
        getComment();
    }, []);
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
                <BackBTN />
            </Box>
            {eventData && comments && (
                <>
                    <Stack width={'100%'} direction={["column", "column", "row"]} mb={"50px"} justifyContent={'center'} pt="20px">
                        <Flex width={{ base: '80%', md: '50%' }} direction={"column"} ml={["10%", "10%", "5%"]} >
                            <Text fontSize="32px" fontWeight="bold" >
                                {eventData.event_name}
                            </Text>
                            <Text fontSize="18px" fontWeight="bold">
                                โดย {eventData.event_owner}
                            </Text>
                            <Text pt="10px" pb="10px">
                                เปิดให้ดาว์นโหลดตั้งแต่ {dateFormatChange(eventData.event_startDate)} ถึง {dateFormatChange(eventData.event_endDate)}
                            </Text>
                            <Text pb="20px" color={eventData.event_approve ? "green" : "red"}>
                                สถานะ : {eventData.event_approve ? "อนุมัติ" : "รอการอนุมัติ"}
                            </Text>
                            <Text fontSize="18px" fontWeight={"bold"}>
                                ใบประกาศนียบัตร
                            </Text>
                            <PdfViewer fileUrl={eventData.event_certificate} />
                            <Button mt={'15px'} mb={'20px'} width={'280px'} color={'white'} bgColor={'#3399cc'} _hover={{ bgColor: '#297AA3' }} as="a" href={eventData.event_certificate} download={`${eventData.event_name}_certificate.pdf`}>
                                ดาวน์โหลดเทมเพลทใบประกาศนียบัตร
                            </Button>
                            <Flex width={{ base: '80%', md: '50%' }} gap={'10px'}>
                                <Text fontSize="18px" fontWeight={"bold"}>
                                    รายชื่อผู้เข้าร่วม:
                                </Text>
                                <Tooltip hasArrow placement='right' label='คลิกเพื่อดาวน์โหลด' bg='gray.100' p={'5px'} color='black'>
                                    <Button variant={'link'} color={'#919191'} as="a" href={eventData.event_excel} download={`${eventData.event_name}_Excel.pdf`}>
                                        รายชื่อ.xls
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Flex>
                        <Flex flex={1} ml={["10%", "10%", "0%"]} width={'50%'}>
                            <Stack spacing={5} w={"full"} pr={"10%"}>
                                <Heading fontSize={"2xl"} pt={{ base: '20px', md: '0' }}>ความคิดเห็น</Heading>
                                <Box width={'100%'}>
                                    {comments.map((item) => (
                                        <Card p={'20px'} mb={'20px'} variant={'outline'} key={item.id}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'} gap={'10px'}>
                                                <Text fontWeight={'bold'}>{item.comment_username}</Text>
                                                <IconButton
                                                    isRound={true}
                                                    variant='solid'
                                                    colorScheme={item.comment_status ? 'green' : 'gray'}
                                                    aria-label='Done'
                                                    fontSize='16px'
                                                    icon={<FaCheck />}
                                                    pointerEvents={eventData.event_approve === 1 ? 'none' : 'auto'}
                                                    onClick={() => {
                                                        toggleCommentStatus(item.comment_Id)
                                                    }}
                                                />
                                            </Flex>
                                            <Text pt={'10px'}>{item.comment_detail}</Text>
                                        </Card>
                                    ))}
                                </Box>
                            </Stack>
                        </Flex>
                    </Stack>
                    <Flex pb={'20px'} width={'95%'} justifyContent={'flex-end'}>
                        <Button isDisabled={eventData.event_approve === 1} borderRadius={"40px"} color={'white'} backgroundColor={"#AD3D3B"} _hover={{ bgColor: "#A80324" }} onClick={onOpen}>ลบกิจกรรม</Button>
                    </Flex>
                </>
            )}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={["xs", "sm", "sm"]}
            >
                <ModalOverlay />
                <ModalContent py={["5", "7", "7"]}>
                    <ModalHeader textAlign={"center"}>ยืนยันที่จะลบกิจกรรม?</ModalHeader>
                    <ModalBody>
                        <Flex justifyContent="center">
                            <Button
                                mr={3}
                                color="white"
                                backgroundColor={"#336699"}
                                borderRadius={"30"}
                                _hover={{ bgColor: "#1f568c" }}
                                onClick={() => {
                                    deleteEvent();
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

export default authMiddleware(Admin_EventDetail);

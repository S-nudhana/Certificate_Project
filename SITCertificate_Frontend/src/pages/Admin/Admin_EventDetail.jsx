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
} from "@chakra-ui/react";
import { useParams, ScrollRestoration } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackBTN from '../../components/BackBTN';
import PdfViewer from '../../components/PdfViewer';
import authMiddleware from "../../utils/authMiddleware";
import { dateFormatChange } from '../../utils/function';
import axiosInstance from '../../utils/axiosInstance';
import certificate from '../../assets/note.pdf'

function Admin_EventDetail() {
    const { id } = useParams();
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
                <Stack direction={["column", "column", "row"]} mb={"50px"} justifyContent={'center'} pt="20px">
                    <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]} >
                        <Text fontSize="32px" fontWeight="bold" >
                            {eventData.event_name}
                        </Text>
                        <Text fontSize="18px" fontWeight="bold">
                            {eventData.event_owner}
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
                        <PdfViewer fileUrl={certificate} />
                        <Button mt={'15px'} color={'white'} bgColor={'#3399cc'} _hover={{ bgColor: '#297AA3' }} width={'200px'} as="a" href={certificate} download={`${eventData.event_name}certificate.pdf`}>
                            ดาวน์โหลดเทมเพลท PDF
                        </Button>
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
            )}
            <Footer />
        </>
    );
}

export default authMiddleware(Admin_EventDetail);

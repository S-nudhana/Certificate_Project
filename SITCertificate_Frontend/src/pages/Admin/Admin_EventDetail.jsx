import { useEffect, useState } from 'react';
import {
    Flex,
    Heading,
    Stack,
    Image,
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
import authMiddleware from "../../utils/authMiddleware";
import { dateFormatChange } from '../../utils/function';
import axiosInstance from '../../utils/axiosInstance';

function Admin_EventDetail() {
    const { id } = useParams();
    const [eventData, setEventData] = useState();
    const getEventData = async () => {
        const response = await axiosInstance.get(`/user/event?id=${id}`);
        setEventData(response.data.data);
    };
    useEffect(() => {
        getEventData()
    }, []);
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
                <BackBTN />
            </Box>
            {eventData && (
                <Stack minH={"80vh"} direction={["column", "column", "row"]} mb={"50px"}>
                <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]} >
                    <Text fontSize="32px" fontWeight="bold" pt="20px">
                        {eventData.event_name}
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
                    <Image
                        width="90%"
                        height={"auto"}
                        src={eventData.thumbnail}
                        my={"20px"}
                        boxShadow={"lg"}
                    ></Image>
                </Flex>
                <Flex flex={1} ml={["10%", "10%", "0%"]}>
                    <Stack spacing={5} w={"full"} pr={"10%"}>
                        <Heading fontSize={"2xl"} pt="20px">Comment</Heading>
                        <Box width={'100%'}>
                            {/* {comments.map((item) => (
                                <Card p={'20px'} mb={'20px'} variant={'outline'} key={item.id}>
                                    <Flex alignItems={'center'} justifyContent={'space-between'} gap={'10px'}>
                                        <Text fontWeight={'bold'}>{item.username}</Text>
                                        <IconButton
                                            isRound={true}
                                            variant='solid'
                                            colorScheme={item.completed ? 'green' : 'gray'}
                                            aria-label='Done'
                                            fontSize='16px'
                                            icon={<FaCheck />}
                                            onClick={() => toggleCommentCompletion(item.id)}
                                        />
                                    </Flex>
                                    <Text>{item.Detail}</Text>
                                </Card>
                            ))} */}
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

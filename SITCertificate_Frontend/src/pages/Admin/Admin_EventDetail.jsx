import React, { useState } from 'react';
import {
    Flex,
    Heading,
    Stack,
    Image,
    Box,
    Text,
    Card,
    IconButton,
    useToast
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackBTN from '../../components/BackBTN';
import { data } from '../Student/Student_Homepage';
import img from '../../assets/img/SIT_Building.png';
import { comment } from '../Prof/Prof_EventDetail';
import authMiddleware from "../../utils/authMiddleware";

function Admin_EventDetail() {
    const { id } = useParams();
    const event = data.find(item => item.id === id);
    const [comments, setComments] = useState(comment);

    const toggleCommentCompletion = (commentId) => {
        setComments(comments.map(comment =>
            comment.id === commentId
                ? { ...comment, completed: !comment.completed }
                : comment
        ));
    };

    return (
        <>
            <Navbar />
            <Box pt={"120px"} ml={["10%", "10%", "5%"]}>
                <BackBTN />
            </Box>
            <Stack minH={"80vh"} direction={["column", "column", "row"]} mb={"50px"}>
                <Flex flex={1} direction={"column"} ml={["10%", "10%", "5%"]} >
                    <Text fontSize="32px" fontWeight="bold" pt="20px">
                        {event.title}
                    </Text>
                    <Text pt="10px" pb="20px">
                        เปิดให้ดาว์นโหลดตั้งแต่ {event.StartDownload} ถึง {event.EndedDownload}
                    </Text>
                    <Text fontSize="18px" fontWeight={"bold"}>
                        ใบประกาศนียบัตร
                    </Text>
                    <Image
                        width="90%"
                        height={"auto"}
                        src={img}
                        my={"20px"}
                        boxShadow={"lg"}
                    ></Image>
                </Flex>
                <Flex flex={1} ml={["10%", "10%", "0%"]}>
                    <Stack spacing={5} w={"full"} pr={"10%"}>
                        <Heading fontSize={"2xl"} pt="20px">Comment</Heading>
                        <Box width={'100%'}>
                            {comments.map((item) => (
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
                            ))}
                        </Box>
                    </Stack>
                </Flex>
            </Stack>
            <Footer />
        </>
    );
}

export default authMiddleware(Admin_EventDetail);

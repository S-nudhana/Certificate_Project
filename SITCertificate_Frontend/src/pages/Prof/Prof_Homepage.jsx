import React from 'react'
import { Box, Text, Image, Card, Button } from '@chakra-ui/react';
import { useNavigate, ScrollRestoration } from 'react-router-dom';

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { data } from '../Student/Student_Homepage';
import authMiddleware from "../../utils/authMiddleware";

function Prof_Homepage() {
    const navigate = useNavigate();
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt='60px'>
                <Text fontSize='28px' fontWeight='bold' textDecoration='underline' textUnderlineOffset='2px' pt='50px' pl={{ base: '40px', md: '100px' }}>
                    กิจกรรม
                </Text>
                <Box>
                    <Box display='flex' flexWrap='wrap' justifyContent={{ base: 'center', lg: 'flex-start' }} gap='30px' py='30px' maxWidth='1300px' mx='auto'>
                        {data.map((item) => {
                            return (
                                <Card width='300px' height='auto' bgColor='white' borderRadius='30px' boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                                    <Image src={item.img} objectFit='cover' borderTopLeftRadius='30px' borderTopRightRadius='30px' width="100%" />
                                    <Box p='30px'>
                                        <Text fontSize='28px' fontWeight='bold' pb='5px'>{item.title}</Text>
                                        <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                                        <Text pb='5px'>{item.StartDownload} ถึง {item.EndedDownload}</Text>
                                        <Button width='130px' borderRadius='40px' bgColor='#3399cc' color='white' _hover={{ bgColor: '#297AA3' }}
                                            onClick={() => {
                                                navigate(import.meta.env.VITE_PROFESSOR_PATH_DETAILS + `${item.id}`);
                                            }}>ดูข้อมูลกิจกรรม
                                        </Button>
                                    </Box>
                                </Card>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}
export default authMiddleware(Prof_Homepage);
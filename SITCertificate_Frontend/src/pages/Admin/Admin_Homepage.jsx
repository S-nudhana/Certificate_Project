import React from 'react'
import { Box, Text, Image, Card, Button } from '@chakra-ui/react';
import { useNavigate, ScrollRestoration } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { data } from '../Student/Student_Homepage';

export default function Admin_Homepage() {
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
                        <Card width='300px' height='auto' bgColor='#336699' borderRadius='30px' boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" color={'white'} border={'5px solid transparent'} transition={'.2s ease-in'} cursor={'pointer'} _hover={{ bgColor: 'white', borderColor: '#336699', color: '#336699' }}>
                            <Box height={'100%'} p={'30px'} display={'flex'} flexDirection={'column'} alignItems='center' justifyContent={'center'}>
                                <Text fontWeight={'bold'} fontSize={'40px'}>
                                    เพิ่มกิจกรรม
                                </Text>
                                <FaPlus fontSize={'50px'}></FaPlus>
                            </Box>
                        </Card>
                        {data.map((item) => {
                            return (
                                <Card width='300px' height='auto' bgColor='white' borderRadius='30px' boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                                    <Image src={item.img} objectFit='cover' borderTopLeftRadius='30px' borderTopRightRadius='30px' width="100%" />
                                    <Box p='30px'>
                                        <Text fontSize='28px' fontWeight='bold' pb='5px'>{item.title}</Text>
                                        <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                                        <Text pb='5px'>{item.StartDownload} ถึง {item.EndedDownload}</Text>
                                        <Button width='100px' borderRadius='40px' bgColor='#336699' color='white' _hover={{ bgColor: '#1f568c' }}
                                            onClick={() => {
                                                navigate(`/admin/${item.id}`);
                                            }}>แก้ไข</Button>
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

import React from 'react'
import { Box, Text, Image, Card, Button } from '@chakra-ui/react';
import { useNavigate, ScrollRestoration } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { data } from '../Student/Student_Homepage';
import authMiddleware from "../../utils/authMiddleware";

function Admin_Homepage() {
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
                        <Card width='300px' height='auto' bgColor='#3399cc' borderRadius='30px' boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" color={'white'} transition={'.2s ease-in'} cursor={'pointer'} _hover={{ bgColor: '#297AA3' }} onClick={() => {
                            navigate(import.meta.env.VITE_ADMIN_PATH_CREATE_EVENT)
                        }}>
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
                                        <Button width='90px' borderRadius='40px' bgColor='#336699' color='white' _hover={{ bgColor: '#1f568c' }}
                                            onClick={() => {
                                                navigate(import.meta.env.VITE_ADMIN_PATH_EDIT_EVENTS + `${item.id}`);
                                            }}>แก้ไข
                                        </Button>
                                        <Button ml={'15px'} width='130px' borderRadius='40px' bgColor='#3399cc' color='white' _hover={{ bgColor: '#297AA3' }}
                                            onClick={() => {
                                                navigate(import.meta.env.VITE_ADMIN_PATH_DETAILS + `${item.id}`);
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
export default authMiddleware(Admin_Homepage);

// create new btn
// w="300px"
// h="auto"
// bg="linear-gradient(90deg, rgba(51,153,204,1) 0%, rgba(51,102,153,1) 55%, rgba(31,86,140,1) 100%)"
// borderRadius="30px"
// boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
// color="white"
// transition=".2s ease-in"
// cursor="pointer"
// _hover={{
//     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // increase box-shadow on hover
//     transform: 'scale(1.01)',
// }}
// onClick={() => {
//     navigate(import.meta.env.VITE_ADMIN_PATH_CREATE_EVENT);
// }}
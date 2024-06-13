import React from 'react'
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom'
import { Box, Button, Text, Image } from '@chakra-ui/react'
import img from '../../assets/img/SIT_Building.png'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Student_CertificateExample() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
        <ScrollRestoration />
            <Navbar />
            <Box pt='80px' display='flex' flexDirection='column' alignItems='center'>
                <Text fontSize='32px' fontWeight='bold' py='40px'>ตัวอย่างใบประกาศนียบัตร</Text>
                <Image width='80%' pb='40px' src={img}></Image>
                <Box width='80%' display='flex' justifyContent='space-between' pb='40px'>
                    <Button width='100px' bgColor='#3399cc' color='white' borderRadius='40px' _hover={{ bgColor: '#297AA3' }} variant='solid' onClick={() => {
                        navigate(-1)
                    }}>ย้อนกลับ</Button>
                    <Button width='200px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' >พิมพ์ใบประกาศนียบัตร</Button>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

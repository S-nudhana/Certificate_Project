import React from 'react'
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom'
import { Box, Text, Button, Image } from '@chakra-ui/react'
import img from '../../assets/img/SIT_Building.png'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Student_CertificateDownload() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box pt='80px' display='flex' flexDirection='column' alignItems='center' justifyContent={'center'}>
                <Text fontSize='32px' fontWeight='bold' py='40px'>ใบประกาศนียบัตร</Text>
                <Image width='60%' pb={'40px'} src={img}></Image>
                <Box width='80%' display='flex' justifyContent='center' pb='20px' gap={"20px"}>
                    <Button width='270px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' >ส่งใบประกาศนียบัตรไปยังอีเมลล์</Button>
                    <Button width='100px' bgColor='#3399cc' color='white' borderRadius='40px' _hover={{ bgColor: '#297AA3' }} variant='solid' >ดาวน์โหลด</Button>
                </Box>
                <Button color={'#1f568c'} pb={'30px'} variant='link' onClick={() => {
                    navigate('/')
                }}>
                    กลับสู่หน้าหลัก
                </Button>
            </Box>
            <Footer />
        </>
    )
}

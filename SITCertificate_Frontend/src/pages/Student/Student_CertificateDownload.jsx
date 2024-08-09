import { useEffect, useState } from 'react';
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom'
import { Box, Text, Button, Flex } from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import authMiddleware from "../../utils/authMiddleware";
import PdfViewer from '../../components/PdfViewer';

import { studentCertificate } from '../../api/student/studentAPI';

function Student_CertificateDownload() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState();
    const getCertificate = async () => {
        const response = await studentCertificate(id);
        setCertificate(response.data.data.event_Certificate);
    }
    useEffect(() => {
        getCertificate();
    }, []);
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            {certificate && (
                <Box pt='80px' display='flex' flexDirection='column' alignItems='center' justifyContent={'center'}>
                    <Text fontSize='32px' fontWeight='bold' pt='40px' py={'20px'}>ใบประกาศนียบัตร</Text>
                    <Flex justify={'center'} width={"50%"} height={'auto'}>
                        <PdfViewer fileUrl={certificate} />
                    </Flex>
                    <Box width='80%' display='flex' justifyContent='center' pb='20px' gap={"20px"}>
                        <Button width='270px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' >ส่งใบประกาศนียบัตรไปยังอีเมลล์</Button>
                        <Button width='100px' bgColor='#3399cc' color='white' borderRadius='40px' _hover={{ bgColor: '#297AA3' }} variant='solid' as="a"
                            href={certificate}
                            download={"certificate.pdf"}>ดาวน์โหลด</Button>
                    </Box>
                    <Button color={'#1f568c'} pb={'30px'} variant='link' onClick={() => {
                        navigate('/')
                    }}>
                        กลับสู่หน้าหลัก
                    </Button>
                </Box>
            )}
            <Footer />
        </>
    )
}
export default authMiddleware(Student_CertificateDownload);
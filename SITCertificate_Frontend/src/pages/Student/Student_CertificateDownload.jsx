import { useEffect, useState } from 'react';
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom'
import { Box, Text, Button, Flex } from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import authMiddleware from "../../middleware/authMiddleware";
import PdfViewer from '../../components/PdfViewer';

import { studentCertificate, sendCertificate } from '../../api/student/studentAPI';

function Student_CertificateDownload() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    const getCertificate = async () => {
        const response = await studentCertificate(id);
        setCertificate(response.data.data.event_Certificate);
    }

    const sendCertificateToEmail = async () => {
        try {
          setIsLoading(true);
          sendCertificate(id, certificate);
          setMessage('Email sent successfully!');
        } catch (error) {
          setMessage('Failed to send email.');
          console.error('Error sending email:', error);
        } finally {
          setIsLoading(false);
        }
    };
    
    useEffect(() => {
        getCertificate();
    }, []);

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            {certificate && (
                <Box pt='80px' minH={'80vh'} display='flex' flexDirection='column' alignItems='center'>
                    <Text fontSize='32px' fontWeight='bold' pt='40px' py={'20px'}>ใบประกาศนียบัตร</Text>
                    <Flex justify={'center'} width={{base:'100%', lg: '80%', xl: '50%'}} height={'auto'}>
                        <PdfViewer fileUrl={certificate} />
                    </Flex>
                    <Box width='80%' display='flex' justifyContent='center' pb='20px' gap={"20px"}>
                        <Button width='270px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} fontSize={{base: '14px', md: '16px'}} variant='solid' onClick={() => {sendCertificateToEmail()}} disabled={isLoading}>ส่งใบประกาศนียบัตรไปยังอีเมลล์</Button>
                        <Button width='100px' bgColor='#3399cc' color='white' borderRadius='40px' _hover={{ bgColor: '#297AA3' }} fontSize={{base: '14px', md: '16px'}} variant='solid' as="a"
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
import React, { useState } from 'react'
import { Box, Image, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackBTN from '../../components/BackBTN'
import { data } from '../Student/Student_Homepage'

export default function Student_Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = data.find(item => item.id === id);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const isFormFilled = () => name.trim() !== '' && surname.trim() !== '' && email.trim() !== '';
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Box display={{ base: 'block', lg: 'flex' }} pt='80px'>
                <Image src={event.img} width={{ base: '100%', lg: '35%' }} height={{ base: 'auto', lg: "100vh" }} objectFit='cover'></Image>
                <Box pl={{ base: '0', lg: '70px' }} p='50px' width='100%'>
                    <BackBTN />
                    <Text fontSize='32px' fontWeight='bold' pt='20px'>{event.title}</Text>
                    <Text pt='10px' pb='20px'>เปิดให้ดาว์นโหลดตั้งแต่  {event.StartDownload}  ถึง  {event.EndedDownload}</Text>
                    <Box border='.7px solid #919191' borderRadius='25px' p='30px' fontWeight='bold' fontSize='20px'>
                        <Text pb='20px'>กรอกข้อมูลในใบประกาศนียบัตร</Text>
                        <FormControl id="name" pb='20px'>
                            <FormLabel fontSize={["sm", "lg", "lg"]} fontWeight='bold'>ชื่อ</FormLabel>
                            <Input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="surname" pb='20px'>
                            <FormLabel fontSize={["sm", "lg", "lg"]} fontWeight='bold'>นามสกุล</FormLabel>
                            <Input
                                type="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </FormControl>
                        <Text fontSize={["sm", "lg", "lg"]} pb='20px'>อีเมล<span style={{ fontWeight: 'normal' }}> (ใช้ในการส่งใบประกาศนียบัตร)</span></Text>
                        <FormControl id="email" pb='30px'>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Box width='100%' display='flex' justifyContent='flex-end'>
                            <Button width='100px' bgColor='#336699' color='white' borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' onClick={() => {
                                navigate(`/certificate/${event.id}`);
                            }}>ถัดไป</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

import React, { useState } from 'react'
import { Box, Image, Text, Button, FormControl, FormLabel, Input, Center } from '@chakra-ui/react'
import { useParams, useNavigate, ScrollRestoration } from 'react-router-dom';

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackBTN from '../../components/BackBTN'
import { data } from '../Student/Student_Homepage'
import img from '../../assets/img/SIT_Building.png'
import authMiddleware from "../../utils/authMiddleware";

function Student_Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = data.find(item => item.id === id);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const isFormFilled = () => name.trim() !== '' && surname.trim() !== '' && email.trim() !== '';

    const aleadyGenerate = () => {
        if (true) {
            return (
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
            )
        } else {
            return (
                <Box display={{ base: 'block', lg: 'flex' }} pt='80px'>
                    <Image src={event.img} width={{ base: '100%', lg: '35%' }} height={{ base: 'auto', lg: "100vh" }} objectFit='cover'></Image>
                    <Box pl={{ base: '0', lg: '70px' }} p='50px' width='100%'>
                        <BackBTN />
                        <Text fontSize='32px' fontWeight='bold' pt='20px'>{event.title}</Text>
                        <Text pt='10px' pb='20px'>เปิดให้ดาว์นโหลดตั้งแต่  {event.StartDownload}  ถึง  {event.EndedDownload}</Text>
                        <Text fontSize='18px' fontWeight={'bold'}>ใบประกาศนียบัตร</Text>
                        <Box display='flex' justifyContent={{ base: 'center', lg: 'flex-start' }}>
                            <Image width='90%' height={'auto'} src={img} my={'20px'} boxShadow={'lg'}></Image>
                        </Box>
                        <Box display='flex' justifyContent={{ base: 'center', lg: 'flex-start' }} gap={"20px"}>
                            <Button width='270px' bgColor='#336699' color='white' fontSize={{ base: '14px', md: '16px' }} borderRadius='40px' _hover={{ bgColor: '#1f568c' }} variant='solid' >ส่งใบประกาศนียบัตรไปยังอีเมลล์</Button>
                            <Button width='100px' bgColor='#3399cc' color='white' fontSize={{ base: '14px', md: '16px' }} borderRadius='40px' _hover={{ bgColor: '#297AA3' }} variant='solid' >ดาวน์โหลด</Button>
                        </Box>
                    </Box>
                </Box>
            )
        }
    }

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            {aleadyGenerate()}
            <Footer />
        </>
    )
}
export default authMiddleware(Student_Detail);
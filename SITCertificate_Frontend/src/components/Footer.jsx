import { Box, Text, Divider, Image, Center } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { FaPhone, FaEnvelope, FaFacebook, FaLine } from "react-icons/fa6";

import logo from "/img/SIT_logo.png";

export default function Footer() {
    return (
        <>
            <Box bgColor='#222222' pt={"20px"}>
                <Box display='flex' flexDirection={{ base: "column", sm: "row" }} alignItems='center' justifyContent='space-evenly' >
                    <Link to="https://www.sit.kmutt.ac.th/">
                        <Image src={logo} alt="Logo" width={{ base: '300px', lg: "500px" }} height='auto' />
                    </Link>
                    <Box color='whitesmoke' fontSize={{ xs: "12px", md: "14px", lg: '20px' }}>
                        <Link to="" className="text-[#c4cece]">
                            <Box display='flex' alignItems='center' pt={{ base: '28px', md: '30px' }} transition="color 0.2s ease-in-out" _hover={{ color: 'white'}}>
                                <FaPhone /> <Text pl='5px'> +66 2470 9850</Text>
                            </Box>
                        </Link>
                        <Link to="mailto:webadmin@sit.kmutt.ac.th" className="text-[#c4cece] flex pt-[5px]">
                            <Box display='flex' alignItems='center' pt='10px' transition="color 0.2s ease-in-out" _hover={{ color: 'white'}}>
                                <FaEnvelope /> <Text pl='5px'> webadmin@sit.kmutt.ac.th</Text>
                            </Box>
                        </Link>
                        <Link to="https://www.facebook.com/SIT.Family" className="text-[#c4cece] flex pt-[5px]">
                            <Box display='flex' alignItems='center' pt='10px' transition="color 0.2s ease-in-out" _hover={{ color: 'white'}}>
                                <FaFacebook /> <Text pl='5px'> SIT.Family</Text>
                            </Box>
                        </Link>
                        <Link to="https://page.line.me/olt5471s?openQrModal=true" className="text-[#c4cece] flex pt-[5px] pb-[20px]">
                            <Box display='flex' alignItems='center' pt='10px' transition="color 0.2s ease-in-out" _hover={{ color: 'white'}}>
                                <FaLine /> <Text pl='5px'> @sit.kmutt</Text>
                            </Box>
                        </Link>
                    </Box>
                </Box>
                <Center>
                    <Divider width="70%" mt="3" mb="2" />
                </Center>
                <Text display='flex' justifyContent='center' textAlign='center' py={"20px"} color='#E0E5E5' fontSize={{ base: '9px', md: "12px", lg: "14px" }}>
                    © 2025 School of Information Technology, King Mongkut's University of Technology Thonburi.
                </Text>
            </Box>
        </>
    )
}

import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Cookies from "js-cookie";

export default function Navbar() {
    return (
        <Box bgColor="#0c2d4e" display='flex' justifyContent='space-between' alignItems='center' p='20px 50px'>
            <Text color='white' fontWeight='bold' fontSize='24' >SITCertificate</Text>
            <Button leftIcon={<FaArrowRightFromBracket />} bgColor='#336699' color='white' size='md' _hover={{ bgColor: '#1f568c' }} variant='solid' 
                onClick={() => {
                    Cookies.remove("token");
                    // navigate("/");
                    window.location.reload();
                }}>
                ออกจากระบบ
            </Button>
        </Box>
    )
}

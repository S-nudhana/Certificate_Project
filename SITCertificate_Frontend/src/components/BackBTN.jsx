import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa6';

export default function BackBTN() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    
    return (
        <>
            <Button leftIcon={<FaAngleLeft />} variant='link' color='black' onClick={handleBackClick}>
                ย้อนกลับ
            </Button>
        </>
    )
}

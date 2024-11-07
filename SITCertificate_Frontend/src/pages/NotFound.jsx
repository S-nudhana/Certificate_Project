import { Flex, Button,  Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { FaFaceFrown } from "react-icons/fa6";

import Building from "../../public/img/SIT_Building.png";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Flex minH="100vh" align="center" justify="center" bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${Building})`} bgSize="cover" bgPosition="center">
            <Flex color={"white"} flexDir={'column'} justify={'center'} align={'center'}>
                <FaFaceFrown size={"100px"} />
                <Text m={'0'} fontSize={{ base: '110px', md: '180px' }} fontWeight={'bold'} textShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}>404</Text>
                <Text mt={'-15%'} fontSize={{ base: '40px', md: '60px' }} fontWeight={'bold'} textShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}>Not Found</Text>
                <Button size="md" p={'20px'} color={'white'} bgColor="#336699" _hover={{ bgColor: "#1f568c" }} variant="solid" onClick={() => { navigate("/") }}>Back to Home page</Button>
            </Flex>
        </Flex>
    );
}

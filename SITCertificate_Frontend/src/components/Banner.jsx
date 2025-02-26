import image from "/img/SIT_Building.png";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Banner() {
    return (
        <>
            <Box
                position="relative"
                width="100%"
                height={{ base: "300px", lg: "400px" }}
                overflow="hidden"
            >
                <Image
                    src={image}
                    alt="Dimmed background"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    zIndex={1}
                />
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    bg="rgba(0, 0, 0, 0.5)"
                    zIndex={2}
                >
                    <Box
                        position="absolute"
                        top={{ base: "30%", xl: "37%" }}
                        left={{ base: "5%", xl: "7%" }}
                        width="100%"
                        height="100%"
                        color={"white"}
                    >
                        <Text fontSize={{ base: "30px", lg: "50px" }} fontWeight={"bold"}>
                            ยินดีต้อนรับเข้าสู่ระบบออกใบประกาศนียบัตร
                        </Text>
                        <Text fontSize={{ base: "14px", lg: "22px" }}>
                            คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


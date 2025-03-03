import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Box, Text, Button } from "@chakra-ui/react";

import { fetchFile } from "../api/user/userAPI";

import { formatDateDMY } from "../utils/dateFormat";

export default function StudentCard({
  event_thumbnail,
  event_name,
  event_startDate,
  event_endDate,
  event_Id,
}) {
  const navigate = useNavigate();

  const [fileUrl, setFileUrl] = useState(null);

  const getFile = async () => {
    try {
      setFileUrl(await fetchFile(event_thumbnail));
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    getFile();
  }, [])

  return (
    <>
      <Card
        width="300px"
        height="auto"
        bgColor="white"
        borderRadius="30px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        transition=".2s ease-in"
        _hover={{
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.01)",
        }}
      >
        <Image
          src={`${fileUrl}`}
          objectFit="cover"
          borderTopLeftRadius="30px"
          borderTopRightRadius="30px"
          width="100%"
          height={"250px"}
        />
        <Box p="30px">
          <Text fontSize="28px" fontWeight="bold" pb="5px">
            {event_name}
          </Text>
          <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
          <Text pb="5px" color={"black"}>
            {formatDateDMY(event_startDate)} ถึง{" "}
            {formatDateDMY(event_endDate)}
          </Text>
          <Button
            width="170px"
            borderRadius="40px"
            bgColor="#336699"
            color="white"
            _hover={{ bgColor: "#1f568c" }}
            onClick={() => {
              navigate(`/detail/${event_Id}`);
            }}
          >
            รับประกาศนียบัตร
          </Button>
        </Box>
      </Card>
    </>
  );
}

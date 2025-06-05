import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Box, Text, Button } from "@chakra-ui/react";

import { fetchFile } from "../../apis/userAPI";
import { formatDateDMY } from "../../utils/dateFormat";

interface ProfAdminCardProps {
  event_thumbnail: string;
  event_name: string;
  event_owner: string;
  event_startDate: string;
  event_endDate: string;
  event_id: string;
  event_status: boolean;
  role: string;
}

export default function Prof_AdminCard({
  event_thumbnail,
  event_name,
  event_owner,
  event_startDate,
  event_endDate,
  event_id,
  event_status,
  role,
}: ProfAdminCardProps) {
  const navigate = useNavigate();

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const getFile = async () => {
    try {
      const url = await fetchFile(event_thumbnail);
      setFileUrl(url);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
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
        src={fileUrl ?? ""}
        objectFit="cover"
        borderTopLeftRadius="30px"
        borderTopRightRadius="30px"
        width="100%"
        height="250px"
      />
      <Box p="30px">
        <Text fontSize="28px" fontWeight="bold">
          {event_name}
        </Text>
        <Text fontWeight="bold">{event_owner}</Text>
        <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
        <Text pb="5px" color="red">
          {formatDateDMY(new Date(event_startDate))} ถึง {formatDateDMY(new Date(event_endDate))}
        </Text>
        <Button
          display={event_status || role === "professor" ? "none" : ""}
          mr="15px"
          width="90px"
          borderRadius="40px"
          bgColor="#336699"
          color="white"
          _hover={{ bgColor: "#1f568c" }}
          onClick={() => {
            navigate(`/${role}/editEvent/${event_id}`);
          }}
        >
          แก้ไข
        </Button>
        <Button
          width="130px"
          borderRadius="40px"
          bgColor="#3399cc"
          color="white"
          _hover={{ bgColor: "#297AA3" }}
          onClick={() => {
            navigate(`/${role}/detail/${event_id}`);
          }}
        >
          ดูข้อมูลกิจกรรม
        </Button>
      </Box>
    </Card>
  );
}

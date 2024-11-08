import { Card, Image, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { dateFormatChange } from "../../utils/function";

export default function ProfCard({
  event_thumbnail,
  event_name,
  event_owner,
  event_startDate,
  event_endDate,
  event_Id,
}) {
  const navigate = useNavigate();
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
          src={`${import.meta.env.VITE_REACT_APP_URL}${event_thumbnail}`}
          objectFit="cover"
          borderTopLeftRadius="30px"
          borderTopRightRadius="30px"
          width="100%"
          height={"250px"}
        />
        <Box p="30px">
          <Text fontSize="28px" fontWeight="bold">
            {event_name}
          </Text>
          <Text fontWeight="bold">{event_owner}</Text>
          <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
          <Text pb="5px">
            {dateFormatChange(event_startDate)} ถึง{" "}
            {dateFormatChange(event_endDate)}
          </Text>
          <Button
            width="130px"
            borderRadius="40px"
            bgColor="#3399cc"
            color="white"
            _hover={{ bgColor: "#297AA3" }}
            onClick={() => {
              navigate(`/professor/detail/${event_Id}`);
            }}
          >
            ดูข้อมูลกิจกรรม
          </Button>
        </Box>
      </Card>
    </>
  );
}

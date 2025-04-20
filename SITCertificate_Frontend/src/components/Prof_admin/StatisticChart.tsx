import { Box, Flex, Text } from "@chakra-ui/react";
import DoughnutChart from "./DoughnutChart";

interface StatisticChartProps {
  participantsAmount: number;
  participantsDownloadAmount: number;
  eventName: string;
}

export default function StatisticChart({
  participantsAmount,
  participantsDownloadAmount,
  eventName,
}: StatisticChartProps) {
  return (
    <Flex width={"100%"} justifyContent={"center"} pt={"20px"} flexDir={"column"}>
      <Text align={"center"} fontSize={"24px"} fontWeight="bold" textDecor={"underline"} pb={"20px"}>
        สถิติของกิจกรรม {eventName}
      </Text>
      <Box
        display={{ base: "block", lg: "flex" }}
        width={"full"}
        justifyContent={"center"}
        gap={"40px"}
        p={"0 30px 30px 30px"}
      >
        <DoughnutChart
          participantsAmount={participantsAmount}
          participantsDownloadAmount={participantsDownloadAmount}
        />
        <Box
          pt={{ base: "20px", lg: "0" }}
          alignContent={"center"}
          fontSize={{ base: "14px", md: "16px" }}
        >
          <Text>จำนวนผู้เข้าร่วมกิจกรรม : {participantsAmount} คน</Text>
          <Text>จำนวนผู้ดาวน์โหลดใบประกาศนียบัตร : {participantsDownloadAmount} คน</Text>
          <Text>
            จำนวนผู้เข้าร่วมที่ยังไม่ดาวน์โหลดใบประกาศนียบัตร :{" "}
            {participantsAmount - participantsDownloadAmount} คน
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

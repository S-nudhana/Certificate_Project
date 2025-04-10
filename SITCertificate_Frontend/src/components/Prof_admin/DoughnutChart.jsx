import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ participantsAmount, participantsDownloadAmount }) => {
  const data = {
    labels: ["จำนวนผู้ดาวน์โหลดใบประกาษณียบัตร", "จำนวนผู้เข้าร่วมที่ยังไม่ดาวน์โหลดใบประกาษณียบัตร"],
    datasets: [
      {
        label: "จำนวน (คน)",
        data: [participantsDownloadAmount, participantsAmount-participantsDownloadAmount],
        backgroundColor: ["#3399cc", "#AD3D3B"],
        borderColor: ["#3399cc", "#AD3D3B"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <Box width={{base: "350px", lg: "400px"}} height={{base: "350px", lg: "400px"}}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default DoughnutChart;

import React from 'react';
import { Box, Text, Image, Card, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const data = [
  {
    title: "EventName1",
    pic: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2017/08/KMUTT-B031-1.jpg',
    StartDownload: '00/00/00',
    EndedDownload: '00/00/00',
  },
  {
    title: "EventName2",
    pic: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2017/08/KMUTT-B031-1.jpg',
    StartDownload: '00/00/00',
    EndedDownload: '00/00/00',
  },
  {
    title: "EventName3",
    pic: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2017/08/KMUTT-B031-1.jpg',
    StartDownload: '00/00/00',
    EndedDownload: '00/00/00',
  },
  {
    title: "EventName4",
    pic: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2017/08/KMUTT-B031-1.jpg',
    StartDownload: '00/00/00',
    EndedDownload: '00/00/00',
  },
  {
    title: "EventName5",
    pic: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2017/08/KMUTT-B031-1.jpg',
    StartDownload: '00/00/00',
    EndedDownload: '00/00/00',
  },
];

export default function Student_Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box pt='60px'>
        <Text fontSize='28px' fontWeight='bold' textDecoration='underline' textUnderlineOffset='2px' pt='50px' pl={{ base: '40px', md: '100px' }}>
          กิจกรรม
        </Text>
        <Box>
          <Box display='flex' flexWrap='wrap' justifyContent={{ base: 'center', lg: 'flex-start' }} gap='25px' py='30px' maxWidth='1300px' mx='auto'>
            {data.map((item, index) => {
              return (
                <Card key={index} width='300px' height='auto' bgColor='white' borderRadius='30px' boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                  <Image src={item.pic} objectFit='cover' borderTopLeftRadius='30px' borderTopRightRadius='30px' width="100%" />
                  <Box p='20px'>
                    <Text fontSize='28px' fontWeight='bold' pb='5px'>{item.title}</Text>
                    <Text>เปิดให้ดาว์นโหลดตั้งแต่</Text>
                    <Text pb='5px'>{item.StartDownload} ถึง {item.EndedDownload}</Text>
                    <Button width='170px' borderRadius='40px' bgColor='#336699' color='white' _hover={{ bgColor: '#1f568c' }}
                      onClick={() => {
                        // navigate(``);
                      }}>รับประกาศนียบัตร</Button>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

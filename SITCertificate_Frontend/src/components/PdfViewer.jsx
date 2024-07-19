import React from 'react';
import { Box } from '@chakra-ui/react';

export default function PdfViewer({ fileUrl }) {
  return (
    <Box pb={'20px'} mt={'20px'} ml={["0%", "-10%", "-5%", "0"]} width="85%" height={{ base: '307px', md: '300px', xl: '520px' }}>
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
    </Box>
  );
}

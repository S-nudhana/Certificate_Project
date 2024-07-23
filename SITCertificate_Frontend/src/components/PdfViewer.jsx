import React from 'react';
import { Box } from '@chakra-ui/react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import PDF from 'react-pdf-watermark';

export default function PdfViewer({ fileUrl }) {
  return (
    <Box mb={'20px'} mt={'20px'} boxShadow={'lg'} width={'90%'} height={'auto'}>
      <PDF
        canvasWidth={'100%'}
        canvasHeight={'auto'}
        file={fileUrl}
      />
    </Box>
  );
}
import React from 'react';
import { Box } from '@chakra-ui/react';
import PDF from 'react-pdf-watermark';

export default function PdfViewer({ fileUrl }) {
  return (
    <>
      {fileUrl && (
        <Box my={'20px'} boxShadow={'lg'} width={'100%'} height={'auto'} display={'flex'} justifyContent={'center'}>
          <PDF
            canvasWidth={'100%'}
            canvasHeight={'auto'}
            file={fileUrl}
          />
        </Box>
      )}
    </>
  );
}


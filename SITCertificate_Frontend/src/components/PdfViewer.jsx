import React from 'react';
import { Box } from '@chakra-ui/react';
import PDF from 'react-pdf-watermark';

export default function PdfViewer({ fileUrl, isMobile }) {
  return (
    <>
      {fileUrl && (
        isMobile ? (
          <Box my={'20px'} boxShadow={'lg'} width={'90%'} height={'auto'}>
            <PDF
              canvasWidth={'100%'}
              canvasHeight={'auto'}
              file={fileUrl}
            />
          </Box>
        ) : (
          <Box width={{ base: "680px", xl: "680px", "2xl": "800px" }} height={{ base: "386px", xl: "483px", "2xl": "567.5px" }} boxShadow={"0 6px 12px rgba(0, 0, 0, 0.2)"} my={"20px"}>
            {/* <object src={`${fileUrl}#toolbar=0`} type="application/pdf" width={"100%"} height={"100%"}></object> */}
            <object data={`${fileUrl}#toolbar=0`} type="application/pdf" width="100%"height="100%" aria-label="PDF Document"></object>
          </Box>
        )
      )}
    </>
  );
}


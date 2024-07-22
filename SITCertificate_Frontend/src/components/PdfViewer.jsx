import React from 'react';
import { Box } from '@chakra-ui/react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PdfViewer({ fileUrl }) {
  return (
    <Box pb={'20px'} mt={'20px'}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174 /build/pdf.worker.min.js">
        <Box width={'100%'} height={'100%'}>
          <Viewer fileUrl={fileUrl} />
        </Box>
      </Worker>
    </Box>
  );
}
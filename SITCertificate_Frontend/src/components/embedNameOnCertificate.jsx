export const convertSvgToPng = (svgText, width, height) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const svgBlob = new Blob([svgText], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                        URL.revokeObjectURL(url);
                    };
                    reader.readAsArrayBuffer(blob);
                } else {
                    reject(new Error("Canvas to Blob conversion failed"));
                }
            }, "image/png");
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = url;
    });
};

export const createTextSVG = (text, fontUrl, fontSize, width, height, y, color) => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <style>
        @font-face {
          font-family: 'Noto Sans Thai';
          src: url('https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtlyJ0QCvz.woff2');
        } .text {
            font-family: 'Noto Sans Thai', sans-serif;
            font-size: ${fontSize}px;
            fill: ${color};
          }
        </style>
        <text x="50%" y="${y}%" text-anchor="middle" alignment-baseline="middle" class="text">${text}</text>
      </svg>
    `;
};
// src/utils/iframeResizer.ts
"use client";

export function generateEmbedCode(
  baseUrl: string,
  collectionId: string,
  theme: "light" | "dark" = "light"
): string {
  return `
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
    <iframe 
      id="testimonial-iframe" 
      src="${baseUrl}/widget/${collectionId}?theme=${theme}" 
      width="100%" 
      frameborder="0" 
      scrolling="no"
    ></iframe>
    <script type="text/javascript">
      if (window.iFrameResize) {
        window.iFrameResize({
          log: false, 
          checkOrigin: false,
          heightCalculationMethod: 'documentElementOffset'
        }, '#testimonial-iframe');
      }
    </script>
  `;
}

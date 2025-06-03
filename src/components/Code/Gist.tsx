import { useEffect, useRef, useState } from 'react';

export type GistProps = {
  id: string;
  file?: string;
};

export const Gist = ({ id, file }: GistProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(300); // Initial fallback height

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const url = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ''}`;
    const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
    const styles = `<style>*{font-size:12px;}</style>`;

    const iframeHtml = `
      <html>
        <head>
          <base target="_parent"/>
          ${styles}
        </head>
        <body>
          <div id="gist-container"></div>
          <script type="text/javascript" src="${url}"></script>
          <script>
            function resizeParent() {
              const height = document.body.scrollHeight;
              parent.postMessage({ height, id: '${elementId}' }, '*');
            }
            window.addEventListener('load', resizeParent);
            setTimeout(resizeParent, 300); // fallback if gist loads late
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = iframeHtml;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.id === elementId && event.data?.height) {
        setHeight(event.data.height);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [id, file]);

  return (
    <iframe
      ref={iframeRef}
      id={file ? `gist-${id}-${file}` : `gist-${id}`}
      title={`gist-${id}`}
      width="100%"
      style={{
        width: '100%',
        height: `${height}px`,
        border: 'none',
        overflow: 'hidden',
      }}
      scrolling="no"
    />
  );
};

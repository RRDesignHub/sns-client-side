import html2canvas from "html2canvas";
import { useRef } from "react"

export default function PDF() {
  const pdfRef = useRef();

  const handleDownloadResult = async() =>{
    const content = pdfRef.current;

    html2canvas(content);
  }
  return (
    <div ref={pdfRef}>
      <h1>Hello</h1>
      <button onClick={handleDownloadResult}>PDF</button>
    </div>
  )
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDF from "./PDF";
export default function ResultDetails() {
  const [download, setDownload] = useState(false);
  const { id } = useParams();


  const {
    data: resultData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/result?id=${id}`
      );
      return data;
    },
  });


  const handleDownloadResult = async () => {
      const blob = await pdf(<PDF resultData={resultData} />).toBlob();
        saveAs(blob, `${resultData?.studentName}_Result.pdf`);
  };

  
  return (
    <>
      
      {/* PDF viewer for testing */}
      <div className={`w-full mt-4`}>
            <PDF resultData={resultData}/>
        </div>
    </>
  );
}

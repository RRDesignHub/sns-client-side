import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Shared/Loading";
import ResultPDF from "../../components/Dashboard/ResultPDF/ResultPDF";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export default function ResultDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSec();
  const {
    data: resultData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/result?id=${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* PDF viewer for testing */}
      <div className={`w-full h-screen mt-4`}>
        <ResultPDF resultData={resultData} />
      </div>
    </>
  );
}

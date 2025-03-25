import { useParams } from "react-router-dom";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Shared/Loading";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";

export default function ResultPDF() {
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
    <PDFViewer width="100%" height="600px">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Transparent Overlay Logo */}
          <Image
            src="/logo.png"
            style={{
              position: "absolute",
              top: "35%",
              left: "28%",
              transform: "translate(-50%, -50%)",
              width: 380,
              height: 380,
              opacity: 0.17,
            }}
          />

          {/* Header */}
          <View>
            <Image
              src="/logo.png"
              style={{ height: 50, width: 50, position: "absolute" }}
            />
            <Text style={styles.title}>Shah Neyamat (RH:) KG & High School</Text>
            <Text style={{ fontSize: 11, fontWeight: 500, textAlign: "center", opacity: 0.8 }}>
              Karnaphuli, Chattogram || ESTD: 2004
            </Text>
            <Text style={styles.subtitle}>
              {resultData?.examName} Exam Result: {resultData?.academicYear}
            </Text>
          </View>
          <View style={styles.divider} />

          {/* Student Info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoLeft}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>Student Name:</Text>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{resultData?.studentName}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ fontSize: 11, fontWeight: 500 }}>Father's Name:</Text>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>{resultData?.fatherName}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ fontSize: 11, fontWeight: 500 }}>Mother's Name:</Text>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>{resultData?.motherName}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ fontSize: 11, fontWeight: 600 }}>Class:</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>{resultData?.className}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
                <Text style={{ fontSize: 11, fontWeight: 500 }}>Roll:</Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>{resultData?.classRoll}</Text>
              </View>
            </View>
            <View style={styles.infoRight}>
              <Image
                src={resultData?.image || "/placeholder.png"} // Fallback if no image
                style={{
                  width: 50,
                  height: 60,
                  margin: "5px auto",
                  border: "1px solid #5c5e5d",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total Marks:</Text>
                <Text style={styles.infoValue}>{resultData?.totalMarks}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>GPA:</Text>
                <Text style={styles.infoValue}>
                  {resultData?.totalGPA < 1 ? 0 : resultData?.totalGPA?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Letter Grade:</Text>
                <Text style={styles.infoValue}>{resultData?.totalLG}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text style={styles.infoValue}>{resultData?.status}</Text>
              </View>
            </View>
          </View>

          {/* Result Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellSubject}>Subject Name</Text>
              <Text style={styles.tableCellOther}>Marks</Text>
              <Text style={styles.tableCellOther}>Grade Point</Text>
              <Text style={styles.tableCellOther}>Letter Grade</Text>
            </View>
            {resultData?.resultData?.map((subject, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellSubject}>{subject?.subjectName}</Text>
                <Text style={styles.tableCellOther}>{subject?.marks}</Text>
                <Text style={styles.tableCellOther}>{subject?.GPA}</Text>
                <Text style={styles.tableCellOther}>{subject?.letterGrade}</Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.signature}>Class Teacher Signature</Text>
            <Text style={styles.signature}>Principal Signature</Text>
            <Text style={styles.signature}>Guardian Signature</Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
  );
}

import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";
export default function ResultPDF({ resultData }) {
  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <View>
              <Image
                src="../../../public/logo.png"
                style={{ height: "50px", width: "50px", position: "absolute" }}
              ></Image>
              {/* Title Section */}

              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>

              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textAlign: "center",
                  opacity: "0.8",
                }}
              >
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>
              <Text style={styles.subtitle}>
                {resultData?.examName} Exam: {resultData?.academicYear}
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Student Info */}

            {/* Exam Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                {/* student name */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Student Name :
                  </Text>

                  <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {resultData?.studentName}
                  </Text>
                </View>
                {/* father name */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 500 }}>
                    Father's Name :
                  </Text>

                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    {resultData?.fatherName}
                  </Text>
                </View>
                {/* mother name */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 500 }}>
                    Mother's Name :
                  </Text>
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    {resultData?.motherName}
                  </Text>
                </View>

                {/* class */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 600 }}>
                    Class :
                  </Text>
                  <Text style={{ fontSize: "11px", fontWeight: 400 }}>
                    {resultData?.className}
                  </Text>
                </View>

                {/* roll */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "11px", fontWeight: 500 }}>
                    Roll :
                  </Text>
                  <Text style={{ fontSize: "11px", fontWeight: 400 }}>
                    {resultData?.classRoll}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRight}>
                <Image
                  src={resultData?.image}
                  style={{
                    width: "50px",
                    height: "60px",
                    margin: "5px auto",
                    border: "1px solid #5c5e5d",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                ></Image>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total Marks:</Text>
                  <Text style={styles.infoValue}>{resultData?.totalMarks}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>GPA:</Text>
                  <Text style={styles.infoValue}>
                    {resultData?.totalGPA < 1
                      ? 0
                      : resultData?.totalGPA?.toFixed(2)}
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
                <Text style={styles.tableCell}>Subject Name</Text>
                <Text style={styles.tableCell}>Marks</Text>
                <Text style={styles.tableCell}>Grade Point</Text>
                <Text style={styles.tableCell}>Letter Grade</Text>
              </View>

              {resultData?.resultData?.map((subject, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{subject?.subjectName}</Text>
                  <Text style={styles.tableCell}>{subject?.marks}</Text>
                  <Text style={styles.tableCell}>{subject?.GPA}</Text>
                  <Text style={styles.tableCell}>{subject?.letterGrade}</Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              width: "95%",
              margin: "0 auto",
              padding: "20px 20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              left: "10px",
              bottom: "30px",
              borderBottom: "1px solid #757575"
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                fontWeight: 500,
                borderTop: "1px solid #000",
              }}
            >
              Class Teacher Signature
            </Text>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: 500,
                borderTop: "1px solid #000",
              }}
            >
              Principal Signature
            </Text>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: 500,
                borderTop: "1px solid #000",
              }}
            >
              Guardian Signature
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

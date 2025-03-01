import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
export default function PDF({resultData}) {
  

  Font.register({
    family: "Roboto",
    fonts: [
      { src: "/Fonts/Roboto-Regular.ttf" }, // Regular (400)
      { src: "/Fonts/Roboto-Bold.ttf", fontWeight: "bold" }, // Bold (700)
      { src: "/Fonts/Roboto-SemiBold.ttf", fontWeight: 600 }, // SemiBold (600)
      { src: "/Fonts/Roboto-Medium.ttf", fontWeight: 500 }, // Medium (500)
      { src: "/Fonts/Roboto-Regular.ttf", fontWeight: 400 }, // Medium (500)
      { src: "/Fonts/Roboto-Light.ttf", fontWeight: 300 }, // Light (300)
    ],
  });

  // Styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 20,
      fontFamily: "Roboto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      borderRadius: 5,
      position: "relative",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      marginBottom: 2,
      opacity: 0.9,
    },
    divider: {
      borderBottom: "1px solid #c4c4c4",
      marginVertical: 10,
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 4,
    },
    infoLeft: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      border: "1px solid #c4c4c4",
      borderRadius: "5px",
      padding: "10px",
    },
    infoRight: {
      width: "38%",
      border: "1px solid #c4c4c4",
      borderRadius: "5px",
      padding: "5px",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 5,
    },
    infoLabel: {
      flex: 6,
      fontSize: 11,
      fontWeight: 600,
    },
    infoValue: {
      flex: 6,
      fontSize: 11,
      fontWeight: 400,
    },
    table: {
      width: "100%",
      marginTop: 10,
      border: "1px solid #a6a4a4",
      borderBottom: "none",
      borderRadius: "5px",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#a6a4a4",
      fontSize: 12,
      fontWeight: "bold",
      borderBottom: "1px solid #a19f9f",
      padding: 5,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #a19f9f",
      fontSize: 12,
    },
    tableCell: {
      padding: 5,
      flex: 1,
    },
  });
  const MyDocument = () => (
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
                  marginBottom: "10px"
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
              bottom: "30px"
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
  );
  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

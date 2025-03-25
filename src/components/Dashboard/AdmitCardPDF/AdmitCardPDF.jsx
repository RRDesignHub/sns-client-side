import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import {styles} from "./Style";
export default function AdmitCardPDF({admitCardData}) {
  
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
          <Image
              src="/logo.png" // Adjust path to your public folder
              style={{
                position: "absolute",
                top: "35%",
                left: "28%",
                transform: "translate(-50%, -50%)", // Center the image
                width: 380, // Adjust size as needed
                height:380,
                opacity: 0.17, // Transparent overlay effect
              }}
            />
            {/* Header */}
            <View>
              <Image
                src="/logo.png" // Adjust path based on your public folder setup
                style={{ height: 50, width: 50, position: "absolute", left: 10 }}
              />
              <Text style={styles.title}>Shah Neyamat (RH:) KG & High School</Text>
              <Text style={{ fontSize: 11, textAlign: "center", opacity: 0.8 }}>
                Karnaphuli, Chattogram || ESTD: 2004
              </Text>
              <Text style={styles.subtitle}>
                {admitCardData.examName} Exam: {admitCardData.session}
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Student Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Student Name:</Text>
                  <Text style={styles.infoValue}>{admitCardData.studentName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Father's Name:</Text>
                  <Text style={styles.infoValue}>{admitCardData.fatherName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date of Birth:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(admitCardData.dateOfBirth).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Class:</Text>
                  <Text style={styles.infoValue}>{admitCardData.className}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Roll:</Text>
                  <Text style={styles.infoValue}>{admitCardData.classRoll}</Text>
                </View>
              </View>
              <View style={styles.infoRight}>
                {/* <Image
                  src={admitCardData?.image}
                  style={{
                    width: "50px",
                    height: "60px",
                    margin: "5px auto",
                    border: "1px solid #5c5e5d",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                ></Image> */}
              </View>
            </View>

            <View>
              <Text style={styles.cardTitle}>Admit Card</Text>
            </View>

            {/* Exam Schedule Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCell}>Subject Name</Text>
                <Text style={styles.tableCell}>Exam Date</Text>
                <Text style={styles.tableCell}>From</Text>
                <Text style={styles.tableCell}>To</Text>
              </View>
              {admitCardData.examData.map((subject, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{subject.subjectName}</Text>
                  <Text style={styles.tableCell}>
                    {new Date(subject.examDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.tableCell}>{subject.examFrom}</Text>
                  <Text style={styles.tableCell}>{subject.examTo}</Text>
                </View>
              ))}
            </View>

            {/* Footer with Signatures */}
            <View style={styles.footer}>
              <Text style={styles.signature}>Class Teacher Signature</Text>
              <Text style={styles.signature}>Principal Signature</Text>
              
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";
import { format } from "date-fns";
export default function AdmitCardPDF({ admitCardData }) {
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Image
              src="/logo.png"
              style={{
                position: "absolute",
                top: "35%",
                left: "28%",
                transform: "translate(-50%, -50%)",
                width: 380,
                opacity: 0.17,
              }}
            />
            {/* Header */}
            <View>
              <Image
                src="/logo.png" // Adjust path based on your public folder setup
                style={{
                  width: 50,
                  position: "absolute",
                  left: 20,
                }}
              />
              <Text style={styles.title}>
                Shah Neyamat (RH:) KG & High School
              </Text>
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
                  <Text style={styles.infoValue}>
                    {admitCardData.studentName}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Father's Name:</Text>
                  <Text style={styles.infoValue}>
                    {admitCardData.fatherName}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date of Birth:</Text>
                  <Text style={styles.infoValue}>
                    {/* {new Date(admitCardData.dateOfBirth).toLocaleDateString()} */}
                    {admitCardData.dateOfBirth &&
                      format(new Date(admitCardData.dateOfBirth), "dd-MM-yyyy")}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Class:</Text>
                  <Text style={styles.infoValue}>
                    {admitCardData.className}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Roll:</Text>
                  <Text style={styles.infoValue}>
                    {admitCardData.classRoll}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRight}>
                {admitCardData?.image && (
                  <Image
                    src={admitCardData?.image}
                    style={{
                      width: "70px",
                      height: "85px",
                      margin: "5px auto",
                      border: "1px solid #5c5e5d",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  ></Image>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.cardTitle}>Exam Routine</Text>
            </View>

            {/* Exam Schedule Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellSubject}>Subject Name</Text>
                <Text style={styles.tableCellOther}>Exam Date</Text>
                <Text style={styles.tableCellOther}>Time</Text>
              </View>
              {admitCardData.examData.map((subject, index) => {
                const baseDate = new Date(subject.examDate);
                const [fromHours, fromMinutes] = subject.examFrom.split(":");
                const [toHours, toMinutes] = subject.examTo.split(":");
                const fromDate = new Date(baseDate);
                fromDate.setHours(parseInt(fromHours), parseInt(fromMinutes));
                const toDate = new Date(baseDate);
                toDate.setHours(parseInt(toHours), parseInt(toMinutes));
                return (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellSubject}>
                      {subject.subjectName}
                    </Text>
                    <Text style={styles.tableCellOther}>
                      {subject.examDate &&
                        format(new Date(subject.examDate), "dd-MM-yyyy, EEEE")}
                    </Text>
                    <Text style={styles.tableCellOther}>
                      {fromDate && toDate
                        ? `${format(fromDate, "hh:mm a")} - ${format(
                            toDate,
                            "hh:mm a"
                          )}`
                        : "N/A"}
                    </Text>
                  </View>
                );
              })}
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
  );
}

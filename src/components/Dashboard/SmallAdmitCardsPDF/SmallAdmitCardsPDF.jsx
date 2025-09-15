import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./Style";
// Utility function to chunk students into groups of 20
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
export default function SmallAdmitCardsPDF({ students, examName, session }) {
  const pages = chunkArray(students, 3);
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        {pages.map((pageStudents, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <View style={styles.pageContainer}>
              {pageStudents.map((student, index) => (
                <View key={student._id} style={styles.card}>
                  <Image
                    src="/logo.png"
                    style={{
                      position: "absolute",
                      top: "25%",
                      left: "40%",
                      transform: "translate(-50%, -50%)",
                      width: 200,
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
                    <Text style={styles.subtitle}>
                      Karnaphuli, Chattogram || ESTD: 2004
                    </Text>
                    <Text style={styles.cardTitle}>
                      {examName} Exam: {session}
                    </Text>
                    <Text style={styles.cardName}>Admit Card</Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <View style={styles.infoLeft}>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Student Name:</Text>
                        <Text
                          style={{
                            flex: 8,
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {student.studentName}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Class:</Text>
                        <Text style={styles.infoValue}>
                          {student.className}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Roll:</Text>
                        <Text style={styles.infoValue}>
                          {student.classRoll}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Student ID:</Text>
                        <Text style={styles.infoValue}>
                          {student?.studentID}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.infoRight}>
                      <Image
                        src={
                          student?.image ||
                          "https://i.ibb.co.com/V0jk4tCT/images.png"
                        }
                        style={{
                          width: "60px",
                          height: "75px",
                          margin: "5px auto",
                          border: "1px solid #5c5e5d",
                          borderRadius: "5px",
                        }}
                      ></Image>
                    </View>
                  </View>

                  <View style={styles.footer}>
                    <Text style={styles.signatureLine}>
                      Class Teacher’s Signature
                    </Text>
                    <Text style={styles.signatureLine}>
                      Head Teacher’s Signature
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}

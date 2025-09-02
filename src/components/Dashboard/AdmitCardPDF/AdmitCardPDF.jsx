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
                শাহ্ নেয়ামত (রহঃ) কেজি এন্ড হাই স্কুল
              </Text>
              <Text style={styles.subtitle}>
                কর্ণফুলী, চট্টগ্রাম || স্থাপিত: ২০০৪
              </Text>
              
              <Text style={styles.cardTitle}>
                {admitCardData.examName === "2nd-Modeltest"
                  ? "২য়-মডেল টেস্ট"
                  : admitCardData.examName === "1st-Modeltest" ? "১ম-মডেল টেস্ট" 
                  : admitCardData.examName === "Pre-Test" ? "প্রি-টেস্ট"
                  : admitCardData.examName === "Half-Yearly" ? "অর্ধ-বার্ষিক"
                  : admitCardData.examName === "Annual" ? "বার্ষিক"
                  : ""
                  } {" "}
                 পরীক্ষা: {admitCardData.session} | <Text>প্রবেশ পত্র</Text>
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Student Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Student Name:</Text>
                  <Text
                    style={{ flex: 8, fontSize: "13px", fontWeight: "bold" }}
                  >
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

            {/* Exam Schedule Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellSubject}> বিষয়ের নাম</Text>
                <Text style={styles.tableCellOther}>পরীক্ষার তারিখ</Text>
                <Text style={styles.tableCellOther}>সময়</Text>
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

            {/* note text */}
            <View style={styles.infoContainer}>
              {admitCardData && (
                <View>
                  {/* <Text style={styles.noteText}>
                    ১. পরীক্ষা কেন্দ্রে আসার সময় অবশ্যই বিদ্যালয়ের নির্ধারিত
                    ইউনিফর্ম পরিধান করে আসতে হবে। ইউনিফর্ম ছাড়া প্রবেশ করতে
                    দেওয়া হবে না।
                  </Text>
                  <Text style={styles.noteText}>
                    ২. পরীক্ষার ফি এবং অন্য কোনো বকেয়া থাকলে তা পরীক্ষার আগে
                    অবশ্যই পরিশোধ করতে হবে।
                  </Text>
                  <Text style={styles.noteText}>
                    ৩. পরীক্ষা শুরুর আগে তোমার প্রবেশপত্র দেখে শ্রেণী ও রোল
                    নম্বর অনুযায়ী নিজের আসন খুঁজে নিতে হবে।
                  </Text>
                  <Text style={styles.noteText}>
                    ৪. পরীক্ষার সময় কোনো প্রকার অবৈধ পন্থা যেমন— নকল করা বা
                    অন্যের সাথে কথা বলা— কঠোরভাবে নিষিদ্ধ।
                  </Text> */}
                </View>
              )}
            </View>

            {/* Footer with Signatures */}
            <View style={styles.footer}>
              <Text style={styles.signature}>শ্রেণী শিক্ষকের স্বাক্ষর</Text>
              <Text style={styles.signature}>প্রধান শিক্ষকের স্বাক্ষর</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
